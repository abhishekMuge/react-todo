import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import loading from './loading.gif'

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      newTodo: '',
      editing: false,
      editingIndex : null,
      notification : null,
      Todos : [],
      loadingState : true
    };
    this.apiURL = 'https://5d8f6438e1d1e80014f51e75.mockapi.io';

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.alert = this.alert.bind(this);
  }



  handleChange(event){
     this.setState({
       newTodo: event.target.value
     });
  }

 async componentDidMount(){
   const response = await axios.get(`${this.apiURL}/Todos`);
   console.log(response);
   this.setState({
      Todos : response.data,
      loadingState: false
   });
 }


  async addTodo(){
   

    const response = await axios.post(`${this.apiURL}/Todos`,{
      name : this.state.newTodo
    });
    console.log(response);
    const todos = this.state.Todos;
    todos.push(response.data);

    this.setState({
     Todos: todos,
     newTodo: ''
    });
    this.alert('Todo Added successfully!!!');
  }


  async deleteTodo(index){
    const todos = this.state.Todos;
    const todo = todos[index]

 
    await axios.delete(`${this.apiURL}/Todos/${todo.id}`);
 
    delete todos[index];


    this.setState({todos});
    this.alert('Todo Deleted successfully!!!');    
  }

  editTodo(index){

    const todo = this.state.Todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex : index
    });
  }

  async updateTodo(){
    const todo = this.state.Todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiURL}/Todos/${todo.id}`,{
      name : this.state.newTodo
    });
  

    const todos = this.state.Todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos , 
      editingIndex : null,
      editing : false,
      newTodo : ''
    });
    this.alert('Todo Updated successfully!!!');
  }

  alert(notification) {
      this.setState({
        notification : notification
      });
      setTimeout(() => {
          this.setState({
            notification : null
          });
      },2000);
  }

  render(){
    // console.log(this.state.newTodo);
    return(
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="text-center text-muted">CURD React</p>
      {
        this.state.notification &&
        <div className="container">
          <div className="alert mt-3 alert-info">
            <p className="text-muted text-center">{this.state.notification}</p>
          </div>
      </div>
      }
      <div className="container">
       <input type="text" name="todo" className="my-4 form-control" onChange={this.handleChange} 
       value={this.state.newTodo}
       />
      
     
      <button className="btn btn-success m-3" onClick={this.state.editing ? this.updateTodo : this.addTodo}
     disabled = {this.state.newTodo.length < 5} >
      {this.state.editing ?  'Update Todo': 'Add Todod' }</button>
      {
        this.state.loadingState &&
        <img src= {loading} alt="loading"></img>
      }
      
      {
        (!this.state.editing || this.state.loadingState) &&
        <ul className="list-group">
        {this.state.Todos.map((item, index) => {
          return <ListItem
          item = {item}
          editTodo = {() => {this.editTodo(index);}}
          deleteTodo = { () => { this.deleteTodo(index);}}
          />
        })}
  </ul>
      }
     
      </div>
    </header>
  </div>
    );
  }
}

export default App;
