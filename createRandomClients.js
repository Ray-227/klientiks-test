const fs = require('fs');


function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

class RandomClient {
  getName() {
    return 'Иван';
  }

  getPhone() {
    return '79996661488';
  }

  calcFibID(n) {
    let fib1 = 1;
    let fib2 = 1;

    let i = 0;
    while (i < n - 1) {
      let fibSum = fib1 + fib2;
      fib1 = fib2;
      fib2 = fibSum;
      i++;
    }

    return String(fib2);
  }

  getRandomDOB() {
    // Не стал высчитывать фисокосные года и т.д
    let year = randomInteger(1970, 2000);
    let month = randomInteger(1, 12);
    let day = randomInteger(1, 29);

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }
}

const {getName, getPhone, calcFibID, getRandomDOB} = new RandomClient;

const users = {};
const countClient = 50;

// Attributes client
/*
  Добавить клиента:
    ФИО клиента -> first_name (required)
    Номер клиента -> phone (required)
    Код клиента -> account_id
    Дата рождения -> birth_date
*/
for (let i = 0; i < countClient; i++) {
  users[i+1] = {
    first_name: getName(),
    phone: getPhone(),
    account_id: calcFibID(i+1),
    birth_date: getRandomDOB()
  };
}

let client = JSON.stringify(users, null,'\t');

fs.writeFile('./randomDataClient.json', client, function(err) {
  if(err) return console.error(err);
  console.log('done');
})





