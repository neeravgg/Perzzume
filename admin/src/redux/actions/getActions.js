import axios from 'axios';
import { message } from 'antd';
import { getCookie, setCookie } from '../../utils/cookieHelper';
import { axiosInstance } from '../../utils/axiosHelper';
const userId = getCookie('userId');

export const userLogin = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axiosInstance.post(`auth/admin/login`, reqObj);
		const { accessToken, userId } = response?.data?.data;
		setCookie('token', accessToken);
		setCookie('userId', userId);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
		setTimeout(() => {
			window.location.href = '/';
		}, 500);
	} catch (error) {
		console.log(error);
		message.error('Something went wrong');
		dispatch({ type: 'LOADING', payload: false });
	}
};

export const userRegister = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	console.log('values');

	try {
		await axiosInstance.post(`users/register`, reqObj);
		message.success('Registration successfull');
		setTimeout(() => {
			window.location.href = '/login';
		}, 500);

		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		message.error('Something went wrong');
		dispatch({ type: 'LOADING', payload: false });
	}
};
export const getAbout = () => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });

	try {
		const response = await axiosInstance.post(`about/getAboutDetail`,{
			userId,
		});
		message.success(response?.data?.message);
		dispatch({ type: 'ABOUT_DATA', payload: response?.data?.data });
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
