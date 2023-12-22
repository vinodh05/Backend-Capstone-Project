const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");

router.post("/create-product",auth.verify,(req,res) => {
	const data = {
		product : req.body,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	};
	productController.createProduct(data).then(resultFromController => res.send(resultFromController));
});

router.get("/get-all",(req,res) => {
	productController.getAllProducts().then(resultFromController => res.send(resultFromController));
});

router.get("/active-products",(req,res) => {
	productController.getActiveProducts().then(resultFromController => res.send(resultFromController));
});

router.get("/get-product/:productId",(req,res) => {
	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController));
});

router.put("/update-product/:productId",auth.verify,(req,res) => {
	const data = {
		product : req.body,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	}
	productController.updateProduct(req.params,data).then(resultFromController => res.send(resultFromController));
});

router.patch("/archive-product/:productId",auth.verify,(req,res) => {
	let isAdmin = auth.decode(req.headers.authorization).isAdmin;
	productController.archiveProduct(req.params,isAdmin).then(resultFromController => res.send(resultFromController));
});

router.patch("/activate-product/:productId",auth.verify,(req,res) => {
	let isAdmin = auth.decode(req.headers.authorization).isAdmin;
	productController.activateProduct(req.params,isAdmin).then(resultFromController => res.send(resultFromController));
});

module.exports = router;
