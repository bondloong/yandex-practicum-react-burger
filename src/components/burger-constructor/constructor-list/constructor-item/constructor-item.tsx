import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { constructorItemProps } from '../../../../utils/prop-types';
import styles from './constructor-item.module.css';

const ConstructorItem = ({
	ingredient,
	type = undefined,
	extraClass,
}: constructorItemProps) => {
	return (
		<div className={`${styles.item} ${extraClass}`}>
			{ingredient.type !== 'bun' && <DragIcon type='primary' />}
			<ConstructorElement
				text={`${ingredient.name}${type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : ''
					}`}
				price={ingredient.price || 0}
				thumbnail={ingredient.image_mobile || ""}
				type={type}
				isLocked={ingredient.type === 'bun'}
				extraClass={styles.element}
			/>
		</div>
	);
};



export default ConstructorItem;
