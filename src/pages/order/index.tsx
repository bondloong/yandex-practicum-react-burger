import OrderInfo from '../../components/order-info';
import styles from './order.module.css';

export default function OrderPage() {
	return (
		<main className={styles.main}>
			<OrderInfo />
		</main>
	);
}
