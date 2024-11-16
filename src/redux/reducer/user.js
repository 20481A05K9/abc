import * as CONST from "../../utils/Constants";

const initialState = {
  userData: null,
};

export default function (state = initialState, action) {

  switch(action.type) {
    case CONST.SAVE_PROFILE_DATA:
      return {
        ...state,
        userData: action.payload.data,
      }
    default: return state;
  }
  
}
