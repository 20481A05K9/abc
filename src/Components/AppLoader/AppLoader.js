import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {Color} from '../../../global';

const AppLoader = props => {
  const [isLoading, setIsLoading] = useState(props.isFetching||false);

  if (!props.isFetching) {
    return null;
  } else {
    return (
      <Modal
        animationType={'none'}
        onRequestClose={() => {
          setIsLoading(false);
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={isLoading}
        statusBarTranslucent={true}>
        <View style={styles.mainView}>
          <View style={styles.innerView}>
            <ActivityIndicator
              size="large"
              color={Color.colorSecondary}
              style={{flex: 1}}
            />
          </View>
        </View>
      </Modal>
    );
  }
};

function mapStateToProps(state) {
  return {
    isFetching: state.common.isFetching,
  };
}

export default connect(mapStateToProps)(AppLoader);

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  innerView: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
