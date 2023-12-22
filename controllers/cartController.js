const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

module.exports.addToCart = async (data) => {
	if(!data.isAdmin){
		cart = await Cart.findOne({userId : data.userId});
		if(cart === null){
			newCart = new Cart({
				userId : data.userId,
				totalAmount : 0
			});
			const product = await Product.findById(data.productId);
			if(!product){
				return false;
			};
			if(product.isActive){
				subTotal = (product.price) * (data.quantity);
					newCart.products.push({
						productId : data.productId,
						quantity : data.quantity,
						subTotal : subTotal
				});
				newCart.totalAmount = subTotal;
				return newCart.save().then((result,error) => {
					if(error){
						return false;
					} else {
						return "Product added to cart";
					}
				})
			} else {
				return "Sorry, The Product you are looking for is out of stock.";
			};

		} else {
			const product = await Product.findById(data.productId);
			if(!product){
				return false;
			}
			if(product.isActive){
				const cartItem = await Cart.findOne({"products.productId":data.productId});
				if(cartItem!==null){
					const existingProduct = cart.products.find((item) => item.productId === data.productId);
					existingProduct.subTotal += (product.price) * (data.quantity);
					existingProduct.quantity += data.quantity;
					cart.totalAmount += (product.price) * (data.quantity);
					return cart.save().then((result,error) => {
						if(error){
							return false;
						} else {
							return "This Product already exists in your cart,We increased the quantity."
						}
					});

				} else{
					subTotal = (product.price) * (data.quantity);
					cart.products.push({
						productId : data.productId,
						quantity : data.quantity,
						subTotal : subTotal
					});
					cart.totalAmount+=subTotal;	
					return cart.save().then((result,error) => {
						if(error){
							return false;
						} else {
							return "Product added to cart."
						}
					});
				}
			} else {
				return "Sorry, The Product you are looking for is out of stock.";
			}
		}
		let message = Promise.resolve("Admin cannot add products to user's cart!");
		return message.then((value) => {
			return value;
		});
	}
};

module.exports.getUserCart = (data) => {
	if(!data.isAdmin){
		return Cart.findOne({userId : data.userId}).then(result => {
			return result
		});
	};
	let message = Promise.resolve("Admin cannot access user's cart.")
	return message.then((value) => {
		return value
	});
};


module.exports.changeProductQuantity = async (data) => {
	if(!data.isAdmin){
		cart = await Cart.findOne({ userId: data.userId });
		if(!cart){   
			return "You currently don't have any products in your cart";
		}
		const existingProduct = cart.products.find((item) => item.productId === data.productId);
		if(!existingProduct){
			return "You don't have this product in your cart.";
		}
		const product = await Product.findById(data.productId);
		oldSubTotal = existingProduct.subTotal;
		existingProduct.subTotal = (product.price) * (data.quantity);
		existingProduct.quantity = data.quantity;
		cart.totalAmount = cart.totalAmount - oldSubTotal + existingProduct.subTotal;

		return cart.save().then((result, error) => {
			if(error){
				return false;
			} else {
				return "Product quantity changed";
			}
		});
	}
	let message = Promise.resolve("Admin cannot change product quantity in user's cart.")
	return message.then((value) => {
		return value
	});
};

module.exports.removeProductFromCart = async (data) => {
	if(!data.isAdmin){
		cart = await Cart.findOne({userId : data.userId});
		if(!cart){
			return "You currently don't have any products in your cart";
		}
		const index = cart.products.findIndex((item) => item.productId === data.productId);
		if(index === -1){
			return "You don't have this product in your cart."
		}
		cart.totalAmount -= cart.products[index].subTotal;
		cart.products.splice(index,1);
		return cart.save().then((result,error) => {
			if(error){
				return false;
			} else {
				return "Product removed from your cart."
			};
		});
	};
	let message = Promise.resolve("Admin cannot remove products in user's cart.")
	return message.then((value) => {
		return value
	});
};