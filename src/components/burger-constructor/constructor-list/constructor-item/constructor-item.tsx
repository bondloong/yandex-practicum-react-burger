import { memo, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { ConstructorIngredient } from '../../../../types';
import { useAppDispatch } from '../../../../services/store';
import {
	removeIngredient,
	sortIngredients,
} from '../../../../services/slices/burger-сonstructor-slice';

interface ConstructorItemProps {
	ingredient: ConstructorIngredient;
	moveIngredient: (id: string, atIndex: number) => void;
	findIngredient: (id: string) => { index: number };
}

interface Item {
	id: string;
	originalIndex: number;
}

const ConstructorItem: FC<ConstructorItemProps> = memo(
	function ConstructorItem({ ingredient, moveIngredient, findIngredient }) {
		const dispatch = useAppDispatch();

		const originalIndex = findIngredient(ingredient.id).index;

		const [{ isDragging }, drag] = useDrag(
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

		const [, drop] = useDrop(
			() => ({
				accept: 'constructorIngredient',
				hover({ id: draggedId }: Item) {
					if (draggedId !== ingredient.id) {
						const { index: overIndex } = findIngredient(ingredient.id);
						moveIngredient(draggedId, overIndex);
					}
				},
				drop(item) {
					dispatch(
						sortIngredients({
							fromIndex: item.originalIndex,
							toIndex: findIngredient(item.id).index,
						})
					);
				},
			}),
			[findIngredient, moveIngredient]
		);
		const opacity = isDragging ? 0 : 1;

		const handleDeleteIngredient = (ingredient: ConstructorIngredient) => {
			dispatch(removeIngredient(ingredient));
		};

		return (
			<li
				className={styles.item}
				style={{ opacity }}
				ref={(node) => drag(drop(node))}>
				<DragIcon type='primary' />
				<ConstructorElement
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image_mobile}
					extraClass={styles.element}
					handleClose={() => handleDeleteIngredient(ingredient)}
				/>
			</li>
		);
	}
);

export default ConstructorItem;
