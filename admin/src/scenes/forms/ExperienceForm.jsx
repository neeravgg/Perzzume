import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience } from '../../redux/actions/addingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateExperience } from '../../redux/actions/updateActions';
import { objectToFormData } from '../../utils/methodHelpers';

const ExperienceForm = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const { experienceData } = useSelector((state) => state.experienceReducer);
	const singleData =
		location.pathname.includes('update') &&
		experienceData?.find((item) => item?._id == location?.state?.itemId);
	const initialValues = location.pathname.includes('update')
		? {
				comapny: singleData?.comapny,
				description: singleData?.description,
				job_title: singleData?.job_title,
		  }
		: { comapny: '', description: '', job_title: '' };

	const handleFormSubmit = (values) => {
		const formValues = objectToFormData(values);

		if (location.pathname.includes('update')) {
			formValues.append('id', location?.state?.itemId);
			dispatch(updateExperience(formValues));
		} else {
			dispatch(addExperience(formValues));
		}

		navigate(-1);
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<Box m='20px'>
			<Header title='Experience Form' />

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
								label='company'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.comapny}
								name='comapny'
								error={!!touched.comapny && !!errors.comapny}
								helperText={touched.comapny && errors.comapny}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant='outlined'
								multiline
								label='job title'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.job_title}
								name='job_title'
								error={!!touched.job_title && !!errors.job_title}
								helperText={touched.job_title && errors.job_title}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant='outlined'
								multiline
								rows={4}
								label='About job'
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
	comapny: yup.string().required('required'),
	description: yup.string().required('required'),
	job_title: yup.string().required('required'),
});

export default ExperienceForm;
