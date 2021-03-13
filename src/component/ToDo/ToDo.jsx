import React, { Component } from "react";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import Task from "../Task/Task";
import idGenerator from "../../idGenerator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Button } from "react-bootstrap";

import "./ToDo.scss";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";


class ToDo extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "test-1",
        description: "TAsk 1 description",
      },
      {
        _id: idGenerator(),
        title: "test-2",
        description: "TAsk 2 description",
      },
      {
        _id: idGenerator(),
        title: "test-3",
        description: "TAsk 4 description",
      },
    ],
    checkedTasks: new Set(),
    isOpenModalTask: false,
    showConfirm: false,
    editTask: null,
  };
  ColStyles = ["mt-2", "mb-2", "slide-bottom"];

  handleSubmit = (value) => {
    const tasks = [
      ...this.state.tasks,
      {
        title: value,
        _id: idGenerator(),
      },
    ];
    this.setState({
      tasks,
    });
  };

  handleToggleCheckTask = (id, checked) => {
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
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => !checkedTasks.has(task._id));

    this.setState({
      tasks,
      checkedTasks: new Set(),
      showConfirm: false,
    });
  };

  removeTask = (_id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((task) => task._id !== _id);
    this.setState({
      tasks,
    });
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

  handleSubmit = (formData) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      ...formData,
      _id: idGenerator(),
    });
    this.setState({
      tasks,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  };

  toggleEditModal = (task) => {

    this.setState({
      editTask: task,
    });
  };

  handleSave = (editableTask) => {
    const tasks = [...this.state.tasks];

    let index = tasks.findIndex((task) => task._id === editableTask._id);

    tasks[index] = editableTask;

    this.setState({
      tasks,
    });
  };

  render() {
    const {
      checkedTasks,
      tasks,
      isOpenModalTask,
      showConfirm,
      editTask,
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
          <AddTaskModal
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
            isAnyTaskChecked={!!checkedTasks.size}
          />
        )}
        {/* {!!editTask || showConfirm ? (
          <ModalTasks
            data={editTask}
            onSave={this.handleSave}
            onClose={() => this.toggleEditModal(null)}
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
            isAnyTaskChecked={!!checkedTasks.size}
          />
        ) : (
          false
        )} */}

        {!!editTask && (
          <EditTaskModal
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
      </>
    );
  }
}

export default ToDo;
