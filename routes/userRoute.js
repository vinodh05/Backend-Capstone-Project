const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController");
const auth = require("../auth");

router.post("/register",(req,res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));	
});

router.post("/login",(req,res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

router.post("/checkout",auth.verify,(req,res) => {
	let data = {
		isAdmin : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id,
		orderDetails : req.body
	};
	orderController.createOrder(data).then(resultFromController => res.send(resultFromController));
});


router.get("/user-details/:userId",auth.verify,(req,res) => {
	userController.getUserDetails(req.params).then(resultFromController => res.send(resultFromController));
});

// Stretch Goals

router.patch("/set-admin/:userId",auth.verify,(req,res) => {
	let data = auth.decode(req.headers.authorization);
	userController.setAdmin(data,req.params).then(resultFromController => res.send(resultFromController));
});

router.get("/get-all-orders",auth.verify,(req,res) => {
	let isAdmin = auth.decode(req.headers.authorization).isAdmin;
	orderController.getAllOrders(isAdmin).then(resultFromController => res.send(resultFromController));
});

router.get("/myOrders",auth.verify,(req,res) => {
	let data = {
		isAdmin : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id
	};
	orderController.getMyOrders(data).then(resultFromController => res.send(resultFromController));
});

// Cart

router.post("/addToCart",auth.verify,(req,res) => {
	let data = {
		isAdmin : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id,
		productId : req.body.productId,
		quantity : req.body.quantity
	}
	cartController.addToCart(data).then(resultFromController => res.send(resultFromController));
});


router.get("/getUserCart",auth.verify,(req,res) => {
	let data = {
		isAdmin : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id
	}
	cartController.getUserCart(data).then(resultFromController => res.send(resultFromController));
});


router.put("/change-product-quantity",auth.verify,(req,res) => {
	let data = {
		isAdmin  : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id,
		productId : req.body.productId,
		quantity : req.body.quantity
	}
	cartController.changeProductQuantity(data).then(resultFromController => res.send(resultFromController));
});

router.put("/removeProduct-fromCart",auth.verify,(req,res) => {
	let data = {
		isAdmin : auth.decode(req.headers.authorization).isAdmin,
		userId : auth.decode(req.headers.authorization).id,
		productId : req.body.productId
	}
	cartController.removeProductFromCart(data).then(resultFromController => res.send(resultFromController));
});

module.exports = router;