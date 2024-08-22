let tasks_li = document.getElementById("tasks");
let textinput = document.getElementById("textinput");
let addBtn = document.getElementById("push");
let edittodo = null;
let todos = [];

let objstr = localStorage.getItem('users');
if (objstr !== "") {
    todos = JSON.parse(objstr);
}

DisplayInfo();

addBtn.onclick = () => {
    const name = textinput.value;
    const checkBox = document.getElementById("checkbox");
    if (edittodo != null) {
        todos.splice(edittodo, 1, { 'name': name, 'checkbox': false })
    }
    else {
        todos.push({ 'name': name, 'checkbox': false });
    }
    SaveInfo(todos);
    textinput.value = "";
    DisplayInfo();
    addBtn.innerText = "Add";
}
function SaveInfo(todos) {
    let str = JSON.stringify(todos);
    localStorage.setItem('users', str);
    edittodo = null;
}
function DisplayInfo() {
    let statement = '';
    todos.forEach((user, i) => {
        statement += `
        <li> 
            <input type="checkbox" name="checkbox" id="checkbox${i}" onclick='checkbox(${i})'>
            <p> ${user.name}</p>
            <button id="deleteBTn" onclick='DeleteInfo(${i})'>Remove</button>
            <button id="editBTn" onclick='EditInfo(${i})'>Edit</button>
        </li>
        `;
    });
    tasks_li.innerHTML = statement;
    loadCheckbox();
}
function EditInfo(id) {
    edittodo = id;
    textinput.value = todos[id].name;

    addBtn.innerText = "Save";
}
function DeleteInfo(id) {
    todos.splice(id, 1);
    SaveInfo(todos);
    DisplayInfo();
}
function checkbox(id) {
    let checkbox = document.getElementById(`checkbox${id}`);
    let todo = JSON.parse(localStorage.getItem('users'));
    todo.forEach((t, index) => {
        if (index == id) {
            t.checkbox = checkbox.checked;
        }
    });
    localStorage.setItem('users', JSON.stringify(todo))
}
function loadCheckbox() {
    todos.forEach((user, i) => {
        document.getElementById(`checkbox${i}`).checked = user.checkbox;
    })
}