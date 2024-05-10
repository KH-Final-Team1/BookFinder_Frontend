import axios from "axios";
import { useNavigate  } from 'react-router-dom';

const DeleteTrade = ({ tradeId }) => {
  const navigate = useNavigate ();

  const handleDelete = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:8080/api/v1/trades/${tradeId}`)
      .then(response => {
        alert('게시물을 성공적으로 삭제했습니다.');
        navigate('/tradeList'); // useNavigate를 사용하여 페이지 이동
      })
      .catch(error => {
        console.error('Error deleting trade:', error);
        alert('게시물 삭제 중 오류가 발생했습니다.');
      });
    }
  };

  return {handleDelete};
};

export default DeleteTrade;