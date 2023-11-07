import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill } from '../../redux/actions/addingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSkill } from '../../redux/actions/updateActions';
import { objectToFormData } from '../../utils/methodHelpers';
import { getExperience } from '../../redux/actions/getActions';

const SkillForm = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const { skillData } = useSelector((state) => state.skillReducer);

	const singleData =
		location.pathname.includes('update') &&
		skillData?.find((item) => item?._id == location?.state?.itemId);

	const initialValues = location.pathname.includes('update')
		? {
				title: singleData?.title,
		  }
		: { title: '' };

	const handleFormSubmit = (values) => {
		const formValues = objectToFormData(values);

		if (location.pathname.includes('update')) {
			formValues.append('id', location?.state?.itemId);
			dispatch(updateSkill(formValues));
		} else {
			dispatch(addSkill(formValues));
		}

		navigate(-1);
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<Box m='20px'>
			<Header title='Skill Form' />

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
});

export default SkillForm;
