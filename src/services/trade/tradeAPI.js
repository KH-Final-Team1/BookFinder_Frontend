import axios from "axios";

export const deleteTrade = async (tradeId) => {
  if (window.confirm('게시물을 삭제하시겠습니까?')) {
    return await axios.delete(`http://localhost:8080/api/v1/trades/${tradeId}`,
        {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}})
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
  try {
    const response
        = await axios.get(`http://localhost:8080/api/v1/trades/${tradeId}`,
        {headers: { 'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTrades = async (boroughId) => {
  return await axios.get(`http://localhost:8080/api/v1/trades/list/${boroughId}`,
      {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}})
  .then(response => {
    console.log(response.data)
    return response.data;
  })
  .catch(error => console.error("목록을 불러오는 중 오류가 발생했습니다.:", error));
}
    
export const enrollTrade = async (newTrade) => {
  try {
    await axios.post('http://localhost:8080/api/v1/trades', newTrade,
        {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
    return true;
  } catch (error) {
    return false;
  }
};

export const changeTradeType = async (tradeId, tradeYn) => {
  try {
    await axios.patch(`http://localhost:8080/api/v1/trades/${tradeId}`, tradeYn,
      {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
    return true;
  } catch (error) {
    console.error('Error changing trade type:', error);
    return false;
  }
}

export const updateTrade = async (tradeId, changedTrade) => {
  try{
    await axios.put(`http://localhost:8080/api/v1/trades/${tradeId}`, changedTrade,
        {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
    return true;
  } catch (error) {
    console.error('Error changing trade type:', error);
    return false;
  }
}