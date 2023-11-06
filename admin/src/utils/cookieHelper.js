import { Cookies, useCookies } from 'react-cookie';

const setCookie = (key, value, expireTime) => {
	const cookies = new Cookies();
	if (expireTime) {
		cookies.set(key, value, { maxAge: expireTime });
	} else cookies.set(key, value);
};

const getCookie = (key) => {
	const cookies = new Cookies();
	const res = cookies.get(key);
	return res || null;
};

const deleteAllCookies = () => {
	return new Promise((resolve, reject) => {
		let cookies = new Cookies();
		cookies.remove('token');
		cookies.remove('userId');

		resolve(true);
	});
};

export { setCookie, getCookie, deleteAllCookies };
