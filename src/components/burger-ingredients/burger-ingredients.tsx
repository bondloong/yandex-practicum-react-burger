import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import IngredientList from './ingredient-list/ingredient-list';
import { useEffect, useRef, useState } from 'react';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import { GridLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../services/slices';

type TabType = 'bun' | 'sauce' | 'main';

const BurgerIngredients: React.FC = () => {
	const { isLoading, isError, data } = useAppSelector((state) => state.burgerIngredients);
	const dispatch = useAppDispatch();

	const tabsRef = useRef<HTMLDivElement | null>(null);
	const groupBunRef = useRef<HTMLDivElement | null>(null);
	const groupSauceRef = useRef<HTMLDivElement | null>(null);
	const groupMainRef = useRef<HTMLDivElement | null>(null);

	const [activeTab, setActiveTab] = useState<TabType>('bun');

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	const handleScrollIngredientGroup = (): void => {
		if (
			!tabsRef.current ||
			!groupBunRef.current ||
			!groupSauceRef.current ||
			!groupMainRef.current
		) {
			return;
		}

		const tabsTopCoord = tabsRef.current.getBoundingClientRect().top;
		const bunTopCoord = groupBunRef.current.getBoundingClientRect().top;
		const sauceTopCoord = groupSauceRef.current.getBoundingClientRect().top;
		const mainTopCoord = groupMainRef.current.getBoundingClientRect().top;

		const arr = [bunTopCoord, sauceTopCoord, mainTopCoord];

		const closestIndex = arr.findIndex(
			(elem) =>
				elem ===
				arr.reduce((prev, curr) =>
					Math.abs(curr - tabsTopCoord) < Math.abs(prev - tabsTopCoord) ? curr : prev
				)
		);

		switch (closestIndex) {
			case 0:
				if (activeTab !== 'bun') setActiveTab('bun');
				break;
			case 1:
				if (activeTab !== 'sauce') setActiveTab('sauce');
				break;
			case 2:
				if (activeTab !== 'main') setActiveTab('main');
				break;
			default:
				setActiveTab('bun');
				break;
		}
	};

	const handleClickTab = (value: string): void => {
		if (value === 'bun' || value === 'sauce' || value === 'main') {
			if (activeTab !== value) setActiveTab(value);

			switch (value) {
				case 'bun':
					groupBunRef.current?.scrollIntoView({ behavior: 'smooth' });
					break;
				case 'sauce':
					groupSauceRef.current?.scrollIntoView({ behavior: 'smooth' });
					break;
				case 'main':
					groupMainRef.current?.scrollIntoView({ behavior: 'smooth' });
					break;
			}
		} else {
			console.warn(`Unexpected tab value: ${value}`);
		}
	};


	return (
		<>
			<GridLoader
				color='#fff'
				loading={isLoading}
				cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
			/>
			{isError && <>Ошибка при загрузке ингредиентов</>}
			{data && (
				<article className='pt-10 pb-10'>
					<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
					<div ref={tabsRef} className={`${styles.tabs} mb-10`}>
						<Tab value='bun' active={activeTab === 'bun'} onClick={handleClickTab}>
							Булки
						</Tab>
						<Tab value='sauce' active={activeTab === 'sauce'} onClick={handleClickTab}>
							Соусы
						</Tab>
						<Tab value='main' active={activeTab === 'main'} onClick={handleClickTab}>
							Начинки
						</Tab>
					</div>
					<div className={`${styles.groups}`} onScroll={handleScrollIngredientGroup}>
						<IngredientList
							ingredients={data}
							title='Булки'
							type='bun'
							ref={groupBunRef}
						/>
						<IngredientList
							ingredients={data}
							title='Соусы'
							type='sauce'
							ref={groupSauceRef}
						/>
						<IngredientList
							ingredients={data}
							title='Начинки'
							type='main'
							ref={groupMainRef}
						/>
					</div>
				</article>
			)}
		</>
	);
};

export default BurgerIngredients;
