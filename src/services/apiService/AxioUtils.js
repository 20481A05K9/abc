import {
  getAxiosInstance,
  getAxiosInstanceAddLocation,
  getAxiosInstancePdfUpload,
} from './AxiosWrapper';
import {BASE_URL} from '../config/index.url';

export async function performPostRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL + endPoint;

  return wrapper
    .post(API_URL, jsonRequest)
    .then(res => {
      return res;
    })
    .catch(ex => {
      throw ex;
    });
}

export async function performPostRequestForAddLocation(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstanceAddLocation(jsonRequest);
  let API_URL = BASE_URL + endPoint;

  return wrapper
    .post(API_URL, jsonRequest)
    .then(res => {
      return res;
    })
    .catch(ex => {
      throw ex;
    });
}

export async function performPostRequestForPDFUpload(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstancePdfUpload(jsonRequest);
  let API_URL = BASE_URL + endPoint;

  return wrapper
    .post(API_URL, jsonRequest)
    .then(res => {
      return res;
    })
    .catch(ex => {
      throw ex;
    });
}
