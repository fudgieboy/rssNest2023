import bcrypt from "bcryptjs";
import uniqid from "uniqid";
import {Schema, model} from "mongoose";
interface User {
	memberID: string;
	username: string;
	registerDate: number;
	lastLoginDate: number;
	password: string;
	email: string;
	refreshToken: string;
    accessToken: string;
  }
  
  // Schema
  const UserSchema = new Schema<User>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	avatar: String
  });


const UserModel = model("User", UserSchema);

const UserData = {
	comparePassword : function(candidatePassword, hash, callback){
		bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
			callback(err, isMatch);
		});
	},

	registerUser : function(newUser, callback){
		const user = new UserModel(newUser);
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				user.password = hash;
				user.memberID = uniqid();
				user.registerDate = new Date().getTime();
				user.save();
				callback(null, user);
			});
		});
	},

	checkExistingUser : function(email, username, callback){
		console.log(email);
		console.log(username);
		UserModel.findOne({$or: [
			{email: email},
			{username: username}
		]}, callback);
	},

	getUserByEmail : function(email, callback){
		// console.log(validator.isEmail(email));
		UserModel.findOne({email: email}, callback);
	},

	getUserByUsername : function(username, callback){
		UserModel.findOne({username: username}, callback);
	}
};

export {UserData};
