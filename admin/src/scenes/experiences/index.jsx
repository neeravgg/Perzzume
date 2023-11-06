import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../../redux/actions/getActions';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Button,
	TableHead,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isEmptyObject } from '../../utils/methodHelpers';

const Experience = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { aboutData } = useSelector((state) => state.aboutReducer);
	const colors = tokens(theme.palette.mode);

	const ediNavigate = () => {
		navigate('/update-about-form');
	};
	const handleSubmit = () => {
		navigate('/about-form');
	};

	useEffect(() => {
		if (isEmptyObject(aboutData)) dispatch(getAbout());
	}, [aboutData]);

	return (
		<Box m='20px'>
			<Header title='About' />
			<Box
				m='40px 0 0 0'
				height='75vh'
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300],
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`,
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				{aboutData ? (
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow style={{ backgroundColor: 'lightblue', color: 'white' }}>
									<TableCell>Title</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>{aboutData?.title}</TableCell>
									<TableCell>{aboutData?.description}</TableCell>
									<TableCell width={'20%'}>
										<Button color='secondary' variant='contained' onClick={ediNavigate}>
											Edit About
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<form onSubmit={handleSubmit}>
						<Box display='flex' justifyContent='center' mt='30px'>
							<Button type='submit' color='secondary' variant='contained'>
								Add about
							</Button>
						</Box>
					</form>
				)}
			</Box>
		</Box>
	);
};

export default Experience;
