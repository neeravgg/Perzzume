import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../redux/actions/addingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProject } from '../../redux/actions/updateActions';
import { objectToFormData } from '../../utils/methodHelpers';

const ProjectForm = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const { projectData } = useSelector((state) => state.projectReducer);

	const singleData =
		location.pathname.includes('update') &&
		projectData?.find((item) => item?._id == location?.state?.itemId);
	const initialValues = location.pathname.includes('update')
		? {
				title: singleData?.title,
				description: singleData?.description,
				code_link: singleData?.code_link,
				demo_link: singleData?.demo_link,
		  }
		: { title: '', description: '', code_link: '', demo_link: '' };

	const handleFormSubmit = (values) => {
		console.log('working')
		const formValues = objectToFormData(values);

		if (location.pathname.includes('update')) {
			formValues.append('id', location?.state?.itemId);
			dispatch(updateProject(formValues));
		} else {
			dispatch(addProject(formValues));
		}

		navigate(-1);
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<Box m='20px'>
			<Header title='Project Form' />

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
								label='title'
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
								label='code link'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.code_link}
								name='code_link'
								error={!!touched.code_link && !!errors.code_link}
								helperText={touched.code_link && errors.code_link}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant='outlined'
								multiline
								label='demo link'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.demo_link}
								name='demo_link'
								error={!!touched.demo_link && !!errors.demo_link}
								helperText={touched.demo_link && errors.demo_link}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant='outlined'
								multiline
								rows={4}
								label='About project'
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
	code_link: yup.string().required('required'),
	demo_link: yup.string().required('required'),
});

export default ProjectForm;
