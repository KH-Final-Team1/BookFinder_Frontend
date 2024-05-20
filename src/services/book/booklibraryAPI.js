import axios from 'axios';

const API_URL = 'http://data4library.kr/api/srchDtlList';
const AUTH_KEY = '87ee5bbc25f7e601490254d33120aa676b1fc80490d7e4c1cb0d1b04ceb70ef5';

export const fetchBookInfo = async (isbn) => {
  try {
    const response = await axios.get(`${API_URL}?authKey=${AUTH_KEY}&isbn13=${isbn}&format=json`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
