import axios from 'axios';
import { message } from 'antd';
import { getCookie } from '../../utils/cookieHelper';
import { axiosInstance } from '../../utils/axiosHelper';

const userId = getCookie('userId');

export const addAbout = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.post(`about/addAboutDetail`, {
			...reqObj,
			userId,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const addProject = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	const userId = getCookie('userId');
	try {
		const response = await axios.post(`project/addProject`, {
			...reqObj,
			userId,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const addExperience = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	const userId = getCookie('userId');
	try {
		const response = await axios.post(`experience/addExperience`, {
			...reqObj,
			userId,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const addSkill = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	const userId = getCookie('userId');
	try {
		const response = await axios.post(`skill/addSkill`, {
			...reqObj,
			userId,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
