import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './navigation-item.module.css';

interface INavigationItem {
	iconType: string;
	text: string;
	link?: string;
	active?: boolean;
}

const NavigationItem = ({ iconType, text, link = '/', active }: INavigationItem) => {
	let icon;

	switch (iconType) {
		case 'burger':
			icon = <BurgerIcon type={active ? 'primary' : 'secondary'} />;
			break;
		case 'list':
			icon = <ListIcon type={active ? 'primary' : 'secondary'} />;
			break;
		case 'profile':
			icon = <ProfileIcon type={active ? 'primary' : 'secondary'} />;
			break;
		default:
			icon = null;
	}

	return (
		<li className={`${styles.item}`}>
			<a href={link} className={`${styles.link} pt-4 pr-5 pb-4 pl-5 ${active ? '' : styles.inactive}`}>
				{icon}
				{text}
			</a>
		</li>
	);
};


export default NavigationItem;