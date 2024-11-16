import {Color, FontFamily, FontSize} from '../../../global';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontFamily: FontFamily.montserratBold,
    fontWeight: '800',
    textAlign: 'left',
    marginLeft: 29,
    marginTop: 20,
    color: 'black',
  },
  searchBar: {
    marginLeft: 29,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#dedede',
    borderRadius: 35,
    width: '80%',
    height: 41,
  },
  searchInput: {
    paddingLeft: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FontFamily.montserratBold,
    color: 'black',
    backgroundColor: Color.colorWhitesmoke_100,
    paddingVertical: 8,
    paddingLeft: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items and user image
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  selectedContact: {
    backgroundColor: '#D9D9D9',
  },
  contactDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FontFamily.montserratBold,
    color: 'black',
  },
  contactNumber: {
    fontSize: 14,
    color: '#555',
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  contact: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: '100%',
    height: 880,
    overflow: 'hidden',
  },
});
