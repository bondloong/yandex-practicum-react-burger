import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import styles from './constructor-list.module.css';
import {
	ConstructorItemType,
	ConstructorIngredient,
	ConstructorIngredients,
	Ingredient,
} from '../../../types';
import ConstructorItemBun from './constructor-item/constructor-item-bun/constructor-item-bun';
import ConstructorItemSkeleton from './constructor-item/constructor-item-skeleton/constructor-item-skeleton';
import ConstructorItem from './constructor-item/constructor-item';
import { useAppSelector } from '../../../services/store';

interface ConstructorListProps {
	onDropHandler: (ingredient: Ingredient) => void;
}

const ConstructorList: FC<ConstructorListProps> = memo(
	function ConstructorList({ onDropHandler }) {
		const { bun, ingredients } = useAppSelector(
			(store) => store.burgerConstructor
		);

		const [constructorIngredients, setConstructorIngredients] =
			useState<ConstructorIngredients>(ingredients);

		useEffect(() => {
			setConstructorIngredients(ingredients);
		}, [ingredients]);

		const findIngredient = useCallback(
			(id: string) => {
				const ingredient = constructorIngredients.filter(
					(ingredient) => ingredient.id === id
				)[0];
				return {
					ingredient,
					index: constructorIngredients.indexOf(ingredient),
				};
			},
			[constructorIngredients]
		);

		const moveIngredient = useCallback(
			(id: string, atIndex: number) => {
				const { ingredient, index } = findIngredient(id);
				setConstructorIngredients(
					update(constructorIngredients, {
						$splice: [
							[index, 1],
							[atIndex, 0, ingredient],
						],
					})
				);
			},
			[findIngredient, constructorIngredients]
		);

		const [, dropTarget] = useDrop({
			accept: 'ingredient',
			drop(item: { ingredient: ConstructorIngredient }) {
				onDropHandler(item.ingredient);
			},
		});

		const addBun = (type: ConstructorItemType) =>
			bun ? (
				<ConstructorItemBun
					ingredient={bun}
					type={type}
					extraClass={styles.fix_item}
				/>
			) : (
				<ConstructorItemSkeleton
					text='Выберите булки'
					type={type}
					extraClass={styles.fix_item}
				/>
			);

		return (
			<section
				className='mb-10'
				ref={dropTarget}
				data-testid='constructor-drop-target'>
				{addBun('top')}

				<ul className={`${styles.list}`}>
					{constructorIngredients.length ? (
						constructorIngredients.map((ingredient) => (
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
	}
);

export default ConstructorList;
