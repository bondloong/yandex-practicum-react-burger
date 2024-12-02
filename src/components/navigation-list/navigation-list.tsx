import NavigationItem from './navigation-item/navigation-item';
import styles from './navigation-list.module.css';

const NavigationList = () => {
	return (
		<nav className={`${styles.nav} pt-4 pb-4`}>
			<ul className={styles.list}>
				<NavigationItem iconType='burger' text='Конструктор' active />
				<NavigationItem iconType='list' text='Лента заказов' />
				<NavigationItem iconType='profile' text='Личный кабинет' />
			</ul>
		</nav>
	);
};

export default NavigationList;
