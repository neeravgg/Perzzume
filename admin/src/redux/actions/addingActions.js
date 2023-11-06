import { message } from 'antd';
import { axiosInstance } from '../../utils/axiosHelper';


export const addAbout = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.post(`about/addAboutDetail`, reqObj);
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
	try {
		const response = await axiosInstance.post(`project/addProject`, reqObj);
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
	try {
		const response = await axiosInstance.post(`experience/addExperience`, reqObj);
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
	try {
		const response = await axiosInstance.post(`skill/addSkill`, reqObj);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
