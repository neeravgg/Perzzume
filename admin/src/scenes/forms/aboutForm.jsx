import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addAbout } from '../../redux/actions/addingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateAbout } from '../../redux/actions/updateActions';

const AboutForm = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const { aboutData } = useSelector((state) => state.aboutReducer);

	const initialValues = location.pathname.includes('update')
		? { title: aboutData?.title, description: aboutData?.description }
		: { title: '', description: '' };

	const handleFormSubmit = (values) => {
		let obj = new FormData();
		for (var key in values) {
			obj.append(key, values[key]);
		}
		if (location.pathname.includes('update')) {
			dispatch(updateAbout(values));
		} else {
			dispatch(addAbout(values));
		}
		navigate(-1);
	};

	return (
		<Box m='20px'>
			<Header title='CREATE USER' subtitle='Create a New User Profile' />

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}
			>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Box
							display='grid'
							gap='50px'
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
							}}
						>
							<TextField
								fullWidth
								variant='outlined'
								type='text'
								label='Job Title'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.title}
								name='title'
								error={!!touched.title && !!errors.title}
								helperText={touched.title && errors.title}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant='outlined'
								multiline
								rows={4}
								label='About yourself'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.description}
								name='description'
								error={!!touched.description && !!errors.description}
								helperText={touched.description && errors.description}
								sx={{ gridColumn: 'span 2' }}
							/>
						</Box>
						<Box display='flex' justifyContent='end' mt='20px'>
							<Button type='submit' color='secondary' variant='contained'>
								Submit
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const checkoutSchema = yup.object().shape({
	title: yup.string().required('required'),
	description: yup.string().required('required'),
});

export default AboutForm;
