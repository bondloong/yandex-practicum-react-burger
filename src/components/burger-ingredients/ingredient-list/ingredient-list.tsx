import styles from './ingredient-list.module.css';
import { IIngredientListProps } from '../../../utils/prop-types';
import IngredientItem from './ingredient-item/ingredient-item';
import { forwardRef } from 'react';

const IngredientList = forwardRef<HTMLHeadingElement, IIngredientListProps>(function IngredientGroup({ ingredients, title, type }: IIngredientListProps, ref) {
	return (
		<section>
			<h2 className='text text_type_main-medium' ref={ref as any}>{title}</h2>
			<ul className={`${styles.list} mt-6 mr-2 mb-10 ml-4`}>
				{ingredients
					.filter((ingredient) => ingredient.type === type)
					.map((ingredient) => (
						<IngredientItem key={ingredient._id} ingredient={ingredient} />
					))}
			</ul>
		</section>
	);
});

export default IngredientList;
 
