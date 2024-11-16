import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import {Color, FontFamily} from '../../../global';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomErrorModal = props => {
  const [isLoading, setIsLoading] = useState(true);

  if (!props.showModal) {
    return null;
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.hideErrorModal();
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.hideErrorModal()}
          style={styles.modalContainer}>
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => props.hideErrorModal()}
              style={styles.crossIcon}>
              <Entypo name={'cross'} size={30} color={Color.colorBlack} />
            </TouchableOpacity>
            <Text
              style={[
                styles.alertText,
                {
                  color: props.isShowError
                    ? Color.colorCancelled
                    : Color.colorSeagreen,
                },
              ]}>
              {props.message}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomView: {
    alignSelf: 'flex-end',
    width: wp('100%'),
    minHeight: wp('20%'),
    backgroundColor: Color.colorWhite,
    paddingVertical: '1%',
    shadowColor: Color.colorBlack,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },

  alertText: {
    fontSize: 15,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorCancelled,
    width: wp('85%'),
    marginLeft: '2%',
  },

  crossIcon: {
    position: 'absolute',
    top: wp('1%'),
    right: wp('4%'),
  },
});

const mapStateToProps = state => {
  return {
    showModal: state.common.showModal,
    message: state.common.message,
    isShowError: state.common.isShowError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomErrorModal);
