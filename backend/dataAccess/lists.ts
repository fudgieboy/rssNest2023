const mongoose = require("mongoose");
var uniqid = require("uniqid");
import utils = require("../utils/misc");

const ListSchema = mongoose.Schema({
	memberID: {
		type: String,
		index: true
	},
	listID: {
		type: String,
		index: false
	},
	creationDate: {
		type: Number,
		index: false
	},
	list: {
		type: Array,
		index: false
	}
});

var ListData = mongoose.model("List", ListSchema);

ListData.getListbyUserId = function(memberID, callback){
	utils.l(memberID);
	ListData.findOne({ memberID: memberID}, callback);
};

ListData.updateList = function(memberID, inputData, callback){
	inputData.listID = uniqid();
	ListData.findOneAndUpdate( { memberID : memberID }, inputData, { upsert : true }, callback );
	// List.updateOne( { memberID : memberID }, listData, { upsert : true }, callback );
};


export = ListData;