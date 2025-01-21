import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useAppSelector } from '../../services/slices';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
	const { user } = useAppSelector((store) => store.user);

	return (
		<header className={styles.header}>
			<Link to='/' className={styles.logo}>
				<Logo />
			</Link>
			<nav className={`${styles.nav} pt-4 pb-4`}>
				<ul className={styles.list}>
					<li className={`${styles.item}`}>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? `${styles.link}`
									: `${styles.link} ${styles.inactive}`
							}>
							{({ isActive }) => (
								<>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
									{'Конструктор'}
								</>
							)}
						</NavLink>
					</li>
					<li className={`${styles.item}`}>
						<NavLink
							to='/feed'
							className={({ isActive }) =>
								isActive
									? `${styles.link}`
									: `${styles.link} ${styles.inactive}`
							}>
							{({ isActive }) => (
								<>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
									{'Лента заказов'}
								</>
							)}
						</NavLink>
					</li>
					<li className={`${styles.item}`}>
						<NavLink
							to='/profile'
							className={({ isActive }) =>
								isActive
									? `${styles.link}`
									: `${styles.link} ${styles.inactive}`
							}>
							{({ isActive }) => (
								<>
									<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
									{user ? user.name : 'Личный кабинет'}
								</>
							)}
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
