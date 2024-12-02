import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item-bun.module.css';
import { constructorItemBunProps } from '../../../../../utils/prop-types';

const ConstructorItemBun = ({
	ingredient,
	position,
	extraClass = '',
}: constructorItemBunProps) => {
	return (
		<div className={`${styles.item} ${extraClass}`}>
			<ConstructorElement
				text={`${ingredient.name}${position === 'top' ? ' (верх)' : ' (низ)'}`}
				price={ingredient.price ? ingredient.price : 0}
				thumbnail={ingredient.image_mobile ? ingredient.image_mobile : ''}
				type={position}
				isLocked={true}
				extraClass={styles.element}
			/>
		</div>
	);
};

export default ConstructorItemBun;
