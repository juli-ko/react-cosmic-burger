import { useState } from 'react';

const useForm = (initialValues) => {
	const [formData, setFormData] = useState(initialValues);
	const [isChanged, setIsChanged] = useState(false);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setIsChanged(true);
	};

	const resetForm = () => {
		setFormData(initialValues);
		setIsChanged(false);
	};

	return {
		formData,
		isChanged,
		setFormData,
		handleChange,
		resetForm,
	};
};

export default useForm;
