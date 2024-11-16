import * as USER_CONST from '../../utils/Constants';

export const onLoginUser = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.LOGIN_USER,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const saveProfileData = data => {
  return {
    type: USER_CONST.SAVE_PROFILE_DATA,
    payload: {
      data,
    },
  };
};

export const onStateList = (successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.STATE_LIST,
    payload: {
      successCallBack,
      failureCallBack,
    },
  };
};

export const onAddLocation = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.ADD_LOCATION,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onRegisterUser = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.REGISTER_USER,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onAddVehicle = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.ADD_VEHICLE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onTripList = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.TRIP_LIST,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onVehicleTypeList = (successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.VEHICLE_TYPE_LIST,
    payload: {
      successCallBack,
      failureCallBack,
    },
  };
};

export const onFastagList = (successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.FASTAG_LIST,
    payload: {
      successCallBack,
      failureCallBack,
    },
  };
};

export const onTripDetails = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.TRIP_DETAILS,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onCartBalUpdate = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.CART_BAL_UPDATE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onPaymentSuccess = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.PAYMENT_SUCCESS,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onAddContact = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.ADD_CONTACT,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onUploadImage = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.UPLOAD_IMAGE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onHelpServiceList = (successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.HELP_SERVICE_LIST,
    payload: {
      successCallBack,
      failureCallBack,
    },
  };
};

export const onHelpService = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.HELP_SERVICE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onFastagRecharge = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.FASTAG_RECHARGE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onUploadPDF = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.UPLOAD_PDF,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onSpin = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.SPIN,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onSpinReferFriend = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.SPIN_REFER_FRIEND,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onInAppMessage = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.IN_APP_MESSAGE,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onPpi = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.PPI,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};

export const onTrackUser = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.TRACKING_USER,
    payload: {
      data,
      successCallBack,
      failureCallBack,
    },
  };
};
