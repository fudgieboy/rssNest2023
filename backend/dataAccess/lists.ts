// import utils from"../utils/misc";
import {Schema, model} from "mongoose";
import uniqid from "uniqid";
import {FolderInterface, SubscriptionInterface} from "../../shared/types";
interface FolderList {
	memberID: string;
	listID: string;
	creationDate: string;
	list: Array<FolderInterface>;
  }

const ListSchema = new Schema<FolderList>({
	name: { type: String, required: true },
	memberID: { type: String, required: true },
	creationDate: { type: String, required: true },
	list: { type: Array, required: true }
});

const ListModel = model("list", ListSchema);

const ListData = {
	getListbyUserId : function(memberID, callback){
		ListModel.findOne({ memberID: memberID}, callback);
	}, 

	createList : function(memberID, inputData, callback){
		ListModel.findOneAndUpdate( { memberID : memberID }, inputData, { upsert : true }, callback );
		// List.updateOne( { memberID : memberID }, listData, { upsert : true }, callback );
	},
	
	updateList : function(memberID, inputData, callback){
		ListModel.findOneAndUpdate( { memberID : memberID }, inputData, { upsert : true }, callback );
		// List.updateOne( { memberID : memberID }, listData, { upsert : true }, callback );
	}
};


export {ListData};