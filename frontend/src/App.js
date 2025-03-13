import React, { Component } from "react";
import Modal from "./components/Modal";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./Api"; // Import API functions

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  // Load Todo list
  componentDidMount() {
    this.refreshList();
  }

  refreshList = async () => {
    try {
      const data = await getTodos(); // Use API functions
      this.setState({ todoList: data });
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Create or update a Todo item
  handleSubmit = async (item) => {
    this.toggle();

    try {
      if (item.id) {
        await updateTodo(item.id, item); // Use API functions
      } else {
        await createTodo(item); // Use API functions
      }
      this.refreshList(); // Refresh list
    } catch (err) {
      console.log("Error saving todo:", err);
    }
  };

  // Delete a Todo item
  handleDelete = async (item) => {
    try {
      await deleteTodo(item.id); // Use API functions
      this.refreshList();
    } catch (err) {
      console.log("Error deleting todo:", err);
    }
  };

  toggleComplete = async (item) => {
    const updatedItem = { ...item, completed: !item.completed };
    
    try {
      await updateTodo(updatedItem.id, updatedItem); // Update the backend
      this.refreshList(); // Refresh UI
    } catch (err) {
      console.log("Error updating todo:", err);
    }
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { todoList } = this.state;
    const newItems = todoList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <input
          type="checkbox"
          className="mr-2"
          checked={item.completed}
          onChange={() => this.toggleComplete(item)}
        />
        <span
          className={`todo-title mr-2 text-left ${item.completed ? "completed-todo" : ""}`}
          style={{ textDecoration: item.completed ? "line-through" : "none", flex: 1 }}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Gunsu's Todo app</h1>
        <div className="row">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4 text-right">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
        ) : null}
      </main>
    );
  }
}

export default App;