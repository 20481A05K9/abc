import {takeEvery} from 'redux-saga/effects';

import * as CONST from '../../utils/Constants';
import {
  onAddContact,
  onAddLocation,
  onAddVehicle,
  onCartBalUpdate,
  onFastagList,
  onHelpService,
  onHelpServiceList,
  onLoginUser,
  onPaymentSuccess,
  onRegisterUser,
  onStateList,
  onTripDetails,
  onTripList,
  onUploadImage,
  onVehicleTypeList,
  onFastagRecharge,
  onUploadPDF,
  onSpin,
  onSpinReferFriend,
  onInAppMessage,
  onPpi,
  onTrackUser,
} from './userSaga';

const watchLogin = function* watchLogin() {
  yield takeEvery(CONST.LOGIN_USER, onLoginUser);
  yield takeEvery(CONST.STATE_LIST, onStateList);
  yield takeEvery(CONST.ADD_LOCATION, onAddLocation);
  yield takeEvery(CONST.REGISTER_USER, onRegisterUser);
  yield takeEvery(CONST.ADD_VEHICLE, onAddVehicle);
  yield takeEvery(CONST.TRIP_LIST, onTripList);
  yield takeEvery(CONST.VEHICLE_TYPE_LIST, onVehicleTypeList);
  yield takeEvery(CONST.FASTAG_LIST, onFastagList);
  yield takeEvery(CONST.TRIP_DETAILS, onTripDetails);
  yield takeEvery(CONST.CART_BAL_UPDATE, onCartBalUpdate);
  yield takeEvery(CONST.PAYMENT_SUCCESS, onPaymentSuccess);
  yield takeEvery(CONST.ADD_CONTACT, onAddContact);
  yield takeEvery(CONST.UPLOAD_IMAGE, onUploadImage);
  yield takeEvery(CONST.HELP_SERVICE_LIST, onHelpServiceList);
  yield takeEvery(CONST.HELP_SERVICE, onHelpService);
  yield takeEvery(CONST.FASTAG_RECHARGE, onFastagRecharge);
  yield takeEvery(CONST.UPLOAD_PDF, onUploadPDF);
  yield takeEvery(CONST.SPIN, onSpin);
  yield takeEvery(CONST.SPIN_REFER_FRIEND, onSpinReferFriend);
  yield takeEvery(CONST.IN_APP_MESSAGE, onInAppMessage);
  yield takeEvery(CONST.PPI, onPpi);
  yield takeEvery(CONST.TRACKING_USER, onTrackUser);
};

const Sagas = function* mySagas() {
  yield watchLogin();
};

export default Sagas;
