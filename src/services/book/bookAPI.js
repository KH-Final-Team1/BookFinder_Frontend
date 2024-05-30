import axios from 'axios';

export const searchBookList = async (filter, keyword, approvalStatus, page) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/books/list`, {
          params: {
            filter: filter,
            keyword: keyword,
            approvalStatus: approvalStatus,
            page: page
          }
        });
    return response.data;
  } catch (error) {
    throw error
  }
}

export const searchApproveBookList = async (filter, keyword) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/books/list`, {
          params: {
            filter: filter,
            keyword: keyword,
            approvalStatus: "APPROVE",
          }
        });
    return response.data;
  } catch (error) {
    throw error
  }
}

export const createBook = async (bookRequestDto) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/books`, bookRequestDto);
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

export async function updateBookStatus(isbn, approvalStatus) {
  try {
    const response = await axios.patch(`http://localhost:8080/api/v1/books/${isbn}`, null,{
      params:{
        approvalStatus
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}