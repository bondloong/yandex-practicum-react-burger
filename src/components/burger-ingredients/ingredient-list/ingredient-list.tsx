import styles from './ingredient-list.module.css';
import { ingredientListProps } from '../../../utils/prop-types';
import IngredientItem from './ingredient-item/ingredient-item';

const IngredientList = ({ ingredients, name, type }: ingredientListProps) => {
	return (
		<section>
			<h2 className='text text_type_main-medium'>{name}</h2>
			<ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
				{ingredients
					.filter((ingredient) => ingredient.type === type)
					.map((ingredient) => (
						<IngredientItem
							key={ingredient._id}
							ingredient={ingredient}
							counter={1}
						/>
					))}
			</ul>
		</section>
	);
};


export default IngredientList;
