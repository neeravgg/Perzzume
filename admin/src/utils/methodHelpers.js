import { getCookie } from './cookieHelper';

const userId = getCookie('userId');

const isEmptyObject = (obj) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
};
function objectToFormData(obj) {
	const formData = new FormData();

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			formData.append(key, obj[key]);
		}
	}
	formData.append('user', userId);

	return formData;
}
export { isEmptyObject, objectToFormData };
