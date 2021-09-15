import models from '../models';
export default class AppController {
 static * populate(sheetData) {

  try {
    yield models.BuyRequest.insertMany(
      sheetData.filter((data) => data.type === "Buy Request")
     );

     yield models.SellRequest.insertMany(
      sheetData.filter((data) => data.type === "Sell Requests")
     );

  } catch (e) {
    console.log(e.stack);
  }
 }
};
