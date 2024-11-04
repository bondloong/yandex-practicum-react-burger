import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavigationList from '../navigation-list/navigation-list';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<span className={styles.logo}>
				<Logo />
			</span>
			<NavigationList />
		</header>
	);
};

export default AppHeader;