const express = require('express');
const app = express();
const cors = require('cors');

//  routers
const authRouter = require('./Routes/authRoutes');
const aboutRoutes = require('./Routes/aboutRoutes');
const contactRouter = require('./Routes/contactRoutes');
const experienceRouter = require('./Routes/experienceRoutes');
const projectRouter = require('./Routes/projectRoutes');
const skillRoutes = require('./Routes/skillRoutes');

require('dotenv').config();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/auth', authRouter);
app.use('/about', aboutRoutes);
app.use('/contact', contactRouter);
app.use('/experience', experienceRouter);
app.use('/project', projectRouter);
app.use('/skill', skillRoutes);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
app.listen(port, () => {
	console.log(`Server is running at port: ${port} `);
});
