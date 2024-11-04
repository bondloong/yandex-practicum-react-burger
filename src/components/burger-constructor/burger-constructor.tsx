import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IIngredient } from '../../utils/prop-types';
import ConstructorList from './constructor-list/constructor-list';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState } from 'react';

const BurgerConstructor = ({ ingredients = [] }: { ingredients: IIngredient[] }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	const totalPrice = ingredients.reduce((sum, item) => sum + (item.price || 0), 0);

	if (ingredients.length === 0) {
		return <div>Загрузка ингредиентов...</div>;
	}

	return (
		<article className="pt-25 pb-10 pl-4">
			<ConstructorList ingredients={ingredients} />
			<div className={styles.order}>
				<span className={`${styles.total} text text_type_digits-medium`}>
					{totalPrice}
					<CurrencyIcon type='primary' />
				</span>
				<Button htmlType='button' type='primary' size='large' onClick={toggleModal}>
					Оформить заказ
				</Button>
			</div>
			{/* Отображаем модальное окно при открытии */}
			{isModalOpen && (
				<Modal closeModal={toggleModal}>
					<OrderDetails />
				</Modal>
			)}
		</article>
	);
};

export default BurgerConstructor;
