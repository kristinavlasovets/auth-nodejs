const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://qwerty:qwerty123@cluster0.nkhtenn.mongodb.net/reg-auth?retryWrites=true&w=majority`
		);
		app.listen(PORT, () => console.log(`server started on post ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
