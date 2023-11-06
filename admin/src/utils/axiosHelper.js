import axios from 'axios';

const { getCookie } = require('./cookieHelper');

const token = getCookie('token');

const axiosInstance = axios?.create({
	baseURL: process.env.REACT_APP_SERVER_URL, // Replace with the base URL of your API
	timeout: 30000,
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json', // You can set other headers as needed
	},
});

export { axiosInstance };
