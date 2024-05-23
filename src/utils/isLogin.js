const isLogin = () => {
	return localStorage.getItem('accessToken');
};
export default isLogin;
