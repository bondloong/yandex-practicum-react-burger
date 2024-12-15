import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './navigation-item.module.css';

interface INavigationItem {
	iconType: keyof typeof ICONS;
	text: string;
	link?: string;
	active?: boolean;
}

const ICONS = {
	burger: BurgerIcon,
	list: ListIcon,
	profile: ProfileIcon,
};

const NavigationItem = ({
	iconType,
	text,
	link = '/',
	active,
}: INavigationItem) => {
	const Icon = ICONS[iconType];

	return (
		<li className={styles.item}>
			<a
				href={link}
				className={`${styles.link} pt-4 pr-5 pb-4 pl-5 ${
					active ? '' : styles.inactive
				}`}>
				{Icon && <Icon type={active ? 'primary' : 'secondary'} />}
				<span>{text}</span>
			</a>
		</li>
	);
};

export default NavigationItem;
