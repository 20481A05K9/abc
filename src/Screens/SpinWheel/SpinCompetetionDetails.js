import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  LogBox,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {Images} from '../../../assets';
import {styles} from '../../Styles/SpinWheelStyles/SpinCompDetStyles';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SpinCompetitionDetails = props => {
  const [timeLeft, setTimeLeft] = useState(43200);
  const [mobileNo, setMobileNo] = useState(null);
  const [giftsListData, setGiftsListData] = useState([]);
  const [dataCheckStatus, setDataCheckStatus] = useState(false);
  const [winner1, setWinner1] = useState(null);
  const [winner2, setWinner2] = useState(null);
  const [winner3, setWinner3] = useState(null);
  const [winner4, setWinner4] = useState([]);
  const [monthIndex, setMonthIndex] = useState(null);
  const [winnerAnnouncedDate, setWinnerAnnouncedDate] = useState(new Date());
  const navigation = useNavigation();
  const numColumns = 3;
  const limit = 5;
  const [load, setLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getData();
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getGiftsList(user?.MOBILE_NUMBER);
      getWinnerList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getGiftsList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      SPIN_SCORE: '100',
      TYPE: 'GIFTS',
      page: pageCount,
      limit: limit,
    };
    props.onSpin(
      data,
      res => onSpinGiftsListSuccessCallBack(res),
      error => onSpinGiftsListFailureCallBack(error),
    );
  };

  const sortDatabyDate = data => {
    return data.sort((a, b) => new Date(b.CREATED_ON) - new Date(a.CREATED_ON));
  };

  const onSpinGiftsListSuccessCallBack = async res => {
    const giftList = sortDatabyDate([...giftsListData, ...res?.data]);
    setGiftsListData(giftList);
    setWinnerAnnouncedDate(res?.upcomingDrawDate);
    setDataCheckStatus(true);
    setPageCount(prev => prev + 1);
    if (res?.data.length < limit) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  };

  const onSpinGiftsListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getWinnerList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'WINNERS',
    };
    props.onSpin(
      data,
      res => onSpinWinnerListSuccessCallBack(res),
      error => onSpinWinnerListFailureCallBack(error),
    );
  };

  const onSpinWinnerListSuccessCallBack = async res => {
    var resData = [];
    var todayDate = new Date();
    var drawDate = new Date(res?.upcomingDrawDate);
    if (areDatesEqual(todayDate, drawDate)) {
      resData = res?.newWinners;
    } else {
      resData = res?.oldWinners;
    }

    var winner1 = resData.find(item => item?.WINNER_SEQ == '1');
    var winner2 = resData.find(item => item?.WINNER_SEQ == '2');
    var winner3 = resData.find(item => item?.WINNER_SEQ == '3');
    var winner4 = resData.filter(
      item =>
        item?.WINNER_SEQ != '1' &&
        item?.WINNER_SEQ != '2' &&
        item?.WINNER_SEQ != '3',
    );
    setWinner1(winner1);
    setWinner2(winner2);
    setWinner3(winner3);
    setWinner4(winner4);

    var winningMonth = winner1?.DRAW_DATE
      ? new Date(winner1?.DRAW_DATE)
      : winner2?.DRAW_DATE
      ? new Date(winner2?.DRAW_DATE)
      : winner3?.DRAW_DATE
      ? new Date(winner3?.DRAW_DATE)
      : winner4[0]?.DRAW_DATE
      ? new Date(winner4[0]?.DRAW_DATE)
      : null;

    const monthIndex = winningMonth ? winningMonth.getUTCMonth() : -1;
    setMonthIndex(monthIndex);
  };

  const onSpinWinnerListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const areDatesEqual = (d1, d2) =>
    d1.getUTCFullYear() >= d2.getUTCFullYear() &&
    d1.getUTCMonth() >= d2.getUTCMonth() &&
    d1.getUTCDate() >= d2.getUTCDate();

  const renderWinnerItem = ({item}) => {
    let imageStyle = styles.prizeImageStyle;

    if (item?.SPIN_SCORE == '100') {
      imageStyle = {...imageStyle, height: wp('5%')};
    } else if (item?.SPIN_SCORE == '75') {
      imageStyle = {...imageStyle, height: wp('9%')};
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '-5%',
        }}>
        <FastImage
          source={Images.bucketImg}
          style={styles.prizeImageStyle2}
          resizeMode={FastImage.resizeMode.stretch}>
          <View>
            <Text style={styles.winnerGift}>{item?.SPIN_CODE}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={item?.SPIN_SCORE == '100' ? Images.alexa : Images.airpods}
              style={imageStyle}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                marginLeft: '12%',
                marginTop: '2%',
              }}>
              <Text style={styles.Winnername}>
                {item?.SPIN_SCORE == '100' ? 'Alexa' : 'AirPods'}
              </Text>
              <Text style={styles.winningDate}>
                {moment(item?.CREATED_ON).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          <Text style={styles.WindateText}>
            {winnerAnnouncedDate
              ? `Winners will be announced on ${moment(
                  winnerAnnouncedDate,
                ).format('Do MMM, YYYY')}`
              : `Winners will be announced on ___`}
          </Text>
        </FastImage>
      </View>
    );
  };

  const renderWinnerItem2 = ({item, index}) => {
    if (index == winner4.length - 1) {
      var checkMiddleItemIsLastItem =
        (winner4.length - 1) % 3 === 0 ? true : false;
    }
    return (
      <View style={{marginLeft: '6%', marginTop: '4%', alignSelf: 'center'}}>
        <FastImage
          style={[
            styles.winnerItemBackground,
            checkMiddleItemIsLastItem && {marginLeft: '40%'},
          ]}
          resizeMode={FastImage.resizeMode.stretch}
          source={Images.sublist}>
          <Text numberOfLines={1} style={styles.winnerNameText}>
            {item?.userDetails?.FIRST_NAME + ' ' + item?.userDetails?.LAST_NAME}
          </Text>
        </FastImage>
      </View>
    );
  };

  const onEndReached = () => {
    if (load) {
      getGiftsList();
    }
  };

  return (
    <View style={{flex: 1}}>
      {Platform.OS == 'android' && (
        <CustomStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}
      <FastImage
        source={Images.BarcodeBack}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.stretch}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.competitionText}>Competition Details</Text>
          <View
            style={{
              width: '100%',
              maxHeight: heightPercentageToDP('78%'),
              backgroundColor: 'transparent',
              padding: '5%',
              borderRadius: 13,
              marginVertical: '2%',
              alignSelf: 'center',
            }}>
            {dataCheckStatus ? (
              giftsListData.length != 0 ? (
                <FlatList
                  data={giftsListData}
                  renderItem={renderWinnerItem}
                  keyExtractor={item => item._id.toString()}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  onEndReachedThreshold={0.01}
                  onEndReached={() => onEndReached()}
                />
              ) : (
                <Image
                  source={Images.noRecordFound}
                  style={styles.noRecordFound}
                />
              )
            ) : null}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('GetFreeSpins')}>
            <Text style={styles.textunder}>Spin more to get more coupons</Text>
          </TouchableOpacity>
          {winner1 || winner2 || winner3 || winner4.length != 0 ? (
            <FastImage
              source={Images.winnerback}
              style={styles.winnerback}
              resizeMode={FastImage.resizeMode.stretch}>
              <Text
                style={
                  styles.monthText2
                }>{`${monthNames[monthIndex]} month draw winners`}</Text>
              {winner1 || winner2 || winner3 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '15%',
                    justifyContent: 'space-evenly',
                  }}>
                  {winner2 ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: '8%',
                        marginRight: '-4%',
                      }}>
                      <FastImage
                        source={Images.airpods}
                        style={styles.airpods2}
                        resizeMode={FastImage.resizeMode.stretch}
                      />
                      <LinearGradient
                        style={styles.winnercontainer1}
                        colors={['#F9A737', '#FED609']}>
                        <Text numberOfLines={1} style={styles.prizetext1}>
                          {winner2?.userDetails?.FIRST_NAME +
                            ' ' +
                            winner2?.userDetails?.LAST_NAME}
                        </Text>
                        <Text style={styles.prizetext2}>Airpods</Text>
                        <FastImage
                          source={Images.idtoken}
                          style={styles.idtoken}
                          resizeMode={FastImage.resizeMode.stretch}>
                          <Text style={styles.prizetext3}>
                            {winner2?.SPIN_CODE}
                          </Text>
                        </FastImage>
                      </LinearGradient>
                    </View>
                  ) : (
                    <View style={styles.itemNotShow} />
                  )}
                  {winner1 ? (
                    <View style={{flexDirection: 'column'}}>
                      <FastImage
                        source={Images.alexa}
                        style={styles.alexa2}
                        resizeMode={FastImage.resizeMode.stretch}
                      />
                      <LinearGradient
                        style={styles.winnercontainer2}
                        colors={['#F9A738', '#FF2022']}>
                        <Text numberOfLines={2} style={styles.prizetext1}>
                          {winner1?.userDetails?.FIRST_NAME +
                            ' ' +
                            winner1?.userDetails?.LAST_NAME}
                        </Text>
                        <Text style={styles.prizetext2}>Alexa</Text>
                        <FastImage
                          source={Images.idtoken}
                          style={styles.idtoken}
                          resizeMode={FastImage.resizeMode.stretch}>
                          <Text style={styles.prizetext3}>
                            {winner1?.SPIN_CODE}
                          </Text>
                        </FastImage>
                        <FastImage
                          source={Images.prize}
                          style={styles.prize}
                          resizeMode={FastImage.resizeMode.stretch}
                        />
                      </LinearGradient>
                    </View>
                  ) : (
                    <View style={styles.itemNotShow} />
                  )}
                  {winner3 ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: '15.5%',
                        marginLeft: '-4%',
                      }}>
                      <FastImage
                        source={Images.prizebox}
                        style={styles.prizebox2}
                        resizeMode={FastImage.resizeMode.stretch}
                      />
                      <LinearGradient
                        style={styles.winnercontainer3}
                        colors={['#F9A737', '#FED60A']}>
                        <Text numberOfLines={1} style={styles.prizetext1}>
                          {winner3?.userDetails?.FIRST_NAME +
                            ' ' +
                            winner3?.userDetails?.LAST_NAME}
                        </Text>
                        <Text style={styles.prizetext2}>Gift</Text>
                        <FastImage
                          source={Images.idtoken}
                          style={styles.idtoken2}
                          resizeMode={FastImage.resizeMode.stretch}>
                          <Text style={styles.prizetext3}>
                            {winner3?.SPIN_CODE}
                          </Text>
                        </FastImage>
                      </LinearGradient>
                    </View>
                  ) : (
                    <View style={styles.itemNotShow} />
                  )}
                </View>
              ) : (
                <View style={styles.top3WinnerView} />
              )}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '10%',
                }}>
                <Text style={styles.appreciationtext}>
                  Token of appreciation
                </Text>
              </View>
              <View>
                <FlatList
                  data={winner4}
                  renderItem={renderWinnerItem2}
                  keyExtractor={item => item._id.toString()}
                  numColumns={numColumns}
                  scrollEnabled={false}
                />
              </View>
            </FastImage>
          ) : (
            <FastImage
              source={Images.winnerback}
              style={styles.winnerback}
              resizeMode={FastImage.resizeMode.stretch}>
              <Text
                style={
                  styles.monthText2
                }>{`              To be declared..`}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '15%',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '8%',
                    marginRight: '-4%',
                  }}>
                  <FastImage
                    source={Images.airpods}
                    style={styles.airpods2}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <LinearGradient
                    style={styles.winnercontainer1}
                    colors={['#F9A737', '#FED609']}>
                    <Text numberOfLines={1} style={styles.prizetext1}>
                      {'TBD'}
                    </Text>
                    <Text style={styles.prizetext2}>Airpods</Text>
                    <FastImage
                      source={Images.idtoken}
                      style={styles.idtoken}
                      resizeMode={FastImage.resizeMode.stretch}>
                      <Text style={styles.prizetext3}>{'GT229'}</Text>
                    </FastImage>
                  </LinearGradient>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <FastImage
                    source={Images.alexa}
                    style={styles.alexa2}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <LinearGradient
                    style={styles.winnercontainer2}
                    colors={['#F9A738', '#FF2022']}>
                    <Text numberOfLines={2} style={styles.prizetext1}>
                      {'TBD'}
                    </Text>
                    <Text style={styles.prizetext2}>Alexa</Text>
                    <FastImage
                      source={Images.idtoken}
                      style={styles.idtoken}
                      resizeMode={FastImage.resizeMode.stretch}>
                      <Text style={styles.prizetext3}>{'GT230'}</Text>
                    </FastImage>
                    <FastImage
                      source={Images.prize}
                      style={styles.prize}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  </LinearGradient>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '15.5%',
                    marginLeft: '-4%',
                  }}>
                  <FastImage
                    source={Images.prizebox}
                    style={styles.prizebox2}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <LinearGradient
                    style={styles.winnercontainer3}
                    colors={['#F9A737', '#FED60A']}>
                    <Text numberOfLines={1} style={styles.prizetext1}>
                      {'TBD'}
                    </Text>
                    <Text style={styles.prizetext2}>Gift</Text>
                    <FastImage
                      source={Images.idtoken}
                      style={styles.idtoken2}
                      resizeMode={FastImage.resizeMode.stretch}>
                      <Text style={styles.prizetext3}>{'GT231'}</Text>
                    </FastImage>
                  </LinearGradient>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '10%',
                }}>
                <Text style={styles.appreciationtext}>
                  Token of appreciation
                </Text>
              </View>
              <View>
                <FlatList
                  data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  renderItem={({index}) => (
                    <View
                      style={{
                        marginLeft: '6%',
                        marginTop: '4%',
                        alignSelf: 'center',
                      }}>
                      <FastImage
                        style={[
                          styles.winnerItemBackground,
                          index == 9 && {marginLeft: '40%'},
                        ]}
                        resizeMode={FastImage.resizeMode.stretch}
                        source={Images.sublist}>
                        <Text style={styles.winnerNameText}>{'TBD'}</Text>
                      </FastImage>
                    </View>
                  )}
                  keyExtractor={item => item.toString()}
                  numColumns={numColumns}
                  scrollEnabled={false}
                />
              </View>
            </FastImage>
          )}
        </ScrollView>
      </FastImage>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onSpin: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onSpin(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpinCompetitionDetails);
