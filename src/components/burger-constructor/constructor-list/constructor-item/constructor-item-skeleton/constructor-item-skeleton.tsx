import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item-skeleton.module.css';
import { constructorItemSkeletonProps } from '../../../../../utils/prop-types';

const ConstructorItemSkeleton = ({
	text,
	position,
	extraClass = '',
}: constructorItemSkeletonProps) => {
	return (
		<div className={`${styles.item} ${extraClass} ml-8`}>
			<ConstructorElement
				text={text}
				type={position}
				thumbnail=''
				price={0}
				extraClass={`${styles.element} ${styles.hiddenThumbnail} ${styles.hiddenPrice}`}
			/>
		</div>
	);
};

export default ConstructorItemSkeleton;
