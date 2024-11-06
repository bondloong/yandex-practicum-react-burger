import { IIngredient } from '../../utils/prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }: { ingredient: IIngredient }) => {
	const { image_large, name, calories, proteins, fat, carbohydrates } =
		ingredient;

	return (
		<div className={styles.ingredient}>
			<img src={image_large} alt={name} />
			<span className='text text_type_main-medium mt-4'>{name}</span>
			<div className={styles.nutrition}>
				<div className={styles.nutrition_item}>
					<span className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{calories}
					</span>
				</div>
				<div className={styles.nutrition_item}>
					<span className='text text_type_main-default text_color_inactive'>
						Белки, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{proteins}
					</span>
				</div>
				<div className={styles.nutrition_item}>
					<span className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{fat}
					</span>
				</div>
				<div className={styles.nutrition_item}>
					<span className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{carbohydrates}
					</span>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
