import {ipcRenderer} from 'electron';
document.getElementById('createTodoBtn').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window');
})
const deleteTodo = (e) => {
  ipcRenderer.send('delete-todo', e.target.textContent);
}
ipcRenderer.on('todos', (event, todos: string[]) => {
  const todoList = document.getElementById('todoList');
  const todoItems = todos.reduce((html, todo) => {
    html += `<li class="todo-item" >${todo}</li>`;
    return html;
  }, '');
  todoList.innerHTML = todoItems;
  todoList.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', deleteTodo);
  })
});