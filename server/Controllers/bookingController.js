const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../Models/bookingModel');
const Car = require('../Models/carModel');

const bookCar = async (req, res) => {
	const { token } = req.body;
	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		const payment = await stripe.paymentIntent.create(
			{
				amount: req.body.totalAmount * 100,
				currency: 'INR',
				customer: customer.id,
				receipt_email: token.email,
				description: 'Software development services',
			},
			{
				idempotencyKey: uuidv4(),
			}
		);

		if (payment) {
			console.log('problem2');

			req.body.transactionId = payment.source.id;
			const newbooking = new Booking(req.body);
			await newbooking.save();
			const car = await Car.findOne({ _id: req.body.car });
			console.log(req.body.car);
			car.bookedTimeSlots.push(req.body.bookedTimeSlots);

			await car.save();
			res.send('Your booking is successfull');
		} else {
			return res.status(400).json(error);
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};
const getAllBookings = async (req, res) => {
	try {
		const bookings = await Booking.find().populate('car').populate('user');
		res.send(bookings);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { bookCar, getAllBookings };
