import { DndProvider } from 'react-dnd';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main} pr-5 pl-5`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</div>
	);
}

export default App;
