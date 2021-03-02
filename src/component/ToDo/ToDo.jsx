import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import idGenerator from "../../idGenerator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col, Button } from "react-bootstrap";

import "./ToDo.scss";

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
  };
  ColStyles = ["mt-2", "mb-2", "slide-bottom"];

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      title: value,
      _id: idGenerator(),
    });
    this.setState({
      tasks,
    });
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
    const { checkedTasks } = this.state;
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => !checkedTasks.has(task._id));

    this.setState({
      tasks,
      checkedTasks: new Set(),
    });
  };

  removeTask = (_id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter((task) => task._id !== _id);
    this.setState({
      tasks,
    });
  };

  render() {
    const { checkedTasks, tasks } = this.state;
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
            isAnyTaskChecked={!!checkedTasks.size}
            isChecked={!!checkedTasks.has(task._id)}
          />
        </Col>
      );
    });
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center tracking-in-contract-bck">ToDo List</h1>
            <AddTask
              handleSubmit={this.handleSubmit}
              isAnyTaskChecked={!!checkedTasks.size}
            />
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          {tasksList.length ? tasksList : <h2>There are no Tasks !</h2>}
        </Row>
        <Row className="justify-content-center mt-5">
          <Button
            variant="danger"
            onClick={this.handleDeleteCheckedTasks}
            disabled={!!!checkedTasks.size}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
            Delete selected tasks
          </Button>
        </Row>
      </Container>
    );
  }
}
export default ToDo;
