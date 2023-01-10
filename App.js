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

const getLocalStorage = () => {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

const addToLocalStorage = (id,value) => {
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
};

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem('list', JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
    let items = getLocalStorage();
    items = items.map((item)=>{
        if(item.id===id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}

const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'success');
    setBackToDefault();
    removeFromLocalStorage(id);
}

const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';
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

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        list.appendChild(element);
        displayAlert('item added to list', 'success');
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocalStorage(editId, value);
        setBackToDefault();
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
    },1000)
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
    setBackToDefault();
    localStorage.removeItem('list');
}

form.addEventListener("submit", addItem);
clearBtn.addEventListener('click', clearItems);
