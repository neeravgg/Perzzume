import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme.js';
import Header from '../../components/Header.jsx';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../redux/actions/getActions.js';
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
import { deleteProject } from '../../redux/actions/deleteActions.js';
import ConfirmMessage from '../../utils/confirmMessage.js';

const Project = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { projectData } = useSelector((state) => state.projectReducer);
	const colors = tokens(theme.palette.mode);

	const editNavigate = (e, id) => {
		navigate('/update-project-form', {
			state: {
				itemId: id,
			},
		});
	};
	const handleDelete = async (e, id) => {
		e.preventDefault();
		const confirm = await ConfirmMessage(
			'You want to permanently delete this item?'
		);
		if (confirm?.isConfirmed) dispatch(deleteProject({ id }));
	};

	const handleSubmit = () => {
		navigate('/project-form');
	};

	useEffect(() => {
		dispatch(getProject());
	}, []);

	return (
		<Box m='20px'>
			<Header title='Project' />
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
							Add Project
						</Button>
					</Box>
				</form>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: 'lightblue', color: 'white' }}>
								<TableCell>Title</TableCell>
								<TableCell>description</TableCell>
								<TableCell>code link</TableCell>
								<TableCell>demo link</TableCell>
								<TableCell>update</TableCell>
								<TableCell>delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{projectData?.map((item) => (
								<TableRow>
									<TableCell>{item?.title}</TableCell>
									<TableCell>{item?.description}</TableCell>
									<TableCell>{item?.code_link}</TableCell>
									<TableCell>{item?.demo_link}</TableCell>
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

export default Project;
