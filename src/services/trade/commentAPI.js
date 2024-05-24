import axios from "axios";

export const getComments = async (tradeId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/comments/${tradeId}`,
            {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("댓글 목록 조회 실패:", error);
        throw error;
    }
};

export const enrollComment = async (newComment, tradeId) => {
    try {
        await axios.post(`http://localhost:8080/api/v1/comments/${tradeId}`, newComment,
            {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
        return true;
    } catch (error) {
        return false;
    }
}

export const deleteComment = async (commentId) => {
    return await axios.delete(`http://localhost:8080/api/v1/comments/${commentId}`,
        {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}})
        .then(response => { return true; }        )
        .catch(error => { return false; })
}

export const modifyComment = async (commentId, modifiedComment) => {
    try {
        await axios.put(`http://localhost:8080/api/v1/comments/${commentId}`, modifiedComment,
            {headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}});
        return true;
    } catch (error) {
        return false;
    }
}