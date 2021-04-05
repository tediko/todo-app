import { animationFadeIn, animationFadeOut, addAnimation } from './animations.js';
import { default as themeSwitcher } from './theme.js';

// Selectors
const todoForm = document.querySelector('[data-form]');
const todoInput = document.querySelector('[data-input]');
const todoList = document.querySelector('[data-list]');

const itemsCounter = document.querySelector('[data-counter]');
const tabs = document.querySelectorAll('[data-tabs]');
const clearCompleted = document.querySelector('[data-clear]');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let tabOpen = 'all';


// Add item to todos array from user input.
const addTodo = (event) => {
    event.preventDefault();
    let inputValue = todoInput.value;
    if (!inputValue) return;
    
    let todo = {
        text: inputValue,
        done: false,
        id: todos.length
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    todoForm.reset();
    showActiveTab(tabs[0]);
    displayTodos();
    let elementToAnimate = todoList.lastChild;
    addAnimation(elementToAnimate, animationFadeIn, {
        duration: 600,
    }); 
}

// Display todos depending on user choice in select menu
const displayTodos = (tab = 'all') => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    removeAllTodos(todoList);
    countActiveTodos();

    todos.length == 0 ? renderWhileEmpty(tab) : checkIfCompleted(tab);
    
    todos.forEach((todo, index) => {
        if (tab == 'all') {
            renderList(todo, index);
        } else if (tab == 'active' && !todo.done) {
            renderList(todo, index);
        } else if (tab == 'completed' && todo.done) {
            renderList(todo, index);
        }
    })
}

// Remove all childs from given list.
const removeAllTodos = (list) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Remove completed todos.
const removeCompletedTodos = () => {
    let deletedItem;
    let animation;
    
    // _ indicates the first parameter is not to be used.
    // works like forEach but from right to left.
    todos.reduceRight((_, todo, index) => {
        if (todo.done && tabOpen == 'completed') {
            todos.splice(index, 1);
        } else if (todo.done) {
            todos.splice(index, 1);
            deletedItem = todoList.childNodes[index];
            animation = addAnimation(deletedItem, animationFadeOut, {
                duration: 600,
                fill: 'forwards'
            })
            animation;
        }
    }, null);

    showActiveTab(tabs[0]);
    localStorage.setItem('todos', JSON.stringify(todos));
    if (tabOpen == 'completed') {
        tabOpen = 'all';
        displayTodos(tabOpen);
    } else {
        animation.onfinish = () => {
            displayTodos(tabOpen);
        }
    }
}

// Fn to toggle done/undone on item after user click.
const toggleDone = (event) => {
    if (!event.target.matches('input')) return;

    let index = event.target.dataset.index;
    let checkbox = event.target;
    let label = event.originalTarget.parentElement;

    todos[index].done = !todos[index].done;
    checkbox.setAttribute('checked', 'true');
    todos[index].done ? label.classList.add('completed') : label.classList.remove('completed');

    localStorage.setItem('todos', JSON.stringify(todos));
    countActiveTodos();
}

// Fn to remove one specific item.
const removeTodo = (event) => {
    if (!event.target.matches('button')) return;
    event.preventDefault();
    disableAllDeleteButtons();

    let index = event.target.dataset.index;
    let deletedItem = todoList.childNodes[index];
    let animation;
    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
    animation = addAnimation(deletedItem, animationFadeOut, {
        duration: 600,
        fill: 'forwards'
    })
    animation;
    animation.onfinish = () => {
            displayTodos(tabOpen);
        }
}

// Fn to dynamically count how many undone/active items left. 
const countActiveTodos = () => {
    let result = 0; 
    todos.forEach(todo => todo.done ? null : result++);
    itemsCounter.innerHTML = `${result == 1 ? `${result} item left` : `${result} items left`}`;
    document.title = `Todo app ${result > 0 ? `| (${result})` : `` }`;
}

// Fn to add active class to selected tab in options menu.
const showActiveTab = (isActive = false) => {
    tabs.forEach(tab => tab.classList.remove('active'));
    isActive ? isActive.classList.add('active') : null;
}

// Fn to disable delete buttons to prevent removing items
// before animation end's. 
const disableAllDeleteButtons = () => {
    let deleteButtons = document.querySelectorAll('[data-deleteBtn]');
    deleteButtons.forEach(btn => btn.disabled = true)
}

// Fn to create todo list item elements
const renderList = (todo, index) => {
    const documentFragment = new DocumentFragment();
    
    const listItem = document.createElement('li');
    listItem.classList.add('todo__item');
    listItem.setAttribute('id', `${todo.id}`);
    todo.done ? listItem.classList.add('completed') : null;
    
    const checkbox = document.createElement('input');
    checkbox.classList.add('todo__item-input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-index', `${index}`);
    checkbox.setAttribute('id', `item${index}`);
    todo.done ? checkbox.setAttribute('checked', 'true') : null;
    
    const label = document.createElement('label');
    label.setAttribute('for', `item${index}`);
    label.classList.add('todo__label');
    label.innerHTML = `<p class="todo__label-text">${todo.text}</p>`
    
    const span = document.createElement('span');
    span.classList.add('todo__span');
    
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-index', `${index}`);
    deleteButton.setAttribute('data-deleteBtn', ``);
    deleteButton.classList.add('todo__deleteBtn');
    deleteButton.innerHTML = `<i class="i-cross todo__deleteBtn-icon"></i>`;
    
    listItem.appendChild(checkbox);
    label.appendChild(span);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    documentFragment.appendChild(listItem);
    todoList.appendChild(documentFragment);
}

// Render list item with information about no todo to display.
const renderWhileEmpty = (tab) => {
    const documentFragment = new DocumentFragment();

    const listItem = document.createElement('li');
    listItem.classList.add('todo__item', 'todo__item-warning');
    
    listItem.innerHTML = `<i class="i-warning todo__item-warning-icon"></i> ${tab == 'completed' ?
        'You have no completed todo to display!' :
        'You have no active todo to display!'}`;

    documentFragment.appendChild(listItem);
    todoList.appendChild(documentFragment);
}

// Checking if there is completed or active todos to display, if no
// then renderWhileEmpty() render list item with information. 
const checkIfCompleted = (tab) => {
    let completedResult = 0;
    let activeResult = 0;

    todos.forEach(todo => {
        todo.done ? completedResult++ : activeResult++;
    })

    if (completedResult == 0 && tab == 'completed') {
        renderWhileEmpty(tab);
    } else if (activeResult == 0 && tab == 'active') {
        renderWhileEmpty(tab);
    }
}

// Sortable
let sortable = new Sortable(todoList, {
    animation: 150,
    ghostClass: 'ghost',
    onSort: () => {
        if (tabOpen != 'all') return;
        let listItems = todoList.childNodes;
        let storageBefore = JSON.parse(localStorage.getItem("todos"));
        let storageAfter = [];
        let results = [];

        listItems.forEach(item => results.push(item.id)); 

        results.forEach(result => {
            let isFound = false;
            storageBefore.forEach((item, index) => {
                if (isFound) return;
                if (item.id == result) {
                    storageAfter.push(item);
                    storageBefore.splice(index, 1);
                    isFound = true;
                }
            })
        })
        localStorage.setItem("todos", JSON.stringify(storageAfter));
    }
});

// Event listeners
todoForm.addEventListener('submit', (event) => addTodo(event));
todoList.addEventListener('click', toggleDone);
todoList.addEventListener('click', removeTodo);
clearCompleted.addEventListener('click', removeCompletedTodos);
tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
        let activeTab = event.target.dataset.tabs;
        tabOpen = activeTab;
        activeTab == 'active' ? clearCompleted.removeEventListener('click', removeCompletedTodos) : 
            clearCompleted.addEventListener('click', removeCompletedTodos);
        showActiveTab(tab);
        displayTodos(activeTab);
    })
})

displayTodos();