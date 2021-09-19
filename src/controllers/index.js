import models from '../models';

const LIMIT = 20;
export default class AppController {

  static * search(req) {
    const { term, maxPrice, minPrice, limit, page } = req.query;
    const searchTerms = {};
    const filter = {};
    let skip = 0;

    if (req.query.term) {
      searchTerms['$text'] = {
        '$search': req.query.term
      };
    }

    if (maxPrice && minPrice) {
      filter['item.price'] = { '$lte': Number(maxPrice)*100, '$gte': Number(minPrice)*100 };
    }

    if (limit && page) {
      skip = LIMIT * (page - 1);
    }

    const queryPipeline = [{
        '$lookup': {
          'from': 'buyrequests',
          'pipeline': [
            {
              '$match': searchTerms,
            }
          ],
          'as': 'buyRequests'
        }
      }, {
        '$lookup': {
          'from': 'sellrequests',
          'pipeline': [
            {
              '$match': searchTerms,
            }
          ],
          'as': 'sellRequests'
        }
      }, {
        '$limit': 1
      }, {
        '$project': {
          '_id': 0,
          'buyRequests': 1,
          'sellRequests': 1
        }
      }, {
        '$addFields': {
          'item': {
            '$concatArrays': [
              '$buyRequests', '$sellRequests'
            ]
          }
        }
      }, {
        '$project': {
          'item': 1
        }
      }, {
        '$unwind': {
          'path': '$item',
          'preserveNullAndEmptyArrays': false
        }
      },{
        '$match': filter,
      },{
        '$sort': {
          'item.price': 1
        }
      },{
          '$skip': skip
        },{
          '$limit': LIMIT
        }
    ];

    const countPipeline = [{
      '$lookup': {
        'from': 'buyrequests',
        'pipeline': [
          {
            '$match': searchTerms,
          }
        ],
        'as': 'buyRequests'
      }
    }, {
      '$lookup': {
        'from': 'sellrequests',
        'pipeline': [
          {
            '$match': searchTerms,
          }
        ],
        'as': 'sellRequests'
      }
    }, {
      '$limit': 1
    }, {
      '$project': {
        '_id': 0,
        'buyRequests': 1,
        'sellRequests': 1
      }
    }, {
      '$addFields': {
        'item': {
          '$concatArrays': [
            '$buyRequests', '$sellRequests'
          ]
        }
      }
    }, {
      '$project': {
        'item': 1
      }
    }, {
      '$unwind': {
        'path': '$item',
        'preserveNullAndEmptyArrays': false
      }
    },{
      '$match': filter,
    },{
      '$count': 'count'
    }];

    try {
      const products = yield models.BuyRequest.aggregate(
        queryPipeline
      );
      const count = yield models.BuyRequest.aggregate(
        countPipeline
      );

      return {
        products,
        count: count[0].count
      };

    } catch (e) {
      console.log(e.stack);
    }
}

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
