import * as React from "react";
import './App.css';
import { AppBar } from "@material-ui/core";
import TodoList from './TodoList';



class App extends React.Component {
  render() {
    return (
      <div className='todo-application'>
        <header>
        <AppBar position="static">
          </AppBar>
        </header>
        <TodoList />
      </div>
    );
  }
}

export default App;
