import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item-skeleton.module.css';
import { ConstructorItemType } from '../../../../../types';

interface ConstructorItemSkeletonProps {
	text: string;
	type?: ConstructorItemType;
	extraClass?: string;
}

const ConstructorItemSkeleton: FC<ConstructorItemSkeletonProps> = ({
	text,
	type,
	extraClass = '',
}) => {
	return (
		<div className={`${styles.item} ${extraClass} ml-8`}>
			<ConstructorElement
				thumbnail=''
				price={0}
				text={text}
				type={type}
				extraClass={styles.element}
			/>
		</div>
	);
};

export default ConstructorItemSkeleton;
