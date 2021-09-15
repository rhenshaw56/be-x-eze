import { Schema, model } from 'mongoose';

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

RequestSchema.index({ '$**': 'text' });

export default {
  BuyRequest: model('buyRequest', RequestSchema),
  SellRequest: model('sellRequest', RequestSchema)
}
