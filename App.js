const alert = document.querySelector('.alert');
const form = document.querySelector('.shopping-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = '';

const setBackToDefault = () => {
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = "submit";
}

const addToLocalStorage = (id,value) => {
    localStorage.setItem(id,value)
}

const addItem = (e) => {
    e.preventDefault();
    const value = grocery.value;

    //give items unique id using miliseconds date
    const id= new Date().getTime().toString();

    if(value && !editFlag){
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = ` <p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        list.appendChild(element);
        displayAlert('item added to list', 'success');
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value && editFlag){
        console.log('editing')
    }
    else{
        displayAlert('please enter a value', 'danger')
    }
}

const displayAlert = (text, action) => {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(()=>{
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },2000)
}

const clearItems = () =>{
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item)=>{
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
}

form.addEventListener("submit", addItem);
clearBtn.addEventListener('click', clearItems);