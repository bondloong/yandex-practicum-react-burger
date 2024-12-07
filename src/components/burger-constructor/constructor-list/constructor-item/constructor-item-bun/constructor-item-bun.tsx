import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item-bun.module.css';
import { ConstructorItemType, Ingredient } from '../../../../../types';

interface ConstructorItemBunProps {
	ingredient: Ingredient;
	type: ConstructorItemType;
	extraClass?: string;
}

const ConstructorItemBun: FC<ConstructorItemBunProps> = ({
	ingredient,
	type,
	extraClass = '',
}) => {
	return (
		<div className={`${styles.item} ${extraClass}`}>
			<ConstructorElement
				text={`${ingredient.name}${type === 'top' ? ' (верх)' : ' (низ)'}`}
				price={ingredient.price}
				thumbnail={ingredient.image_mobile}
				type={type}
				isLocked={true}
				extraClass={styles.element}
			/>
		</div>
	);
};

export default ConstructorItemBun;
