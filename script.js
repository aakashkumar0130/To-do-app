document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));   // for rendrering to do's at the start of the project
    };


    const addTodoToDOM = (todo) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.dataset.id = todo.id;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTodo(todo.id);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };

    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todo = {
            id: Date.now(),
            text: todoText
        };

        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        addTodoToDOM(todo);
        todoInput.value = '';
    };

    const editTodo = (id) => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        const todo = todos.find(todo => todo.id === id);
        todoInput.value = todo.text;
        deleteTodo(id);
    };

    const deleteTodo = (id) => {
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        loadTodos();
    };

    addButton.addEventListener('click', addTodo);
    
    // Add event listener for Enter key
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    loadTodos();
});
