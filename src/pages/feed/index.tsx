import { useEffect } from 'react';

import OrderList from '../../components/order-list';
import OrderCounter from '../../components/order-counter';
import styles from './feed.module.css';
import { connect, disconnect } from '../../services/slices/websocket-slice';
import { GridLoader } from 'react-spinners';
import { WebsocketStatus } from '../../types/websocket';
import { useAppDispatch, useAppSelector } from '../../services/store';

export default function FeedPage() {
	const dispatch = useAppDispatch();
	const { status, orders } = useAppSelector((store) => store.webSocket);

	useEffect(() => {
		dispatch(connect('orders/all'));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<main className={`${styles.main} pr-5 pl-5`}>
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
			<h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
			{status === WebsocketStatus.ONLINE && orders.length > 0 && (
				<div className={`${styles.container} mt-5`}>
					<OrderList isShowStatus={false} linkEndpoint='/feed' />
					<OrderCounter />
				</div>
			)}
		</main>
	);
}
