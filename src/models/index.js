import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

loadType(mongoose);

const { Schema, model } = mongoose;

const RequestSchema = Schema({
  name: {
		type: String,
		required:true,
  },
	status: {
		type: 'String',
	},
	storageSize: {
		type: String
	},
	grade: {
		type: String,
	},
	price: {
		type: mongoose.Types.Currency,
		required: true,
	},
	displayPrice: {
		type: String,
		required: true,
	},
  type: {
		type: String,
		required: true,
	},
},
{ timestamps: true }
);

RequestSchema.index({ "name": 'text', "storageSize": 'text', "grade": 'text' });

export default {
  BuyRequest: model('buyRequest', RequestSchema),
  SellRequest: model('sellRequest', RequestSchema)
}
