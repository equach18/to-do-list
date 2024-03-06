
const form = document.querySelector("form");
const newTodos = document.querySelector("#list");
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];


for(let i = 0; i < savedTodos.length; i++){
    let newLine = document.createElement("li");
    let taskWithoutButton = savedTodos[i].task.substring(0,savedTodos[i].task.length-6);
    newLine.innerText = taskWithoutButton;
    const button = document.createElement("button");
    button.innerText = "Remove"
 
    if (savedTodos[i].isDeleted === true){
        newLine.style.display = "none"
    }

    if(savedTodos[i].isCompleted === true){
        newLine.classList.add("taskCompleted");
    }


    newLine.appendChild(button);
    newTodos.appendChild(newLine);
}


form.addEventListener('submit', function(e){

    const taskInput = document.querySelector("#task");
    e.preventDefault();
    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    const button = document.createElement("button");
    button.innerText = "Remove";
    newTask.appendChild(button);
    newTodos.appendChild(newTask);
    form.reset();

    savedTodos.push({task: newTask.innerText, isCompleted: false, isDeleted: false});
    localStorage.setItem("todos", JSON.stringify(savedTodos));
});

newTodos.addEventListener('click', function(e){

    if(e.target.tagName === "LI" && e.target.className !== "taskCompleted"){
        e.target.classList.add("taskCompleted");
        e.target.isCompleted = true;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
    else if(e.target.tagName === "LI" && e.target.className === "taskCompleted"){
        e.target.classList.remove("taskCompleted");
        e.target.isCompleted = false;
    }

    if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
        e.target.isDeleted = true;
    }

    

    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === e.target.innerText) {
          savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
          localStorage.setItem("todos", JSON.stringify(savedTodos));
        }

        if(e.target.isDeleted === true && savedTodos[i].task === e.target.parentElement.innerText){
            savedTodos[i].isDeleted = true;
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      }
});
