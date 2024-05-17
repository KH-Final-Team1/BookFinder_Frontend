import axios from 'axios';

export async function searchBookList(filter, keyword) {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/books/list`,
        {
          params: {
            filter: filter,
            keyword: keyword
          }
        })
    return response.data;
  } catch (error) {
    throw error
  }
}