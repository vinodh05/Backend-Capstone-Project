const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId : {
		type : String,
		required : [true, "UserId is required."]
	},
	products : [
		{
			productId : {
				type : String,
				required : [true, " productId is required."]
			},
			quantity : {
				type : Number,
				required : [true, "quantity is required."]
			},
			subTotal : {
				type : Number,
				required : [true,"subTotal is required."]
			}
		}
	],
	totalAmount : {
		type : Number,
		required : [true, "totalAmount is required."]
	}
});

module.exports = mongoose.model("Cart",cartSchema);