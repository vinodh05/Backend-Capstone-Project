const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userId : {
		type : String,
		required:[true,"userId is required."]
	},
	products : [
		{
			productId : {
				type : String,
				required : [true,"productId is required."]
			},
			quantity : {
				type : Number,
				required : [true,"quantity is required."]
			}
		}
	],
	totalAmount : {
		type : Number,
		required : [true,"totalAmount is required."]
	},
	purchasedOn : {
		type : Date,
		default : new Date()
	}
});

module.exports = mongoose.model("Order",orderSchema);