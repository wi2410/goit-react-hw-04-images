import axios from 'axios';

const KEY = '29656513-372141d59901600f23fa64349';
const API_URL = 'https://pixabay.com/api/';

export async function getImages(query, page) {
  const BASE_SEARH_PARAMS = {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
    q: query,
  };

  const response = await axios.get(API_URL, {
    params: BASE_SEARH_PARAMS,
  });

  return response.data;
}