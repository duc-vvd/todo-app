import React, { Component } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.storageKey = "todoItems";
    this.dataString = localStorage.getItem(this.storageKey);
    this.todoItems = this.dataString ? JSON.parse(this.dataString) : [];
    console.log("constructor");
    this.state = {
      addTodo: false,
      todoItems: this.todoItems,
      showDeleteBtn: false
    };
    this.onAddTodoClicked = this.onAddTodoClicked.bind(this);
    this.onEnterInput = this.onEnterInput.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
    this.onShowDeleteBtn = this.onShowDeleteBtn.bind(this);
    this.onAddInputClicked = this.onAddInputClicked.bind(this);
  }

  onItemClicked(item) {
    return () => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      const isComplete = item.isComplete;
      const newTodoItems = [
        ...todoItems.slice(0, index),
        { ...item, isComplete: !isComplete },
        ...todoItems.slice(index + 1)
      ];
      this.setState({
        todoItems: newTodoItems
      });
      localStorage.setItem(this.storageKey, JSON.stringify(newTodoItems));
    };
  }

  onAddTodoClicked() {
    this.setState({
      addTodo: true
    });
  }

  onEnterInput(e) {
    if (e.keyCode === 13) {
      this.setState({
        addTodo: false
      });
      let text = e.target.value;
      const { todoItems } = this.state;
      let index = todoItems.length + 1 + ". ";
      if (todoItems.length < 9) {
        index = "0" + (todoItems.length + 1) + ". ";
      }
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      text = index + text;
      const newTodoItems = [...todoItems, { title: text, isComplete: false }];
      this.setState({
        todoItems: newTodoItems
      });
      localStorage.setItem(this.storageKey, JSON.stringify(newTodoItems));
    }
  }

  onAddInputClicked() {
    this.setState({
      addTodo: false
    });
    let text = document.getElementById("inputAdd").value;
    const { todoItems } = this.state;
    let index = todoItems.length + 1 + ". ";
    if (todoItems.length < 9) {
      index = "0" + (todoItems.length + 1) + ". ";
    }
    if (!text) {
      return;
    }
    text = text.trim();
    if (!text) {
      return;
    }
    text = index + text;
    const newTodoItems = [...todoItems, { title: text, isComplete: false }];
    this.setState({
      todoItems: newTodoItems
    });
    localStorage.setItem(this.storageKey, JSON.stringify(newTodoItems));
  }

  onDeleteAll() {
    this.setState({
      todoItems: [],
      showDeleteBtn: false
    });
    localStorage.removeItem(this.storageKey);
  }

  onShowDeleteBtn() {
    this.setState({
      showDeleteBtn: !this.state.showDeleteBtn
    });
  }

  render() {
    const { todoItems, addTodo, showDeleteBtn } = this.state;
    const upcoming = todoItems.filter(item => !item.isComplete);
    const finished = todoItems.filter(item => item.isComplete);
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <img
              onClick={this.onShowDeleteBtn}
              src={
                "https://cdn.glitch.com/203d84d2-2d4a-4208-b8e6-ca54ee123329%2Fopen-menu.svg?v=1590661751201"
              }
            />
            <span className="navbar-title">DAILLIST</span>
          </nav>
          {showDeleteBtn && (
            <div className="wrap-btn">
              <div onClick={this.onDeleteAll} className="btn-delete">
                Delete all
              </div>
            </div>
          )}
          {!todoItems.length && (
            <img
              src={
                "https://cdn.glitch.com/203d84d2-2d4a-4208-b8e6-ca54ee123329%2Fundraw_to_do_list_a49b%20(1).svg?v=1590657594517"
              }
              className="App-logo"
              alt="logo"
            />
          )}
        </header>
        <div className="App-body">
          {upcoming.length !== 0 && (
            <div className="upcoming">
              <span>UPCOMING</span>
              {todoItems.map((item, index) => {
                if (!item.isComplete) {
                  return (
                    <TodoItem
                      item={item}
                      onItemClicked={this.onItemClicked(item)}
                      key={index}
                    />
                  );
                }
              })}
            </div>
          )}
          {finished.length !== 0 && (
            <div className="finished">
              <span>FINISHED</span>
              {todoItems.map((item, index) => {
                if (item.isComplete) {
                  return (
                    <TodoItem
                      item={item}
                      onItemClicked={this.onItemClicked(item)}
                      key={index}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>

        <footer className="App-footer">
          {addTodo && (
            <div className="wrap-input-add">
              <div className="wrap-input-add-content">
                <input
                  id="inputAdd"
                  className="input-add"
                  onKeyUp={this.onEnterInput}
                  type="text"
                  placeholder="Type here"
                />
                <div onClick={this.onAddInputClicked} className="add-input-btn">
                  <span>Add</span>
                </div>
              </div>
            </div>
          )}
          {!addTodo && (
            <div onClick={this.onAddTodoClicked} className="add-btn">
              <span>+</span>
            </div>
          )}
        </footer>
      </div>
    );
  }
}

export default App;
