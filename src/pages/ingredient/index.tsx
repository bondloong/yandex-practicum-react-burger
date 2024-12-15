import { useEffect } from 'react';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { useAppDispatch } from '../../services/slices';

export default function IngredientPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<main className={styles.ingredient}>
			<IngredientDetails />
		</main>
	);
}
