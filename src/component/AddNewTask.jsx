import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

class AddNewTask extends Component {
  state = {
    inputValue: "",
    taskList: [],
    errorMessage: false,
  };

  handleChange = (event) => {
    const { handleSubmit } = this.props;
    handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: event.target.value,
    });
  };
  handleClick = () => {
    const taskList = [...this.state.taskList];
    if (this.state.inputValue === "") {
      this.setState({
        errorMessage: true,
      });
    } else {
      taskList.push(this.state.inputValue);
      this.setState({
        errorMessage: false,
      });
    }
    this.setState({
      taskList,
      inputValue: "",
    });
  };

  render() {
    const taskListJsx = this.state.taskList.map((item, index) => {
      return (
        <div className="todo__list" key={index}>
          <p>
            {index + 1}. {item}
          </p>
        </div>
      );
    });

    return (
      <Paper elevation={3} className="paper">
          {this.state.errorMessage && <Alert className="alert" severity="error">
            Input value is empty!
          </Alert>
          }
        <TextField
          id="outlined-basic"
          label="Task"
          variant="outlined"
          placeholder="Write Task"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <Button className="btn" variant="outlined" color="primary" onClick={this.handleClick}>
          Add Task
        </Button>
        {taskListJsx}
      </Paper>
    );
  }
}

export default AddNewTask;
