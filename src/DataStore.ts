import Store from 'electron-store';
class DataStore extends Store {
  todos: string[]
  constructor(settings: object){
    super(settings);
    this.getTodos();
  }
  addTodo(todo: string){
    this.todos.push(todo);
    return this.saveTodos();
  }
  saveTodos(){
    this.set('todos', this.todos);
    return this;
  }
  getTodos(){
    this.todos = this.get('todos') || [];
    return this;
  }
  deleteTodo(todo: string){
    this.todos = this.todos.filter(t => t !== todo);
    return this.saveTodos();
  }
};

export default DataStore;