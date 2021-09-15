import GoogleSheetService from '../../services/googlesheets';
import { formatData } from '../../utils';
import AppController from '../../controllers';

export default class ApiHandler {
  constructor() {
    this.googleSheetService = new GoogleSheetService();
  }
  static async search(req, res, next) {
    res.json({});
  }

  static * populate(_req, res, _next) {
    const googleSheetService = new GoogleSheetService();
    const sheet = yield googleSheetService.getSheetData();

    const formattedData = formatData(sheet.data.valueRanges);

    res.status(202).send({});

    yield AppController.populate(
      formattedData
    )
  }
}
