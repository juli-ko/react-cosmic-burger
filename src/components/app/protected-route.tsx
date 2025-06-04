import loader from '../../../src/images/loader.svg';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuth, getUserInfo } from '../../services/userSlice';
import { useSelector } from 'react-redux';

type TProtected = {
	onlyUnAuth?: boolean;
	component: React.JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProtected) => {
	const isAuthChecked = useSelector(getUserAuth);
	const user = useSelector(getUserInfo);
	const location = useLocation();

	if (!isAuthChecked) {
		// Запрос еще выполняется
		return <img src={loader} alt='loader' style={{ width: 300 }} />;
	}

	if (onlyUnAuth && user) {
		// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
		// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	//На страницу ResetPassword можно попасть только со страницы ForgotPassword
	if (onlyUnAuth && !user && location.pathname === '/reset-password') {
		if (location.state?.fromForgotPassword) {
			return component;
		} else {
			return <Navigate to='/' />;
		}
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: TProtected) => (
	<Protected onlyUnAuth={true} component={component} />
);
