// Model 

// If local storage has a todos array, then use it.
// Otherwise use the default array.
  let todos;

  // Retrive local storage
   const savedTodos = JSON.parse(localStorage.getItem('todos'));
  // Check if its an array.
  if (Array.isArray(savedTodos)){
    todos = savedTodos;
    } else {
      todos = [{
        title: 'Get goceries',
        dueDate: '2021-10-04',
        id: 'id1'
      }, {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: 'id2'
      }, {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: 'id3'
      }];
    }


  //Creates a todo
  function createTodo (title, dueDate){
    const id = '' + new Date().getTime();// added the empty string above so it converts the number to a string, negates the type error in the 'deleteToDo' function.
    todos.push({
      title: title,
      dueDate: dueDate,
      id: id
    });
    saveTodos(); // saves the data in local storage when a todo is pushed into the array 'todos'
  }

  //Deletes a todo
  function removeTodo(idToDelete){
    todos = todos.filter(function(todo){
    // if the id of this todo matches idToDelete then, return false. (bc we want to remove it from todos array)
    // for everything else, return true.
    if (todo.id === idToDelete){  // 2 strings are being compared.
      return false;
      } else {
          return true;
        } 
      });
        saveTodos(); // saves the data in local storage when a todo is deleted from the array 'todos'.
      }

      function saveTodos(){
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function toggleTodo(todoId, checked) {
      todos.forEach(function (todo) {
        if (todo.id === todoId) {
          todo.isDone = checked;
        }
      });
    }
    render();

  // Controller
  function addTodo () {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo (title, dueDate);
    render();
    textbox.value = "";
  }

  function deleteTodo (event){
    const deleteButton = event.target; //assigns the event to 'deleteButton', which is triggered when the delete button is clicked.
    const idToDelete = deleteButton.id; // assigns the appropriate delete button id to 'idToDelete'.

    removeTodo(idToDelete);
    render(); 
  }

  function checkTodo (event) {
    const checkBox = event.target;
    const todoId = checkBox.dataset.todoId;
    const checked = checkBox.checked;

    toggleTodo(todoId, checked);
    render();

  }

  // View
  function render (){
    //reset our list to be empty
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todo) {
      const element = document.createElement('div');
      element.className = 'created-todo-div'// gives the todo div a class.

      //Checkbox
      let checkBox = document.createElement('input');
      checkBox.type = "checkbox";
      checkBox.onchange = checkTodo;
      checkBox.dataset.todoId = todo.id;
      if (todo.isDone === true){
        checkBox.checked = true;
      } else {
        checkBox.checked = false;
      }


      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<img class = "delete-icon "src="icons/delete-icon.svg">';
      deleteButton.style = 'margin-left: 12px; ';
      deleteButton.onclick = deleteTodo;
      deleteButton.id = todo.id
      deleteButton.className = 'delete-button' //gives the delete button a class.
      //below, it adds the delete button to the element div, so the order in the line becomes: 
      //1) name of todo 2) due date 3) delete button


      //Created span elements for the todo.title and the todo.dueDate, in order to style them in the stylesheet.
      const titleElement = document.createElement('span');
      titleElement.innerText = todo.title;
      titleElement.className = 'title-class';

      const dueDateElement = document.createElement('span');
      dueDateElement.innerText = todo.dueDate;
      dueDateElement.className = 'due-date-class';

      //appends the element into the todo-list div in the DOM.
      const todoList = document.getElementById('todo-list');
      todoList.appendChild(element);
      element.appendChild(titleElement);
      element.appendChild(dueDateElement);

      element.appendChild(checkBox);
      element.appendChild(deleteButton);
      
    });
  }