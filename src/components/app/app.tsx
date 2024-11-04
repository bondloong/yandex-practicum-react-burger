import { IingredientsData } from '../../utils/prop-types';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { useEffect, useState } from 'react';

const URL_API = 'https://norma.nomoreparties.space/api';

function App() {
	const [ingredients, setIngredients] = useState<IingredientsData>({
		isLoading: true,
		isError: false,
		data: null,
	});

	useEffect(() => {
		const getIngredientData = async () => {
			try {
				const res = await fetch(`${URL_API}/ingredients`);
				if (!res.ok) throw new Error('Ошибка HTTP');
				const data = await res.json();
				if (data.success) {
					setIngredients({ isLoading: false, isError: false, data: data.data });
				} else {
					throw new Error('Ошибка данных API');
				}
			} catch (error) {
				setIngredients({ isLoading: false, isError: true, data: null });
			}
		};

		getIngredientData();
	}, []);

	return (
		<div className={styles.app}>
			{ingredients.isLoading && <>Идет загрузка ингредиентов...</>}
			{ingredients.isError && <>Ошибка при загрузке ингредиентов</>}
			{ingredients.data && (
				<>
					<AppHeader />
					<main className={`${styles.main} pr-5 pl-5`}>
						<BurgerIngredients ingredients={ingredients.data} />
						<BurgerConstructor ingredients={ingredients.data} />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
