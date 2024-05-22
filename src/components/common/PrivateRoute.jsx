import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from "../../utils/isLogin";

const PrivateRoute = ({ element: Element, ...rest }) => {
	const alertShown = useRef(false);

	useEffect(() => {
		if (!isLogin() && !alertShown.current) {
			alertShown.current = true;
			alert("로그인 후 이용 가능합니다");
		}
	}, []);

	if (!isLogin()) {
		return <Navigate to="/login" />;
	} else {
		return <Element {...rest} />;
	}
};

export default PrivateRoute;
