import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import idGenerator from "../../idGenerator";

import { Container, Row, Col } from "react-bootstrap";

import "./ToDo.scss";

class ToDo extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "Text 1",
      },
    ],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      title: value,
      _id: idGenerator()
    });
    this.setState({
      tasks,
    });
  };

  removeTask = (_id) => {
    let tasks = [...this.state.tasks];

    tasks = tasks.filter(task => task._id !== _id);

    this.setState({
      tasks
    })
  }

  render() {
    const tasksList = this.state.tasks.map((task, index) => {
      return (
        <Col className="mt-2 mb-2" key={task._id} xs={12} sm={6} md={4} lg={3}>
          <Task task={task} index={index} removeTask={this.removeTask}/>
        </Col>
      );
    });
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">ToDo List</h1>
            <AddTask handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">{tasksList}</Row>
      </Container>
    );
  }
}
export default ToDo;
