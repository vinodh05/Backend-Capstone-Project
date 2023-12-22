const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = (reqBody) => {
	return User.findOne({email:reqBody.email}).then(result => {
		if(result !== null){
			return "User already exists";
		} else {

			if((reqBody.password).length<6){
				return "Password should be of minimum 6 characters"
			} else{
				let newUser = new User({
					email : reqBody.email,
					password : bcrypt.hashSync(reqBody.password,10)
				});

				return newUser.save().then((user,error) => {
					if(error){
						return "User registration failed!";
					} else {
						return "User Registered!";
					};
				});
			};
		};
	});
};

module.exports.loginUser = (reqBody) => {
	return User.findOne({email:reqBody.email}).then(result => {
		if(result === null){
			return "User doesn't exist with the given email.";
		}else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password,result.password);
			if(isPasswordCorrect){
				console.log("Login Successful");
				return {access : auth.createAccessToken(result)};
			} else {
				return "Password didn't match";
			}
		};
	});
};

module.exports.getUserDetails = (reqParams) => {
	return User.findById(reqParams.userId).then(result => {
		result.password = "";
		return result;
	})
}

module.exports.setAdmin = (data,reqParams) => {
	if(data.isAdmin){
		let newAdmin = {
			isAdmin : true
		};
		return User.findByIdAndUpdate(reqParams.userId,newAdmin).then((user,error) => {
			if(error){
				return "Unable to set the user as Admin";
			} else {
				return "This User was now Admin";
			};
		});
	};

	let message = Promise.resolve("Set As Admin feature is accessible to Admin Only!");
	return message.then((value) => {
		return value;
	});
};

