import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Appearance
} from 'react-native';
import {styles, darkstyles} from '../../Styles/GoodSamaritan/Goodsamaritanstyles';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../assets/index';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from '../../Components/CustomStatusBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { FontFamily } from '../../../global';

export default GoodSamaritan = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [isReportVisible, setReportVisible] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false); // Modal visibility
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language); // Track selected language
  const [theme,settheme]=React.useState(Appearance.getColorScheme()||'light')
 
  React.useEffect(() => {
    const handleThemeChange = ({ colorScheme }) => {
      settheme(colorScheme);
    };

    const subscription = Appearance.addChangeListener(handleThemeChange);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const styletheme = React.useMemo(() => (theme === "dark" ? darkstyles : styles), [theme]);

  const reportIssues = [
    'doorsleftopen',
    'reportwrongparking',
    'reportanaccident',
    'reporttheftalarm',
  ];
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hin', label: 'Hindi' },
    { code: 'tel', label: 'Telugu' },
    // Add more languages here if needed
  ];

  const toggleReportVisibility = () => {
    setReportVisible(!isReportVisible);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang); // Update selected language state
    setModalVisible(false); // Close modal after language selection
  };

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '3%',
        marginLeft: '8%',
      }}>
      <FontAwesome name="dot-circle-o" size={22} color="#5da7fe" />
      <Text style={styletheme.reportItem}>{t(item)}</Text>
    </View>
  );

  return (
    <View style={styletheme.container}>
      <CustomStatusBar backgroundColor={theme==="dark"?'#000000':'#efefef'} barStyle={theme==="dark"?"light-content":"dark-content"} />
      <View style={styletheme.firstchild}>
        <Text style={styletheme.primarytext}>{t('Goodsamaritan')}</Text>

        <Image
          source={Images.GoodSamaritan}
          style={{
            width: '55%',
            height: '20%',
            resizeMode: 'stretch',
            marginTop: '-5%',
            marginLeft: '15%',
          }}
        />

        <View>
          <TouchableOpacity
            onPress={toggleReportVisibility}
            style={{
              marginTop: '8%',
              alignSelf: 'flex-start',
              marginLeft: '-15%',
            }}>
            <View style={{flexDirection: 'row', marginLeft: '15%'}}>
              <Text style={styletheme.reportToggleText}>{t('Reportissues')}</Text>
              <MaterialIcons
                name={
                  isReportVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                color="#000"
                size={20}
                style={{marginTop: '2.3%'}}
              />
            </View>
          </TouchableOpacity>

          {isReportVisible && (
            <FlatList
              data={reportIssues}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={{marginTop: 10}}
            />
          )}
        </View>
        <Text style={styletheme.secondarytext}>{t('becomeagoodcitizen')}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatList')}
          style={styletheme.Reportbtn}>
          <LinearGradient
            colors={['#83BCFE', '#3D80CF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styletheme.gradient}>
            <Text style={styletheme.btntext}>{t('messagenow')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Button to open modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "blue", fontFamily: FontFamily.montserratMedium, fontSize: 10, marginTop: 40 }}>{t('changelanguage')}</Text>
        </TouchableOpacity>

        {/* Language Selection Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styletheme.modalOverlay}>
            <View style={styletheme.modalContent}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Select Language</Text>
              
              {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={styletheme.radioButtonContainer}
                onPress={() => changeLanguage(language.code)}
              >
                <View style={styletheme.radioButton}>
                  {selectedLanguage === language.code && <View style={styletheme.radioButtonSelected} />}
                </View>
                <Text style={{ fontSize: 16, color: '#fff', marginLeft: 10 , fontFamily:FontFamily.montserratMedium}}>
                  {language.label}
                </Text>
              </TouchableOpacity>
            ))}

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styletheme.closeButton}>
                <Text style={{ color: '#fff', fontFamily:FontFamily.montserratMedium }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};