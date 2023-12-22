const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");


module.exports.createOrder = async (data) => {
	if(!data.isAdmin){
		const products = data.orderDetails;
		let price =0;
		let activeProducts=[];
		for(let p of products){
			const product = await Product.findById(p.productId);
			if(!product){
				return "False";
			} else{
				if(product.isActive){
					price += (product.price) *(p.quantity);
					activeProducts.push(p);
				} else{
					return `${p.productId} is currrently out of stock. Remove this product from cart to proceed further`
				};
			};			
		};

		let newOrder = new Order({
			userId : data.userId,
			products : activeProducts,
			totalAmount : price
		});

		return newOrder.save().then((order,error) => {
			if(error){
				return "Order failed";
			} else {
				return "Order Placed!";
			};
		});
	};
	let message = Promise.resolve("Admin cannot create User's Order.");
	return message.then((value) => {
		return value;
	});

};

module.exports.getAllOrders = (isAdmin) => {
	if(isAdmin){
		return Order.find({}).then(result => {
			return result;
		});
	};
	let message = Promise.resolve("Only Admin can access this feature!");
	return message.then((value) => {
		return value;
	});
};

module.exports.getMyOrders = (data) => {
	if(!data.isAdmin){
		return Order.find({userId : data.userId}).then(result => {
			return result;
		});
	};
	let message = Promise.resolve("Admin cannot retrieve user's orders!");
	return message.then((value) => {
		return value;
	});
};


