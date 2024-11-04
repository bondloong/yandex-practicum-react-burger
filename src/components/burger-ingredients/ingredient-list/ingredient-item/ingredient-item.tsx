import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientItemProps } from '../../../../utils/prop-types';
import styles from './ingredient-item.module.css';
import Modal from '../../../modal/modal';
import IngredientDetails from '../../../ingredient-details/ingredient-details';
import { useState } from 'react';

const IngredientItem = ({
	ingredient,
	counter = 0,
}: ingredientItemProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	const { name, image, price } = ingredient;

	return (
		<>
			<li className={styles.ingredient} onClick={toggleModal}>
				{counter > 0 && (
					<Counter count={counter} size='default' extraClass={styles.counter} />
				)}
				<img src={image} alt={name} className='ml-4 mr-4' />
				<span className={`${styles.price} text text_type_digits-default`}>
					{price}
					<CurrencyIcon type='primary' />
				</span>
				<span>{name}</span>
			</li>

			{isModalOpen && (
				<Modal text='Детали ингредиента' closeModal={toggleModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
};

export default IngredientItem;
