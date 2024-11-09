import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { IIngredient } from '../../../../utils/prop-types';
import styles from './constructor-item.module.css';
import { memo } from 'react';// Предполагается, что хуки находятся в hooks.ts
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { useAppDispatch } from '../../../../services/slices';
import { removeIngredient, sortIngredients } from '../../../../services/slices/burger-сonstructor-slice';

interface IIngredientWithId extends IIngredient {
	id: string;
}

interface DragItem {
	id: string;
	originalIndex: number;
}

interface ConstructorItemProps {
	ingredient: IIngredientWithId;
	moveIngredient: (id: string, toIndex: number) => void;
	findIngredient: (id: string) => { ingredient: IIngredientWithId; index: number };
}

const ConstructorItem = memo(function ConstructorItem({ ingredient, moveIngredient, findIngredient }: ConstructorItemProps) {
	const dispatch = useAppDispatch();

	const originalIndex = findIngredient(ingredient.id).index;

	const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(
		() => ({
			type: 'constructorIngredient',
			item: { id: ingredient.id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveIngredient(droppedId, originalIndex);
				}
			},
		}),
		[originalIndex, moveIngredient]
	);

	const [, drop] = useDrop<DragItem>(
		{
			accept: 'constructorIngredient',
			hover: (item: DragItem, monitor: DropTargetMonitor) => {
				if (item.id !== ingredient.id) {
					const { index: overIndex } = findIngredient(ingredient.id);
					moveIngredient(item.id, overIndex);
					item.originalIndex = overIndex; 
				}
			},
			drop: (item: DragItem) => {
				dispatch(sortIngredients({ fromIndex: item.originalIndex, toIndex: findIngredient(item.id).index }));
			},
		},
		[findIngredient, moveIngredient]
	);

	const opacity = isDragging ? 0 : 1;

	const handleDeleteIngredient = (ingredient: IIngredientWithId) => {
		dispatch(removeIngredient(ingredient));
	};

	return (
		<li className={styles.item} style={{ opacity }} ref={(node) => drag(drop(node))}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price ?? 0}
				thumbnail={ingredient.image_mobile ?? ''}
				extraClass={styles.element}
				handleClose={() => handleDeleteIngredient(ingredient)}
			/>
		</li>
	);
});

export default ConstructorItem;
