import {call, put} from 'redux-saga/effects';
import * as API_SERVICE from '../../services/apiService/AxioUtils';
import * as commonActions from '../actions/commonActions';

export function* onLoginUser(action) {
  let path = `users/mobileNumberAuth`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onStateList(action) {
  let path = `dropDown/getStates`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onAddLocation(action) {
  let path = `users/userAddress`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequestForAddLocation,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onRegisterUser(action) {
  let path = `users/userRegister`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequestForAddLocation,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onAddVehicle(action) {
  let path = `users/userVehicles`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onTripList(action) {
  let path = `trip/requestHandler`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onVehicleTypeList(action) {
  let path = `dropDown/getVehicleTypes`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onFastagList(action) {
  let path = `dropDown/fastagSpKey`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onTripDetails(action) {
  let path = `trip/tripInfo`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onCartBalUpdate(action) {
  let path = `trip/tripCart`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onPaymentSuccess(action) {
  let path = `ppay/loadRequest`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onAddContact(action) {
  let path = `users/userEContacts`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onUploadImage(action) {
  let path = `users/images`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onHelpServiceList(action) {
  let path = `dropDown/getBalertServices`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onHelpService(action) {
  let path = `users/help`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onFastagRecharge(action) {
  let path = `fastag/requestHandler`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onUploadPDF(action) {
  let path = `users/uploadPdfFile`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequestForPDFUpload,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onSpin(action) {
  let path = `spin/requestHandler`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onSpinReferFriend(action) {
  let path = `users/referFrient`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onInAppMessage(action) {
  let path = `InAppMessage/requestHandler`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onPpi(action) {
  let path = `ppi/requestHandler`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* onTrackUser(action) {
  let path = `TrackCampaign/trackDowload`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPostRequest,
      path,
      action.payload.data,
    );
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.message);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}
