import bcrypt from "bcryptjs";
import uniqid from "uniqid";
import {Schema, model} from "mongoose";
interface User {
	name: string;
	memberID: string;
	registerDate: string;
	// username: string;
	// lastLoginDate: string;
	password: string;
	// email: string;
	// refreshToken: string;
    // accessToken: string;
  }
  
  // Schema
  const UserSchema = new Schema<User>({
	name: { type: String, required: true },
	memberID: { type: String, required: true },
	registerDate: { type: String, required: true },

	// username: { type: String, required: true },
	// lastLoginDate: { type: String, required: true },
	password: { type: String, required: true },
	// email: { type: String, required: true },
	// refreshToken: { type: String, required: true },
	// accessToken: { type: String, required: true },
  });


const UserModel = model("users", UserSchema);

const UserData = {
	comparePassword : function(candidatePassword, hash, callback?){
		bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
			callback(err, isMatch);
		});
	},

	registerUser : function(newUser, callback){

		newUser.username = "test";
		newUser.password = "password";
		
		const user = new UserModel(newUser);
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				user.password = hash;
				user.username = newUser.username;
				user.memberID = uniqid();
				user.registerDate = new Date().getTime();
				user.save();
				callback(null, user);
			});
		});
	},

	checkExistingUser : function(email, username, callback){
		UserModel.findOne({$or: [
			{email: email},
			{username: username}
		]}, callback);
	},

	getUserByEmail : function(email, callback){
		UserModel.findOne({email: email}, callback);
	},

	getUserByUsername : function(username, callback){
		UserModel.findOne({username: username}, callback);
	}
};

export {UserData};
