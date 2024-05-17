import {useEffect, useState} from "react";
import {enrollComment, getComments} from "../../services/trade/comment";
import Button from "../../components/ui/Button";

export default function CommentList({tradeId}) {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
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
      setContent("");
      setSecret(false);
      alert('댓글 등록을 성공하였습니다.');
    } catch (error) {
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
      <div>
        <table className={'comment-table'}>
          <tbody>
          {error && <div className="error">{error}</div>}
          {comments && comments.map(comment => {
            return (
                <div>
                  <div className={'comment-detail'}>
                    <tr>
                      <td className="user-name">{comment.user.nickname}</td>
                      <td className="create-date">{comment.createDate}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="content">{comment.content}</td>
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
                    onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <div>
            <p>비밀댓글</p>
            <input type="checkbox" checked={secret} onChange={(event) => setSecret(event.target.value)} />
          </div>
          <Button className={'submit-button'} onClick={submitComment}>작성</Button>
        </div>
      </div>
  )
}