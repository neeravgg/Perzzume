import { message } from 'antd';
import { axiosInstance } from '../../utils/axiosHelper';

export const updateAbout = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`about/updateAboutDetail`, reqObj);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};

export const updateExperience = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(
			`experience/updateExperience`,
			reqObj
		);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const updateSkill = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`project/updateProject`, reqObj);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const updateProject = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`skill/updateSkill`, reqObj);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
