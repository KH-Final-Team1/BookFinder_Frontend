import {useEffect, useState} from "react";
import { deleteComment, enrollComment, getComments } from "../../services/trade/comment";
import Button from "../../components/ui/Button";

export default function CommentList({tradeId}) {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState(false);
  const getSecretValue = (isChecked) => { return isChecked ? 'Y' : 'N'; };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(tradeId);
        setComments(data);
      } catch (err) {
        setError("댓글을 불러오는데 실패했습니다.");
      }
    };
    fetchComments();
  }, [tradeId]);

  const submitComment = async () => {
    const newComment = {
      userId: 1,
      content: content,
      secretYn: getSecretValue(secret)
    };

    try{
      console.log(newComment);
      await enrollComment(newComment, tradeId);
      alert('댓글 등록을 성공하였습니다.');
      setSecret(false);
      setContent("");
      const data = await getComments(tradeId);
      setComments(data);
    } catch (error) {
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = window.confirm('댓글을 삭제하시겠습니까?');
    if (!result) {
      return;
    }

    try {
      const success = await deleteComment(commentId);
      if (success) {
        alert('댓글 삭제를 성공하였습니다.');
        const data = await getComments(tradeId);
        setComments(data);
      } else {
        alert('댓글 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
      <div>
        <table className={'comment-table'}>
          <tbody>
          {error && <div className="error">{error}</div>}
          {comments && comments.map(comment => {
            return (
                <div key={comment.id}>
                  <div className={'comment-detail'}>
                    <tr>
                      <td className="user-name">{comment.user.nickname}</td>
                      <td className="create-date">{comment.createDate}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="content">{comment.content}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="delete-comment">
                        <img src={'https://cdn.icon-icons.com/icons2/2715/PNG/512/x_icon_172101.png'}
                             onClick={() => handleDeleteComment(comment.id)}
                        />
                      </td>
                    </tr>
                  </div>
                  <hr/>
                </div>
            );
          })}
          </tbody>
        </table>
        <div className="input-comment">
          <textarea placeholder={'댓글 내용을 입력하세요.'}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <div className={'select-secret'}>
            <p>비밀댓글</p>
            <input type="checkbox" checked={secret} onChange={(event) => setSecret(event.target.checked)} />
          </div>
          <Button className={'submit-button'} onClick={submitComment}>작성</Button>
        </div>
      </div>
  )
}