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
}) => {
	const { user, isAuthChecked } = useAppSelector((store) => store.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return (
			<GridLoader
				color='#fff'
				loading={true}
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: "translate('-50%', '-50%')",
				}}
			/>
		);
	}

	if (!onlyAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (onlyAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return component;
};

export const RouteOnlyAuth = ProtectedRouteElement;
export const RouteOnlyUnAuth = ({ component }: { component: ReactNode }) => (
	<ProtectedRouteElement component={component} onlyAuth={false} />
);
