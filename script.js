const table = document.getElementById('table')
const modal = document.getElementById('modal')
const form = document.getElementById('form')
const inputDescription = document.getElementById('description')
const inputDate = document.getElementById('date')
const loadingMessage = document.getElementById('loading-message')
const countTask = document.getElementById('count-tasks')
const btnCreatTask = document.getElementById('btn-creat-task')

function updateCountTasks() {
    const allTasks = getTasks();
    countTask.innerHTML = allTasks.length;
}

function fillTable() {
    const allTasks = getTasks()

    if(allTasks.length == 0) {
        loadingMessage.innerHTML = "Você não tem nenhuma tarefa"
    } else {
        loadingMessage.innerHTML = ""
    }

    updateCountTasks()
}

function innerHTMLTasks(task) {
    const html = `
        <td>${task.description}</td> 
        <td>${task.date}</td>
        <td>
            <a href="#" onclick="removeTask()">
                🗑
            </a>
        </td>
    `

    return html;
}

btnCreatTask.addEventListener('click', creatTask)
function creatTask(e) {
    e.preventDefault();

    if(!inputDescription.value || !inputDate.value) {
        alert('Preencha todos os campos!');
        return;
    }

    const newTask = {
        description: inputDescription.value,
        date: new Date(inputDate.value).toLocaleDateString('pt-br', {timeZone: UTC}),
        id:Math.floor(Math.random() * 10000)
    }

    const allTasks = getTasks();

    localStorage.setItem('@GoTasks', JSON.stringify( [ newTask ] ));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('@GoTasks')) || [];
}

function setTasks(tasks) {
    localStorage.setItem('@GoTasks', JSON.stringify(tasks));
}

function toggleModal() {
    modal.classList.toggle('modal-visible')
    clearFields()
}

function clearFields() {
    inputDescription.value = ''
    inputDate.value = ''
}