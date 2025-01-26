import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { useAppSelector } from '../../services/store';

const ProtectedRouteElement = ({
	component,
	onlyAuth = true,
}: {
	component: ReactNode;
	onlyAuth?: boolean;
}): JSX.Element | null => {
	const { user, isAuthChecked } = useAppSelector((store) => store.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return (
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}>
				<GridLoader color='#fff' loading={true} />
			</div>
		);
	}

	if (!onlyAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} replace />;
	}

	if (onlyAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <>{component}</>;
};

export const RouteOnlyAuth = ({
	component,
}: {
	component: ReactNode;
}): JSX.Element => (
	<ProtectedRouteElement component={component} onlyAuth={true} />
);

export const RouteOnlyUnAuth = ({
	component,
}: {
	component: ReactNode;
}): JSX.Element => (
	<ProtectedRouteElement component={component} onlyAuth={false} />
);
