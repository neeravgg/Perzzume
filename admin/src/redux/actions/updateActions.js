import axios from 'axios';
import { message } from 'antd';
import { axiosInstance } from '../../utils/axiosHelper';
import { getCookie } from '../../utils/cookieHelper';

const userId = getCookie('userId');

export const updateAbout = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axiosInstance.put(`about/updateAboutDetail`, {
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
