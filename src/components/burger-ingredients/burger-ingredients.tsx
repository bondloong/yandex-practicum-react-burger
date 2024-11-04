import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import IngredientList from './ingredient-list/ingredient-list';
import { IIngredient, ingredientListProps } from '../../utils/prop-types';
import { useState } from 'react';

const BurgerIngredients = ({ ingredients }: {ingredients:IIngredient[]}) => {
	const [activeTab, setActiveTab] = useState('bun');

	const tabs = [
		{ key: 'bun', label: 'Булки' },
		{ key: 'sauce', label: 'Соусы' },
		{ key: 'main', label: 'Начинки' },
	];

	const handleTabClick = (value: string) => {
		setActiveTab(value);
	};

	return (
		<article className={`pt-10 pb-10`}>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className={`${styles.tabs} mb-10`}>
				{tabs.map((tab) => (
					<Tab
						key={`${tab.key}Tab`}
						active={activeTab === tab.key}
						value={tab.key}
						onClick={handleTabClick}
					>
						{tab.label}
					</Tab>
				))}
			</div>
			<div className={`${styles.groups}`}>
				<IngredientList
					key='bunGroup'
					ingredients={ingredients}
					name='Булки'
					type='bun'
				/>
				<IngredientList
					key='sauceGroup'
					ingredients={ingredients}
					name='Соусы'
					type='sauce'
				/>
				<IngredientList
					key='mainGroup'
					ingredients={ingredients}
					name='Начинки'
					type='main'
				/>
			</div>
		</article>
	);
};

export default BurgerIngredients;
