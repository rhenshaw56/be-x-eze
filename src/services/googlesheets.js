import { google } from 'googleapis';
import path from 'path';


export default class GoogleSheetService {
  constructor() {
    const keyFile = path.resolve(`${__dirname}/${process.env.GOOGLE_KEYS_FILE}`);
    const scopes = process.env.GOOGLE_SHEET_SCOPES;
    this.auth = new google.auth.GoogleAuth({
      keyFile,
      scopes
    });
    this.spreadsheetId = process.env.SHEET_ID;
  }

  async getSheetData() {
    const authInstance = await this.auth.getClient();
    const googleSheetsInstance = google.sheets({ version: 'v4', auth: authInstance });
    const data = await googleSheetsInstance.spreadsheets.values.batchGet({
      auth: authInstance,
      spreadsheetId: this.spreadsheetId,
      ranges: [
        [
          'IPHONES!A1:J2',
          'IPHONES!A3:J7',
          'IPHONES!A8:J12',
          'IPHONES!A13:J17',
          'IPHONES!A18:J21',
          'IPHONES!A22:J25',
          'IPHONES!A26:J29',
          'IPHONES!A30:J34',
          'IPHONES!A35:J39',
          'IPHONES!A40:J45',
          'IPHONES!A46:J51',
          'IPHONES!A52:J56',
          'IPHONES!A57:J61',
          'IPHONES!A62:J66',
        ],
        [
          'IPHONES!L1:T2',
          'IPHONES!L3:U7',
          'IPHONES!L8:U12',
          'IPHONES!L13:U17',
          'IPHONES!L18:U21',
          'IPHONES!L22:U25',
          'IPHONES!L26:U29',
          'IPHONES!L30:U34',
          'IPHONES!L35:U39',
          'IPHONES!L40:U45',
          'IPHONES!L46:U51',
          'IPHONES!L52:U56',
          'IPHONES!L57:U61',
          'IPHONES!L62:U66',
        ]
      ],
      majorDimension: 'ROWS'
    });


    return data;
  }
}
