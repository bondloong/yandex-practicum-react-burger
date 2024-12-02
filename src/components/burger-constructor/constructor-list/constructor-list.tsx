import styles from './constructor-list.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import {
	IConstructorListProps,
	IIngredient,
	IIngredientItemProps,
} from '../../../utils/prop-types';
import { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ConstructorItemBun from './constructor-item/constructor-item-bun/constructor-item-bun';
import ConstructorItemSkeleton from './constructor-item/constructor-item-skeleton/constructor-item-skeleton';
import { useAppDispatch, useAppSelector } from '../../../services/slices';
import { sortIngredients } from '../../../services/slices/burger-сonstructor-slice';

const ConstructorList = memo(function ConstructorList({
	onDropHandler,
}: IConstructorListProps) {
	const { bun, ingredients } = useAppSelector(
		(store) => store.burgerConstructor
	);
	const dispatch = useAppDispatch();

	const findIngredient = useCallback(
		(id: string) => {
			const ingredient = ingredients.find((ingredient) => ingredient.id === id);
			if (!ingredient) {
				throw new Error(`Ingredient with id ${id} not found`);
			}
			return {
				ingredient: ingredient as IIngredient,
				index: ingredients.indexOf(ingredient),
			};
		},
		[ingredients]
	);

	const moveIngredient = useCallback(
		(id: string, toIndex: number) => {
			const { index } = findIngredient(id);
			if (index !== -1 && toIndex !== -1) {
				dispatch(sortIngredients({ fromIndex: index, toIndex }));
			}
		},
		[dispatch, findIngredient]
	);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient: IIngredientItemProps) {
			onDropHandler(ingredient);
		},
	});

	const addBun = (position: 'top' | 'bottom') =>
		bun ? (
			<ConstructorItemBun
				ingredient={bun}
				position={position}
				extraClass={styles.fix_item}
			/>
		) : (
			<ConstructorItemSkeleton
				text='Выберите булки'
				position={position}
				extraClass={styles.fix_item}
			/>
		);

	return (
		<section className='mb-10' ref={dropTarget}>
			{addBun('top')}

			<ul className={`${styles.list}`}>
				{ingredients.length ? (
					ingredients.map((ingredient) => (
						<ConstructorItem
							key={ingredient.id}
							ingredient={ingredient}
							moveIngredient={moveIngredient}
							findIngredient={findIngredient}
						/>
					))
				) : (
					<ConstructorItemSkeleton text='Выберите начинку и соусы' />
				)}
			</ul>

			{addBun('bottom')}
		</section>
	);
});

export default ConstructorList;
