// script.js

// Referências aos elementos HTML
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Função para adicionar uma tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    // Criar um novo item de lista
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="delete-btn">X</button>
    `;
    taskList.appendChild(li);

    // Adicionar evento de marcar como concluído
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    // Adicionar evento de excluir a tarefa
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Impede que o evento de clique no 'li' seja disparado
      li.remove();
      saveTasks();
    });

    // Limpar o campo de input
    taskInput.value = '';

    saveTasks();
  }
}

// Função para salvar as tarefas no LocalStorage
function saveTasks() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach(item => {
    const taskText = item.querySelector('.task-text').textContent;
    const isCompleted = item.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do LocalStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">X</button>
    `;
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);

    // Adicionar evento de marcar como concluído
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    // Adicionar evento de excluir a tarefa
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });
  });
}

// Função para limpar todas as tarefas
function clearAllTasks() {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
}

// Eventos
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
clearAllBtn.addEventListener('click', clearAllTasks);

// Carregar as tarefas ao iniciar a página
loadTasks();
