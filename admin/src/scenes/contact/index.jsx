import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../redux/actions/getActions';
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
import { deleteExperience } from '../../redux/actions/deleteActions';

const Contact = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { contactData } = useSelector((state) => state.contactReducer);
	const colors = tokens(theme.palette.mode);

	const editNavigate = (e, id) => {
		navigate('/update-experience-form', {
			state: {
				itemId: id,
			},
		});
	};
	const handleDelete = (e, id) => {
		dispatch(deleteExperience({ id }));
	};

	const handleSubmit = () => {
		navigate('/experience-form');
	};

	useEffect(() => {
		if (!contactData?.length) dispatch(getContact());
	}, [contactData]);

	return (
		<Box m='20px'>
			<Header title='Experience' />
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
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: 'lightblue', color: 'white' }}>
								<TableCell>name</TableCell>
								<TableCell>email</TableCell>
								<TableCell >message</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{contactData?.map((item) => (
								<TableRow>
									<TableCell width={'20%'}>{item?.name}</TableCell>
									<TableCell>{item?.email}</TableCell>
									<TableCell width={'40%'}>{item?.message}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default Contact;
