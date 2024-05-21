import {useEffect, useState} from "react";
import { deleteComment, enrollComment, getComments, modifyComment } from "../../services/trade/comment";
import Button from "../../components/ui/Button";

export default function CommentList({tradeId}) {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
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

  const handleSubmitComment = async () => {
    const commentData = {
      userId: 1,
      content: content,
      secretYn: getSecretValue(secret),
    };

    try {
      if (isModifying) {
        await modifyComment(editCommentId, commentData);
        alert("댓글 수정을 성공하였습니다.");
      } else {
        await enrollComment(commentData, tradeId);
        alert("댓글 등록을 성공하였습니다.");
      }
      setSecret(false);
      setContent("");
      setEditCommentId(null);
      setIsModifying(false);
      const data = await getComments(tradeId);
      setComments(data);
    } catch (error) {
      alert('댓글 처리 중 오류가 발생했습니다.');
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

  const handleEditComment = (commentId, initialContent) => {
    setContent(initialContent);
    setIsModifying(true);
    setEditCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setIsModifying(false);
    setContent("");
    setEditCommentId(null);
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
                    {comment.secretYn === 'Y' ? (
                        <tr>
                          <td colSpan={2} className="content">비밀댓글입니다</td>
                        </tr>
                    ) : (
                        <>
                          <tr>
                            <td className="user-name">{comment.user.nickname}</td>
                            <td className="create-date">{comment.createDate}</td>
                          </tr>
                          <tr>
                            {isModifying && editCommentId === comment.id ? (
                                <td colSpan={2}>
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                                  <div className={'select-secret'}>
                                    <p>비밀댓글</p>
                                    <input type="checkbox" checked={secret}
                                           onChange={(event) => setSecret(
                                               event.target.checked)}/>
                                  </div>
                                </td>
                            ) : (
                                <td colSpan={2} className="content">
                                  {comment.content}
                                </td>
                            )}
                          </tr>
                          <tr>
                            <td>
                              {!isModifying && editCommentId !== comment.id && (
                                  <button>답글</button>
                              )}
                            </td>
                            <td className="delete-comment">
                              {!isModifying || editCommentId !== comment.id ? (
                                  <div>
                                    <img
                                        src={'https://cdn.icon-icons.com/icons2/2715/PNG/512/x_icon_172101.png'}
                                        alt={'delete-icon'}
                                        className={'delete-icon'}
                                        onClick={() => handleDeleteComment(
                                            comment.id)}
                                    />
                                    <img
                                        src={'https://cdn.icon-icons.com/icons2/2098/PNG/512/edit_icon_128873.png'}
                                        className={'modify-icon'}
                                        alt={'modify-icon'}
                                        onClick={() => handleEditComment(comment.id, comment.content)}
                                    />
                                  </div>
                              ) : (
                                  <div className={'modify-buttons'}>
                                    <button onClick={handleCancelEdit}>취소
                                    </button>
                                    <button onClick={handleSubmitComment}>저장
                                    </button>
                                  </div>
                              )}
                            </td>
                          </tr>
                        </>
                    )}
                  </div>
                  <hr/>
                </div>
            );
          })}
          </tbody>
        </table>
        <div className="input-comment">
          {!isModifying && (
              // 수정 모드가 아닌 경우에만 입력 폼을 표시
              <textarea
                  placeholder={'댓글 내용을 입력하세요.'}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
              />
          )}
          {!isModifying && (
              // 수정 모드가 아닌 경우에만 작성 버튼 표시
              <>
                <div className={'select-secret'}>
                  <p>비밀댓글</p>
                  <input type="checkbox" checked={secret}
                         onChange={(event) => setSecret(event.target.checked)}/>
                </div>
                <Button className={'submit-button'}
                        onClick={handleSubmitComment}>작성</Button>
              </>
          )}
        </div>
      </div>
  )
}