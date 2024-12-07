import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

export default function NotFound404() {
	return (
		<main className={styles.main}>
			<h1>Кажется вы заблудились</h1>
			<p>
				Проверьте маршрут или перейдите в <Link to='/'>Конструктор</Link>
			</p>
		</main>
	);
}
