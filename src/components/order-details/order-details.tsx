import { useEffect } from 'react';

import { clearOrder } from '../../services/slices/order-details-slice';
import done from '../../images/done.gif';
import styles from './order-details.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

const OrderDetails: React.FC = () => {
	const { isError, data } = useAppSelector((state) => state.orderDetails);

	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			dispatch(clearOrder());
		};
	}, [dispatch]);

	return (
		<div className={styles.order}>
			{isError && <>Ошибка при отпраке заказа</>}
			{data ? (
				<>
					<span
						className={`${styles.order_number} text text_type_digits-large`}
						data-testid='order-number'>
						{data.number}
					</span>
					<span className='text text_type_main-medium mt-8'>
						идентификатор заказа
					</span>
					<img src={done} alt='done' className='mt-15' />
					<span className='text text_type_main-default mt-15'>
						Ваш заказ начали готовить
					</span>
					<span className='text text_type_main-default text_color_inactive mt-2'>
						Дождитесь готовности на орбитальной станции
					</span>
				</>
			) : (
				<Navigate to='/' replace={true} />
			)}
		</div>
	);
};

export default OrderDetails;
