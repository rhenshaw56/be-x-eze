
// we need to dynamically split by request types based on the format we're fetching the data
const groupByRequestType = data => data.reduce(([a, b], currObj) => {
  if (/A/.test(currObj.range)) {
    a.push(currObj);
  } else {
    b.push(currObj);
  }
  return [a, b];

}, [[], []]);

const groupByModel = (list, requestType) => {
  const [type] = requestType[0].values[0];

  const models = requestType.slice(1);
  models.forEach(model => {
    const [name] = model.values[0];
    const [_a, _b, ...conditions] = model.values[1];
    const [status, _data] = model.values[2];
    model.values.splice(0, 2);
    list.push({
      name,
      conditions,
      status,
      type,
      grades: model.values
    });
  });

  return list;
};

const groupByPriceAndGrade = (list, model) => {
  const { conditions, grades, name, status, type} = model;
  grades.forEach((item) => {
    const [_a, storageSize, ...prices] = item;
    prices.forEach((displayPrice, index) => {
      const price = displayPrice;
      list.push({
        price,
        displayPrice,
        grade: conditions[index],
        storageSize,
        name,
        status,
        type
      });
    });
  });
  return list;
};

export const formatData = (data) => groupByRequestType(data)
  .reduce(groupByModel, [])
  .reduce(groupByPriceAndGrade, []);
