import styles from './order-details.module.css';
import done from '../../images/done.gif';

const OrderDetails = () => {
	return (
		<div className={styles.order}>
			<span className={`${styles.order_number} text text_type_digits-large`}>
				034536
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
		</div>
	);
};

export default OrderDetails;
