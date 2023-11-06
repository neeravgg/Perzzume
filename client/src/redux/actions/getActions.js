import axios from 'axios';
import { message } from 'antd';
const user =  process.env.REACT_APP_USER;
const url = process.env.REACT_APP_SERVER_URL;

export const getAbout = () => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axios.post(`${url}about/getAboutDetail`, {
			user,
		});
		// message.success(response?.data?.message);
		dispatch({ type: 'ABOUT_DATA', payload: response?.data?.data });
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const getExperience = () => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axios.post(`${url}experience/getExperienceList`, {
			user,
		});
		console.log({ response });
		// message.success(response?.data?.message);
		dispatch({ type: 'EXPERIENCE_DATA', payload: response?.data?.data });
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const getProject = () => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axios.post(`${url}project/getProjectList`, {
			user,
		});
		// message.success(response?.data?.message);
		dispatch({ type: 'PROJECT_DATA', payload: response?.data?.data });
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
export const getSkill = () => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axios.post(`${url}skill/getSkillList`, {
			user,
		});
		// message.success(response?.data?.message);
		dispatch({ type: 'SKILL_DATA', payload: response?.data?.data });
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
