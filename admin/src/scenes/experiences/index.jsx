import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExperience } from '../../redux/actions/getActions';
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

const Experience = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { experienceData } = useSelector((state) => state.experienceReducer);
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
		if (!experienceData?.length) dispatch(getExperience());
	}, [experienceData]);

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
				<form onSubmit={handleSubmit}>
					<Box display='flex' justifyContent='end' my='30px'>
						<Button type='submit' color='secondary' variant='contained'>
							Add Experience
						</Button>
					</Box>
				</form>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: 'lightblue', color: 'white' }}>
								<TableCell>comapny</TableCell>
								<TableCell>job title</TableCell>
								<TableCell>description</TableCell>
								<TableCell>update</TableCell>
								<TableCell>delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{experienceData?.map((item) => (
								<TableRow>
									<TableCell>{item?.comapny}</TableCell>
									<TableCell>{item?.job_title}</TableCell>
									<TableCell>{item?.description}</TableCell>
									<TableCell width={'10%'}>
										<Button
											color='secondary'
											variant='contained'
											onClick={(e) => editNavigate(e, item?._id)}
										>
											Edit
										</Button>
									</TableCell>
									<TableCell width={'10%'}>
										<Button
											color='secondary'
											variant='contained'
											onClick={(e) => handleDelete(e, item?._id)}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default Experience;
