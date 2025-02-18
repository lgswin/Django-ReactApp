import React, { Component } from "react";
import Modal from "./components/Modal";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./Api"; // ✅ API 함수 import

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

  // ✅ Todo 목록 불러오기
  componentDidMount() {
    this.refreshList();
  }

  refreshList = async () => {
    try {
      const data = await getTodos(); // ✅ API 함수 사용
      this.setState({ todoList: data });
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // ✅ Todo 생성 또는 수정
  handleSubmit = async (item) => {
    this.toggle();

    try {
      if (item.id) {
        await updateTodo(item.id, item); // ✅ API 함수 사용
      } else {
        await createTodo(item); // ✅ API 함수 사용
      }
      this.refreshList(); // ✅ 목록 새로고침
    } catch (err) {
      console.log("Error saving todo:", err);
    }
  };

  // ✅ Todo 삭제
  handleDelete = async (item) => {
    try {
      await deleteTodo(item.id); // ✅ API 함수 사용
      this.refreshList();
    } catch (err) {
      console.log("Error deleting todo:", err);
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
    const { viewCompleted, todoList } = this.state;
    const newItems = todoList.filter((item) => item.completed === viewCompleted);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
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