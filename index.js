const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute")

const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.04msq00.mongodb.net/capstone2",
		{
			useNewUrlParser : true,
			useUnifiedTopology : true
		}
	);

mongoose.connection.once("open", () => console.log("Now connected to the cloud."));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`)
});

app.use("/users",userRoutes);
app.use("/products",productRoutes);