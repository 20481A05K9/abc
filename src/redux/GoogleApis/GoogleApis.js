import axios from 'axios';
import {MAPS_API__KEY} from '../../utils/Constants';
import {GEOCODE_URL, ROUTE_URL} from '../../services/config/index.url';

export async function onGetAddressDetails(action) {
  try {
    const response = await axios.get(
      `${GEOCODE_URL}?latlng=${action?.latitude},${action?.longitude}&key=${MAPS_API__KEY}`,
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function onGetRouteDetails(action) {
  try {
    const data = {
      origin: {
        location: {
          latLng: {
            latitude: action?.oLat,
            longitude: action?.oLng,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: action?.dLat,
            longitude: action?.dLng,
          },
        },
      },
      travelMode: 'DRIVE',
      extraComputations: ['TOLLS'],
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': MAPS_API__KEY,
      'X-Goog-FieldMask':
        'routes.duration,routes.distanceMeters,routes.travelAdvisory.tollInfo,routes.legs.travelAdvisory.tollInfo',
    };

    const res = await fetch(`${ROUTE_URL}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
}
