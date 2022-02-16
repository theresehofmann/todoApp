import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            currentPage: 1,
            currentTodos: [],
            listTodos: []

        }
        this.todoOnPage=this.todoOnPage.bind(this)

    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then(response => response.json())
          .then(json => {
            this.setState({ listTodos: json }, () =>{ 
                this.todoOnPage(this.state.listTodos);
            })
        })
      }

    addItem = () => {
        const listTodos = [...this.state.listTodos];

        const newItem = {userId: 1, id: listTodos.length+1, title: this.state.newItem, completed: false};
        
        listTodos.push(newItem);
        
        this.setState({
            listTodos,
            newItem: ""
        }, () =>{ 
            this.todoOnPage(this.state.listTodos);
        });
      }

    completeTodo(todo, list) {
        for (let i = 0; i < list.length; i++) {
            if(list[i].id === todo.id){
                let item = list[i];
                if(item.completed === true){
                    item.completed = false;
                }
                else {
                    item.completed = true;
                }
                list[i] = item;
                this.setState({ listTodos : list }, () =>{ 
                    this.todoOnPage(list);
                });
            }
          }
        }

    deleteTodo(todo, list) {
        const id = todo.id;
        const updatedList = list.filter(todo => todo.id !== id);
        this.setState({ listTodos: updatedList }, () =>{ 
            this.todoOnPage(updatedList);
        });
      }

    updateInput(value) {
        this.setState({ newItem: value });
    }

    todoOnPage = (list) => {
        let pageSize = 10;      
        let listCurrentPageTodos = [];
        for (let i = (this.state.currentPage-1)*pageSize; i < this.state.currentPage*pageSize; i++){
            if(list[i]){
                listCurrentPageTodos.push(list[i]);
            }
        }

        this.setState({ currentTodos: listCurrentPageTodos });
    }

    currentPage = (i) => {
        let pageSize = 10;
        let totalOfPages = Math.ceil( (this.state.listTodos).length / pageSize);
        if( (this.state.currentPage === 1 && i === -1) || (this.state.currentPage === totalOfPages && i === 1) ) {
            return;
        }
        else {
            let currPage = this.state.currentPage;
            currPage = currPage + i;
            this.setState({ currentPage : currPage}, () =>{ 
                this.todoOnPage(this.state.listTodos);
            });
        }
    }

      render() {
        return (
          <div>
          <h1 className="todo-title">Todo List</h1> 
            <div className="container">
            Add Todo
              <div className="add-todo-area">
              <input
                type="text"
                placeholder="Type item here"
                value={this.state.newItem}
                onChange={e => this.updateInput(e.target.value)}
                className='todo-text-area'
              />
              <button
                className="add-todo-btn"
                onClick={() => this.addItem()}
              >
                <i className="material-icons"> + </i>
              </button>
              </div>
              <ul >
            <div className="todo-list">
            {this.state.currentTodos.map(todo => {
                return (
                    <div className='todo'>
                        <input 
                            type="checkbox" 
                            className='check'
                            checked={todo.completed}
                            onChange={() => this.completeTodo(todo, this.state.listTodos)} />
                        {(() => {
                            if (todo.completed === true) {
                                return (
                                    <li key={todo.id}>
                                        <s>{todo.title}</s>
                                    </li> 
                                )
                              } else{
                                return (
                                    <li key={todo.id}>
                                        {todo.title}
                                    </li> 
                                )
                              }
                            })()}
                        <button className='remove-btn' onClick={() => this.deleteTodo(todo, this.state.listTodos)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                        </button>
                    </div>
                );
                })}
            </div>
            </ul>
            <div className='page-btns'>
                <button data-testid="prev" className="previous" onClick={() => this.currentPage(-1)}>Prev</button>
                <button data-testid="next" className="next" onClick={() => this.currentPage(1) } >Next</button>
            </div>
            </div>
        </div>
        );
      }
}
export default TodoList;
