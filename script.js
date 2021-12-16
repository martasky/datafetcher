import { endpoint, headers } from "./settings.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  let urlBar = "https://foo-bar-project.herokuapp.com/";

  fetch(urlBar)
    .then((response) => response.json())
    .then((jsonData) => {
      prepareData(jsonData);
    });
}

function prepareData(jsonData) {
  let timestamp = jsonData.timestamp;
  let queue = jsonData.queue.length;
  let orders = [];

  jsonData.serving.forEach((e) => {
    orders.push(e.order);
  });

  let ordersArr = orders.flat();
  let prices = {
    "El Hefe": 40,
    "Fairy Tale Ale": 60,
    GitHop: 60,
    "Hollaback Lager": 50,
    "Hoppily Ever After": 65,
    Mowintime: 30,
    "Row 26": 80,
    "Ruined Childhood": 70,
    Sleighride: 70,
    Steampunk: 50,
  };

  let obj = {};
  ordersArr.forEach(function (elem) {
    if (!(elem in obj)) {
      obj[elem] = { amount: 1, price: prices[elem] };
    } else {
      obj[elem].amount += 1;
    }
  });

  const data = {
    timestamp: timestamp,
    queue: queue,
    accumulated: obj,
  };

  post(data);
}

function post(data, callback) {
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers,
    body: postData,
  }).then((res) => res.json());
}
