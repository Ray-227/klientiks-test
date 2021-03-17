const request = require('request');
const {account_id, user_id, access_token} = require('./API_authorization_data.json');
const randomDataClient = require('./randomDataClient.json');


class AddClient {
  request(method, url, body) {
    request(
      {
        method: method,
        url: url,
        json: true,
        body: body
      }, function (error, response, body) {
        if (error) {
          return console.log(err);
        }
        console.log('Status:', response.statusCode);
        // console.log('Headers:', JSON.stringify(response.headers));
        // console.log('Response:', body);
    });
  }
}

const addClient = new AddClient;


// Функция генератор, для сохранения значения и вызова следующего по истечению N секунд.
function* getRandomDataClient() {
  for (let key in randomDataClient) {
    yield key;
  }
}
let getID = getRandomDataClient();

const METHOD = 'POST';
const URL = `https://klientiks.ru/clientix/Restapi/add/a/${account_id}/u/${user_id}/t/${access_token}/m/Clients/`;


let requestCount = Object.keys(randomDataClient).length;

// Отправляем запрос на сервер каждые 3 секунды, кол-во запросов зависит от кол-ва объектов в json файле.
let requestToServer = setInterval( () => {
  addClient.request(METHOD, URL, randomDataClient[getID.next().value]);
  i++;
  if(i === requestCount) {
    clearTimeout(requestToServer);
  }
}, 3000);


