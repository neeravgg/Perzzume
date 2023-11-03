const express = require('express');
const app = express();
const cors = require('cors');

//  routers
const authRouter = require('./routes/authRoutes');

require('dotenv').config();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/auth', authRouter);
app.use('/auth', authRouter);
app.use('/auth', authRouter);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
app.listen(port, () => {
	console.log(`Server is running at port: ${port} `);
});
