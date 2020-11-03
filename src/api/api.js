import axios from 'axios'


const API_URL = 'http://holiday-api.serverpi.ddns.me/api/';

export default {

  getCountries: async(success,failure)=>{
    try {
      const response = await api().get(API_URL + 'countries');
      success(response.data.message);
    } catch (error) {
      failure(error);
    }
  },
  getHolidays: async(requestData,success,failure)=>{
    try {
      let paramsUrl = `${requestData.countryCode}/${requestData.year}`+ (requestData.region ? `/${requestData.region}` : ''); 
      const response = await api().get(API_URL + 'holidays/'+paramsUrl);
      success(response.data.message);
    } catch (error) {
      failure(error);
    }
  },

}
//--------------------------------------------------------------------------------------------AXIOS HEADER CONFIGURATION
function api() {
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

