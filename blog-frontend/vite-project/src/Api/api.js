import axios from 'axios';

export const fetchLocation = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json?token=e7e7107b343c84');
    return response.data; // Return only the data
  } catch (error) {
    console.error('Error fetching location:', error);
    return null; // Return null or a specific error response
  }
};
