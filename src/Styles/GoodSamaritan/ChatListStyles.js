import {StyleSheet} from 'react-native';
import {Color, FontFamily} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
  },
  headerText: {
    fontFamily: FontFamily.montserratMedium,
    color: '#1B1A57',
    fontSize: 18,
  },
  contacts: {
    fontFamily: FontFamily.montserratSemiBold,
    color: '#000',
    fontSize: 18,
    marginLeft: '6%',
  },
  flatList: {
    flexGrow: 1,
  },
  contactAvatar: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: 50,
    overflow:"hidden"
  },
  contactAvatarPlaceholder: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: 50,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden"
  },
  icon:{
    marginTop: 30, 
    alignSelf: 'center',
  },
  contactAvatarText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: FontFamily.montserratBold,
    marginTop: '-5%',
  },
  contactName: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: '#1B1A57',
    marginTop: '-2%',
    width: wp('44%'),
  },
  lastMessage: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 11,
    color: '#4F5E7B',
    width: wp('45%'),
  },
  vehicleNumber: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 10,
    color: '#4F5E7B',
    marginTop: '8%',
  },
  searchBarStyle: {
    width: wp('95%'),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderColor: '#5DA7FE',
    borderWidth: 1.5,
    borderBlockColor: Color.colorGrey,
    marginTop: '2%',
  },
  input: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 12,
    color: '#308FFF',
  },
  searchModalView: {
    width: '100%',
    maxHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: '3%',
  },
  contactsList: {},
  searchResultError: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorCancelled,
    fontSize: 13,
    marginHorizontal:'5%',
    marginVertical:'2%'
  },
  noRecordFound: {
    width: wp('80%'),
    height: wp('70%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: hp('25%'),
  },
  contactItem: {
    flexDirection: 'row',
    margin: '3%',
    marginLeft: '4%',
    borderRadius: 8,
    width: wp('93%'),
    height: wp('17%'),
    alignItems: 'center',
  },
  horizontal_line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    marginTop: '-1%',
    width: '95%',
    alignSelf: 'center',
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '5%',
  },
  tabButton: {
    width: wp('20%'),
    height: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: '5%',
  },
  smalllogo: {
    width: wp('4%'),
    height: wp('4%'),
    zIndex: 1,
    alignSelf: 'center',
    marginTop: '-20%',
  },
  activeTab: {
    backgroundColor: '#2F80ED',
  },
  inactiveTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 12,
    fontFamily: FontFamily.montserratRegular,
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#1B1A57',
  },
  contactInfo: {
    flexDirection: 'column',
    marginLeft: '4%',
  },
  messageInfo: {
    marginLeft: '15%',
    marginTop: '-2%',
  },
  lastMessageTime: {
    fontSize: 12,
    fontFamily: FontFamily.montserratRegular,
    color: '#333333',
  },
  unreadBubble: {
    width: wp('6%'),
    height: wp('6%'),
    backgroundColor: '#2F80ED',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: '8%',
    marginLeft: '-12%',
  },
  unreadCount: {
    fontFamily: FontFamily.montserratBold,
    color: '#fff',
    fontSize: 12,
    alignItems: 'center',
    marginTop: '1%',
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent2: {
    width: wp('75%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: '3%',
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: FontFamily.montserratSemiBold,
    color: '#1B1A57',
  },
  modalText: {
    fontSize: 12,
    fontFamily: FontFamily.montserratMedium,
    color: '#000000',
    margin: '15%',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  modalActionButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.montserratMedium,
    color: '#2F80ED',
  },
  modalCancelButtonText: {
    fontSize: 14,
    color: '#2F80ED',
    textAlign: 'center',
    fontFamily: FontFamily.montserratRegular,
  },
  checkBoxStyle: {
    position: 'absolute',
    top: '-2%',
    right: '1%',
  },
});
