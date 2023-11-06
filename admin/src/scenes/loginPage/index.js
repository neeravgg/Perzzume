import React from 'react';
import {
	Card,
	CardContent,
	Container,
	TextField,
	Button,
	CssBaseline,
	Typography,
	Box,
	Link,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/getActions';

const LoginPage = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.alertsReducer);
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const checkoutSchema = yup.object().shape({
		password: yup.string().required('required'),
		email: yup.string().email('invalid email').required('required'),
	});
	const initialValues = {
		password: '',
		email: '',
	};
	const handleFormSubmit = (values) => {
		dispatch(userLogin(values));
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Card
				elevation={3}
				// color='white'
				style={{
					// backgroundColor: 'white',
					display: 'block',
					width: '30vw',
					transitionDuration: '0.3s',
					height: '20vw',
					padding: '20px',
					paddingTop: '20px',
					borderRadius: '8px',
					marginTop: '100px',
				}}
			>
				<CardContent>
					<Formik
						onSubmit={handleFormSubmit}
						initialValues={initialValues}
						validationSchema={checkoutSchema}
					>
						{({
							values,
							errors,
							touched,
							handleBlur,
							handleChange,
							handleSubmit,
						}) => (
							<form onSubmit={handleSubmit}>
								<Box
									display='grid'
									gap='30px'
									sx={{
										'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
									}}
									mt={'20px'}
								>
									<TextField
										fullWidth
										variant='outlined'
										type='text'
										label='Email'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										name='email'
										error={!!touched.firstName && !!errors.firstName}
										helperText={touched.firstName && errors.firstName}
										sx={{ gridColumn: 'span 2' }}
									/>
									<TextField
										fullWidth
										variant='outlined'
										type='text'
										label='Password'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										name='password'
										error={!!touched.lastName && !!errors.lastName}
										helperText={touched.lastName && errors.lastName}
										sx={{ gridColumn: 'span 2' }}
									/>
								</Box>
								<Box display='flex' justifyContent='center' mt='30px'>
									<Button type='submit' color='secondary' variant='contained'>
										Log in
									</Button>
								</Box>
							</form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
