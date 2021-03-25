import React, { Component } from "react";
import TasksModal from "../../TasksModal/TasksModal";
import Task from "../../Task/Task";
import Spinner from '../../Spinner/Spinner'
import dateFormatter from '../../../utils/dateFormatter'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Button } from "react-bootstrap";

import "./ToDo.scss";
import Confirm from "../../Confirm";

const API_HOST = "http://localhost:3001";

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    isOpenModalTask: false,
    showConfirm: false,
    editTask: null,
    loading: false
  };
  ColStyles = ["mt-2", "mb-2", "slide-bottom"];

  handleSubmit = (formData) => {
    this.setState({loading: true})
    fetch(`${API_HOST}/task`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        const tasks = [...this.state.tasks];
        tasks.push(data);
        this.setState({
          tasks,
          isOpenModalTask: false
        });
      })
      .catch((error) => {
        console.log("Add Task Error", error);
      })
      .finally(()=> {
        this.setState({
          loading: false
        })
      })
  };

  handleToggleCheckTask = (id) => {
    let checkedTasks = new Set(this.state.checkedTasks);

    if (!checkedTasks.has(id)) {
      checkedTasks.add(id);
    } else {
      checkedTasks.delete(id);
    }

    this.setState({
      checkedTasks,
    });
  };

  handleDeleteCheckedTasks = () => {
    let { checkedTasks } = this.state;
    this.setState({
      loading: true
    })

    fetch(`${API_HOST}/task`, {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => !checkedTasks.has(task._id));

        this.setState({
          tasks,
          checkedTasks: new Set(),
          showConfirm: false,
        });
      })
      .catch((error) => {
        console.log("Delete Batch of Tasks Error", error);
      })
      .finally(()=> {
        this.setState({
          loading: false
        })
      })
  };

  removeTask = (_id) => {
    let tasks = [...this.state.tasks];
    this.setState({
      loading: true
    })

    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        tasks = tasks.filter((task) => task._id !== _id);
        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=> {
        this.setState({
          loading: false
        })
      })
  };

  handleCheckAllTasks = () => {
    let checkedTasks = new Set(this.state.checkedTasks);
    let { tasks } = this.state;
    if (checkedTasks.size === 0) {
      tasks.forEach((item) => checkedTasks.add(item._id));
    } else {
      tasks.forEach((item) => checkedTasks.delete(item._id));
    }

    this.setState({
      checkedTasks,
    });
  };

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenModalTask: !this.state.isOpenModalTask,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleEditModal = (task) => {
    this.setState({
      editTask: task,
    });
  };

  handleSave = (editableTask) => {
    const tasks = [...this.state.tasks];

    const formData = {
      title: editableTask.title,
      description: editableTask.description,
      date: dateFormatter(editableTask.date)
    }
    this.setState({
      loading: true
    })

    fetch(`${API_HOST}/task/${editableTask._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        let index = tasks.findIndex((task) => task._id === data._id);
        tasks[index] = data;

        this.setState({
          tasks,
          editTask: null
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=> {
        this.setState({
          loading: false
        })
      })
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
    fetch(`${API_HOST}/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          tasks: data,
        });
      })
      .catch((error) => {
        console.log("Get All Tasks, error", error);
      })
      .finally(()=> {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const {
      checkedTasks,
      tasks,
      isOpenModalTask,
      showConfirm,
      editTask,
      loading
    } = this.state;
    const tasksList = tasks.map((task, index) => {
      return (
        <Col
          className={this.ColStyles}
          key={task._id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <Task
            task={task}
            index={index}
            removeTask={this.removeTask}
            handleToggleCheckTask={this.handleToggleCheckTask}
            onEdit={this.toggleEditModal}
            isAnyTaskChecked={!!checkedTasks.size}
            isChecked={!!checkedTasks.has(task._id)}
          />
        </Col>
      );
    });
    return (
      <>
        <Container>
          <Row className="justify-content-center flex-column">
            <h1 className="text-center tracking-in-contract-bck">ToDo List</h1>
            <Button
              className="ml-auto mr-auto"
              onClick={this.toggleOpenAddTaskModal}
            >
              Task Modal
            </Button>
          </Row>
          <Row className="mt-5 justify-content-center">
            {tasksList.length ? (
              tasksList
            ) : (
              <h2 className="no__tasks slide-in-top">
                There are no tasks yet!
              </h2>
            )}
          </Row>
          <Row className="justify-content-center mt-5">
            <Button
              variant="danger"
              onClick={this.toggleConfirm}
              disabled={!!!checkedTasks.size}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faTrashAlt}
              ></FontAwesomeIcon>
              Delete selected tasks
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              onClick={this.handleCheckAllTasks}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faCheckSquare}
              ></FontAwesomeIcon>
              {checkedTasks.size === 0 ? "Check All" : "Remove Checked"}
            </Button>
          </Row>
        </Container>
        {isOpenModalTask && (
          <TasksModal
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
            isAnyTaskChecked={!!checkedTasks.size}
            isOpenModalTask={isOpenModalTask}
          />
        )}
        {!!editTask && (
          <TasksModal
            data={editTask}
            onSave={this.handleSave}
            onClose={() => this.toggleEditModal(null)}
          />
        )}

        {showConfirm && (
          <Confirm
            onSubmit={this.handleDeleteCheckedTasks}
            onClose={this.toggleConfirm}
            size={checkedTasks.size}
          />
        )}
        {
          loading && <Spinner />
        }
      </>
    );
  }
}

export default ToDo;
