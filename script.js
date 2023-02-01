const table = document.getElementById('table')
const modal = document.getElementById('modal')
const form = document.getElementById('form')
const inputDescription = document.getElementById('description')
const inputDate = document.getElementById('date')
const loadingMessage = document.getElementById('loading-message')
const countTask = document.getElementById('count-tasks')
const btnCreateTask = document.getElementById('btn-creat-task')
const alertBox = document.getElementById('alert')

function updateCountTasks() {
    const allTasks = getTasks();
    countTask.innerHTML = allTasks.length;
}

function fillTable() {
    const allTasks = getTasks()
    allTasks.forEach(addTask)

    if(allTasks.length === 0) {
        loadingMessage.innerHTML = "Você não tem nenhuma tarefa"
    } else {
        loadingMessage.innerHTML = ""
    }

    updateCountTasks()
}

function addTask(task) {
    const tr = document.createElement('tr')
    tr.innerHTML = innerHTMLTasks(task)

    table.appendChild(tr)
}

function innerHTMLTasks(task) {
    const html = `
        <td>${task.description}</td> 
        <td>${task.date}</td>
        <td>
            <a href="#" onclick="removeTask(${task.id})">
                🗑
            </a>
        </td>
    `

    return html;
}

function removeTask(id) {
    const allTasks = getTasks()
    const filterTasks =  allTasks.filter(task => task.id !== id)

    setTasks(filterTasks)
    reload()
}

function reload() {
    table.innerHTML = ''
    fillTable()
}

function createTask(e) {
    e.preventDefault();

    if(!inputDescription.value || !inputDate.value) {
        alertBox.style.display = 'block';
        closeAlert()
        return;
    }

    const newTask = {
        description: inputDescription.value,
        date: new Date(inputDate.value).toLocaleDateString('pt-br'),
        id:Math.floor(Math.random() * 10000)
    }

    const allTasks = getTasks();

    setTasks([...allTasks, newTask]);

    reload();
    toggleModal();
    clearFields();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('@GoTasks')) || [];
}

function setTasks(tasks) {
    localStorage.setItem('@GoTasks', JSON.stringify(tasks));
}

function toggleModal() {
    modal.classList.toggle('modal-visible')
}

function clearFields() {
    inputDescription.value = ''
    inputDate.value = ''
}

function closeAlert() {
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 2000)
}

btnCreateTask.addEventListener('click', createTask);