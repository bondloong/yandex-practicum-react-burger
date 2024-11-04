import { useState } from 'react';

const useShowModal = (initialValue: boolean) => {
	const [isShowModal, setShowModal] = useState(initialValue);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return { isShowModal, openModal, closeModal };
};

export default useShowModal;