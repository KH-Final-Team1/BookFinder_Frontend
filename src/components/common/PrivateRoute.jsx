import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from "../../utils/isLogin";

const PrivateRoute = ({ element: Element, ...rest }) => {
	if (!isLogin()) {
		alert("로그인 후 이용 가능합니다");
		return <Navigate to="/login" />;
	} else {
		return <Element {...rest} />;
	}
};

export default PrivateRoute;