import { message } from 'antd';
import { getCookie } from '../../utils/cookieHelper';
import { axiosInstance } from '../../utils/axiosHelper';

const user = getCookie('userId');

export const deleteExperience = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`experience/deleteExperience`, {
			...reqObj,
			user,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const deleteProject = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`project/deleteProject`, {
			...reqObj,
			user,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const deleteSkill = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`skill/deleteSkill`, {
			...reqObj,
			user,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
