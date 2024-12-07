import { useEffect, useState } from 'react';

const useFormData = (initialValue: { [key: string]: string }) => {
	const [formData, setFormData] = useState(initialValue);
	const [checkFormData, setCheckFormData] = useState<{
		status: boolean;
		field: string | null;
	}>({
		status: false,
		field: null,
	});

	useEffect(() => {
		for (const [key, value] of Object.entries(formData)) {
			if (!value) {
				return setCheckFormData({ status: false, field: key });
			}
		}
		setCheckFormData({ status: true, field: null });
	}, [formData]);

	const onChangeFormData = (
		e: React.ChangeEvent<HTMLInputElement>,
		cb?: (e: React.ChangeEvent<HTMLInputElement>) => void
	) => {
		const target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
		if (cb) return cb(e);
	};

	return { formData, onChangeFormData, checkFormData, setFormData };
};

export default useFormData;
