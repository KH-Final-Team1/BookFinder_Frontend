import axios from 'axios';

export const searchBookList = async (filter, keyword) => {
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

export const createBook = async (bookRequestDto) => {
  try {
    const response = await axios.post(
        `http://localhost:8080/api/v1/books/request`, bookRequestDto);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookByISBN = async (ISBN) => {
  return await axios.get(`http://localhost:8080/api/v1/books/${ISBN}`)
  .then(response => {
    console.log(response.data)
    return response.data;
  })
  .catch(error => console.error("Error fetching trade:", error));
}