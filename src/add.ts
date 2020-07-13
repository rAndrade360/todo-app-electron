import { ipcRenderer } from 'electron';
document.getElementById('formTodo').addEventListener('submit', (event) => {
  event.preventDefault();
  const inputElement = event.target[0];
  if(!(inputElement.value === '')){ 
    ipcRenderer.send('add-todo', inputElement.value);
  }
  inputElement.value = '';
})