const ContactModel = require('../Models/contactModels');

const saveContactForm = async (req, res) => {
	try {
		const newuser = new ContactModel(req.body);
		await newuser.save();
		res.send('User registered successfully');
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { saveContactForm };
