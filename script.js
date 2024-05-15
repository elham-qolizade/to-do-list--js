const addTaskButton = document.getElementById('btn'); //  button ID
const textInput = document.getElementById('text-input'); //  input ID
const todoList = document.getElementById('list-item'); // list ID

// Function to save the to-do list to Local Storage
function saveLocalStorage() {
    const list = [];
    const items = todoList.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        const itemElement = items[i];
        const textContent = itemElement.textContent;
        const isChecked = itemElement.querySelector('input[type="checkbox"]').checked;
        list.push({ text: textContent, completed: isChecked });
    }
    localStorage.setItem('todoList', JSON.stringify(list)); //  storage key
}

function loadList() { //  function name
    if (localStorage.getItem('todoList') !== null) {
        const toDos = JSON.parse(localStorage.getItem('todoList'));
        for (let i = 0; i < toDos.length; i++) {
            const todo = toDos[i];
            const li = document.createElement('li');
            li.draggable = true;
            li.textContent = todo.text;

            const checkbox = document.createElement('input'); //  checkbox element name
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = todo.completed;
            li.appendChild(checkbox);

            if (todo.completed) {
                li.classList.add('strikethrough');
            }

            todoList.appendChild(li);
            // delet text
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', () => {
                todoList.removeChild(li);
                saveLocalStorage();
            });

            li.appendChild(deleteButton);

            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    li.classList.add('strikethrough');
                } else {
                    li.classList.remove('strikethrough');
                }
                saveLocalStorage();
            });
        }
    }
}

loadList(); //  function call
//addtask
addTaskButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text !== "") {
        const li = document.createElement('li');
        li.draggable = true;
        li.textContent = text;
        //checkbox
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        li.appendChild(checkbox);

        todoList.appendChild(li);

        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                li.classList.add('strikethrough');
            } else {
                li.classList.remove('strikethrough');
            }
            saveLocalStorage();
        });
        //delete task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveLocalStorage();
        });

        li.appendChild(deleteButton);

        textInput.value = "";
        saveLocalStorage();
    }
});
//drag & drop
const sortableList =
    document.getElementById("list-item");
let draggedItem = null;
//dragstart
sortableList.addEventListener(
    "dragstart",
    (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.display =
                "none";
        }, 0);
    });
//dragend
sortableList.addEventListener(
    "dragend",
    (e) => {
        setTimeout(() => {
            e.target.style.display = "";
            draggedItem = null;
        }, 0);
    });
//dragover
sortableList.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        const afterElement =
            getDragAfterElement(
                sortableList,
                e.clientY);
        const currentElement =
            document.querySelector(
                ".dragging");
        if (afterElement == null) {
            sortableList.appendChild(
                draggedItem
            );
        }
        else {
            sortableList.insertBefore(
                draggedItem,
                afterElement
            );
        }
    });

const getDragAfterElement = (
    container, y
) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];

    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };
            }
            else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};




