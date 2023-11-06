import { message } from 'antd';
import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL;

export const addContact = (reqObj) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response = await axios.post(`${url}contact/sendContact`, reqObj);
		message.success(response?.data?.message);
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		console.log(error);
		dispatch({ type: 'LOADING', payload: false });
		message.error(error?.message);
	}
};
