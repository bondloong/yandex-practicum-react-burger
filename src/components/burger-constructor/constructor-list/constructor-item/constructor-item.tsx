import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { IIngredient } from '../../../../utils/prop-types';
import styles from './constructor-item.module.css';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../../services/slices';
import { removeIngredient } from '../../../../services/slices/burger-сonstructor-slice';

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
	findIngredient: (id: string) => {
		ingredient: IIngredientWithId;
		index: number;
	};
}

const ConstructorItem = memo(function ConstructorItem({
	ingredient,
	moveIngredient,
	findIngredient,
}: ConstructorItemProps) {
	const dispatch = useAppDispatch();

	const originalIndex = findIngredient(ingredient.id).index;

	const [{ isDragging }, dragRef] = useDrag<
		DragItem,
		void,
		{ isDragging: boolean }
	>(
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

	const [, dropRef] = useDrop<DragItem, void>({
		accept: 'constructorIngredient',
		hover(item: DragItem) {
			if (item.id !== ingredient.id) {
				const { index: overIndex } = findIngredient(ingredient.id);
				moveIngredient(item.id, overIndex);
			}
		},
	});

	const combinedRef = (node: HTMLLIElement | null) => {
		dragRef(node);
		dropRef(node);
	};

	const opacity = isDragging ? 0 : 1;

	const handleDeleteIngredient = () => {
		dispatch(removeIngredient({ id: ingredient.id }));
	};

	return (
		<li className={styles.item} style={{ opacity }} ref={combinedRef}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price ?? 0}
				thumbnail={ingredient.image_mobile ?? ''}
				extraClass={styles.element}
				handleClose={handleDeleteIngredient}
			/>
		</li>
	);
});

export default ConstructorItem;
