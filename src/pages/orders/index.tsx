import { useEffect } from 'react';

import styles from './orders.module.css';
import { connect, disconnect } from '../../services/slices/websocket-slice';
import { GridLoader } from 'react-spinners';
import { WebsocketStatus } from '../../types/websocket';
import { useAppDispatch, useAppSelector } from '../../services/store';
import OrderList from '../../components/order-list';

export default function OrdersPage() {
	const dispatch = useAppDispatch();
	const { status, orders } = useAppSelector((store) => store.webSocket);

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken)
			dispatch(connect(`orders?token=${accessToken.substring(7)}`));
		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<div className={styles.orders}>
			<GridLoader
				color='#fff'
				loading={status !== WebsocketStatus.ONLINE}
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: "translate('-50%', '-50%')",
				}}
			/>
			{status === WebsocketStatus.ONLINE && orders.length > 0 && (
				<OrderList
					isShowStatus={true}
					linkEndpoint='/profile/orders'
					isOrdersReverse={true}
				/>
			)}
		</div>
	);
}
