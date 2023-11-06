import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/actions/addingActions';
import { Formik } from 'formik';
import * as yup from 'yup';

const Contact = () => {
	const dispatch = useDispatch();

	const handleFormSubmit = (values) => {
		dispatch(addContact(values));
    // setTimeout(() => {
		// 	window.location.reload();
		// }, 1000);
    window.scroll(0,0)
	};
	return (
		<div
			name='contact'
			className='w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white'
		>
			<div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
				<div className='pb-8'>
					<p className='text-4xl font-bold inline border-b-4 border-gray-500'>
						Contact
					</p>
					<p className='py-6'>Submit the form below to get in touch with me</p>
				</div>

				<div className=' flex justify-center items-center'>
					<Formik
						onSubmit={handleFormSubmit}
						initialValues={initialValues}
						validationSchema={checkoutSchema}
					>
						{({ values, errors, touched, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit} className=' flex flex-col w-full md:w-1/2'>
								<input
									type='text'
									name='name'
									placeholder='Enter your name'
									onChange={handleChange}
									value={values.name}
									error={!!touched.name && !!errors.name}
									helperText={touched.name && errors.name}
									className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
								/>
								<input
									type='text'
									name='email'
									placeholder='Enter your email'
									onChange={handleChange}
									value={values.email}
									error={!!touched.email && !!errors.email}
									helperText={touched.email && errors.email}
									className='my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
								/>
								<textarea
									name='message'
									placeholder='Enter your message'
									rows='10'
									onChange={handleChange}
									value={values.message}
									error={!!touched.message && !!errors.message}
									helperText={touched.message && errors.message}
									className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'
								></textarea>

								<button className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>
									Let's talk
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};
const checkoutSchema = yup.object().shape({
	name: yup.string().required('required'),
	email: yup.string().required('required'),
	message: yup.string().required('required'),
});
const initialValues = { name: '', email: '', message: '' };

export default Contact;
