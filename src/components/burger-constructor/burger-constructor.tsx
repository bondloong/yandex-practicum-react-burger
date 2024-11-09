import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import useShowModal from '../../hooks/use-show-modal';
import { useAppDispatch, useAppSelector } from '../../services/slices';
import { useMemo } from 'react';
import { sendOrder } from '../../services/slices/order-details-slice';
import { addIngredient } from '../../services/slices/burger-сonstructor-slice';
import { ingredientItemProps } from '../../utils/prop-types';

const BurgerConstructor = () => {
	const { isShowModal, openModal, closeModal } = useShowModal(false);
	const { bun, ingredients } = useAppSelector((store) => store.burgerConstructor);
	const { isLoading } = useAppSelector((store) => store.burgerIngredients);

	const dispatch = useAppDispatch();

	const totalPrice = useMemo(() => {
		const bunPrice = bun && bun.price ? bun.price * 2 : 0;
		return bunPrice + ingredients.reduce((acc, ingredient) => acc + (ingredient.price ?? 0), 0);
	}, [bun, ingredients]);

	const handleSubmitOrder = () => {
		if (bun && ingredients.length) {
			const preparedData = { ingredients: [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id] };
			dispatch(sendOrder(preparedData));
			openModal();
		}
	};

	const handleIngredientDrop = (item: ingredientItemProps): void => {
		dispatch(addIngredient(item.ingredient));
	};

	return (
		!isLoading && (
			<article className={`pt-25 pb-10 pl-4`}>
				<ConstructorList
					bun={bun}
					ingredients={ingredients}
					onDropHandler={handleIngredientDrop}
				/>
				<div className={styles.order}>
					<span className={`${styles.total} text text_type_digits-medium`}>
						{totalPrice}
						<CurrencyIcon type='primary' />
					</span>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handleSubmitOrder}
					>
						Оформить заказ
					</Button>
				</div>
				{isShowModal && (
					<Modal closeModal={closeModal}>
						<OrderDetails />
					</Modal>
				)}
			</article>
		)
	);
};

export default BurgerConstructor;
