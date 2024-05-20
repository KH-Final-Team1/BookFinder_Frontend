import axios from 'axios';

export const createBook = async (bookRequestDto) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/books`, bookRequestDto);
    return response.data;
  } catch (error) {
    throw error;
  }
};