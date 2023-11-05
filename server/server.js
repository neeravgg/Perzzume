const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;

// database
const connectDB = require('./Db/db');

//  routers
const authRouter = require('./Routes/authRoutes');
const aboutRoutes = require('./Routes/aboutRoutes');
const contactRouter = require('./Routes/contactRoutes');
const experienceRouter = require('./Routes/experienceRoutes');
const projectRouter = require('./Routes/projectRoutes');
const skillRoutes = require('./Routes/skillRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/about', aboutRoutes);
app.use('/contact', contactRouter);
app.use('/experience', experienceRouter);
app.use('/project', projectRouter);
app.use('/skill', skillRoutes);
app.use('/upload', uploadRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// app.listen(port, () => {
// 	console.log(`Server is running at port: ${port} `);
// });

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, (err) => {
			if (err) throw err;
		});
	} catch (err) {
		console.log(err);
	}
};

start();
