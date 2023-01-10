const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = '';

form.addEventListener('submit', addItem)

const addItem = (e)=>{
    e.preventDefault();
    const value = grocery.value;

    //give items unique id using miliseconds date
    const id= new Date().getTime().toString();

    if(value !== '' && editFlag === false){
        console.log('add item to the list')
    }
    else if(value !== '' && editFlag === true){
        console.log('editing')
    }
    else{
        console.log('empty value')
    }

    localStorage.setItem('grocery', value);
}