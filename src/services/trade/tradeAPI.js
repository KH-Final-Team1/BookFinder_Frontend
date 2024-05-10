import axios from "axios";

export const deleteTrade = async (tradeId) => {
  if (window.confirm('게시물을 삭제하시겠습니까?')) {
    return await axios.delete(`http://localhost:8080/api/v1/trades/${tradeId}`)
    .then(response => {
      alert('게시물을 성공적으로 삭제했습니다.');
      return true;
    })
    .catch(error => {
      console.error('Error deleting trade:', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
      return false;
    });
  }
};

export const getTrade = async (tradeId) => {
  return await axios.get(`http://localhost:8080/api/v1/trades/${tradeId}`)
  .then( response => {
    // console.log(response.data)
    return response.data;
  })
  .catch(error => console.error("Error fetching trade:", error));
}