import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  innerView: {
    marginHorizontal: '5%',
  },
  title: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratBold,
    marginTop: '10%',
  },
  image: {
    width: wp('80%'),
    height: wp('70%'),
    marginTop: '2%',
    alignSelf: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: wp('38%'),
    height: wp('30%'),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '4%',
    elevation: 4,
    borderWidth: 1,
    borderColor: Color.colorPrimary,
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardImage: {
    width: wp('45%'),
    height: wp('30%'),
    marginRight: '-11%',
    marginBottom: '-18%',
  },
});
