const Product = require("../models/Product");

module.exports.createProduct = (data) => {
	if(data.isAdmin){
		let newProduct = new Product({
			name : data.product.name,
			description : data.product.description,
			price : data.product.price
		});
		return newProduct.save().then((product,error) => {
			if(error){
				return "Product creation failed!"
			} else {
				return "Product Created";
			};
		});
	};
	let message = Promise.resolve("User must be an admin to create a product.");
	return message.then((value) => {
		return value;
	});
};

module.exports.getAllProducts = () => {
	return Product.find({}).then(result => {
		return result;
	});
};

module.exports.getActiveProducts = () => {
	return Product.find({isActive:true}).then(result => {
		return result;
	});
};

module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result;
	});
};

module.exports.updateProduct = (reqParams,data) => {
	if(data.isAdmin){
		let updatedProduct = {
			name : data.product.name,
			description : data.product.description,
			price : data.product.price
		};
		return Product.findByIdAndUpdate(reqParams.productId,updatedProduct).then((product,error) => {
			if(error){
				return "Update of Product information failed";
			} else {
				return "Product information updated";
			};
		});
	};
	let message = Promise.resolve("User must be an admin to update a product.");
	return message.then((value) => {
		return value;
	});
	
};

module.exports.archiveProduct = (reqParams,isAdmin) => {
	if(isAdmin){
		let updatedActiveField = {
			isActive : false
		}
		return Product.findByIdAndUpdate(reqParams.productId,updatedActiveField).then((product,error) => {
			if(error){
				return "Archive Product failed!";
			} else {
				return "Archive Product Successful!"
			};
		});
	};
	let message = Promise.resolve("User must be an admin to archive a product.");
	return message.then((value) => {
		return value;
	});
};

module.exports.activateProduct = (reqParams,isAdmin) => {
	if(isAdmin){
		let updatedActiveField = {
			isActive : true
		};
		return Product.findByIdAndUpdate(reqParams.productId,updatedActiveField).then((product,error) => {
			if(error){
				return "Activate Product failed!";
			} else {
				return "Product Activated!";
			};
		});
	};
	let message = Promise.resolve("User must be an admin to activate a product.");
	return message.then((value) => {
		return value;
	});
};

