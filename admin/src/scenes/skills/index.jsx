import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSkill } from '../../redux/actions/getActions';
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
import { deleteSkill } from '../../redux/actions/deleteActions';
import ConfirmMessage from '../../utils/confirmMessage';

const Skills = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { skillData } = useSelector((state) => state.skillReducer);
	const colors = tokens(theme.palette.mode);

	const editNavigate = (e, id) => {
		navigate('/update-skill-form', {
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
		if (confirm?.isConfirmed) dispatch(deleteSkill({ id }));
	};

	const handleSubmit = () => {
		navigate('/skill-form');
	};

	useEffect(() => {
		if (!skillData?.length) dispatch(getSkill());
	}, [skillData]);

	return (
		<Box m='20px'>
			<Header title='Skill' />
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
							Add Skill
						</Button>
					</Box>
				</form>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: 'lightblue', color: 'white' }}>
								<TableCell>title</TableCell>
								{/* <TableCell>shadow color</TableCell> */}
								<TableCell>update</TableCell>
								<TableCell>delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{skillData?.map((item) => (
								<TableRow>
									<TableCell>{item?.title}</TableCell>
									{/* <TableCell>{item?.shadow_color}</TableCell> */}
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

export default Skills;
