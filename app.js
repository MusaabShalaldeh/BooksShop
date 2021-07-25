'use strict'

const form = document.getElementById('form');
const table = document.getElementById('table');
const totals = document.getElementById('totals');
let totalsNum = 0;
const dataKey = 'datakey';

let books = [];

function Book(bookName,pages,price){

    this.bookName = bookName;
    this.pages = pages;
    this.price = price;

    
    books.push(this);
    this.render();
}

Book.prototype.render = function(){

    const row = document.createElement('tr');
    table.appendChild(row);

    const data1 = document.createElement('td');
    data1.textContent = this.bookName;
    row.appendChild(data1);

    const data2 = document.createElement('td');
    data2.textContent = this.pages;
    row.appendChild(data2);

    const data3 = document.createElement('td');
    data3.textContent = this.price;
    row.appendChild(data3);

    totalsNum += parseInt(this.price);
    totals.textContent = 'Total: '+totalsNum;

}

function inputData(event){

    event.preventDefault();
    const bookName = event.target.bookName.value;
    const pages = getRandomIntInclusive(1,500);
    const price = event.target.pricesID.value;

    new Book(bookName,pages,price);
    saveData(dataKey,books);
}

function saveData(key,arr){

    localStorage.setItem(key,JSON.stringify(arr));
}

function getData(key){

    //get data and reinstantiate object if data exists.
    if(localStorage.getItem(key) != null){
        const retrievedData = JSON.parse(localStorage.getItem(key));

        for (let i = 0; i < retrievedData.length; i++) {
            const obj = retrievedData[i];

            new Book(obj.bookName,obj.pages,obj.price);
        }
    }
}

function initlize(){
    form.addEventListener('submit',inputData);
    getData(dataKey);
    console.log(books);
}
initlize();























//------------Helper Functions
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
//----------------------------------