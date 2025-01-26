/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-item.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { setData } from '../../../services/slices/ingredient-details-slice';
import { Ingredient } from '../../../types';

interface IngredientItemProps {
	ingredient: Ingredient;
}

const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
	const { bun, ingredients } = useAppSelector(
		(store) => store.burgerConstructor
	);

	const counter = useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun && bun._id === ingredient._id ? 2 : null;
		} else {
			return (
				ingredients.filter((item) => item._id === ingredient._id).length || null
			);
		}
	}, [bun, ingredients, ingredient.type, ingredient._id]);

	const { name, image, price } = ingredient;

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ingredient },
	});

	const dispatch = useAppDispatch();

	const handleShowIngredientDetails = () => {
		dispatch(setData(ingredient));
	};

	return (
		<>
			<li
				onClick={handleShowIngredientDetails}
				className={styles.ingredient}
				ref={dragRef}
				data-testid='ingredient-item'>
				{counter && <Counter count={counter} size='default' />}
				<img src={image} alt={name} className='ml-4 mr-4' />
				<span className={`${styles.price} text text_type_digits-default`}>
					{price}
					<CurrencyIcon type='primary' />
				</span>
				<span>{name}</span>
			</li>
		</>
	);
};

export default IngredientItem;
