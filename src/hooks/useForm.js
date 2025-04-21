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

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		return password.length > 5;
	};

	return {
		formData,
		isChanged,
		setFormData,
		handleChange,
		resetForm,
		validateEmail,
		validatePassword,
	};
};

export default useForm;
