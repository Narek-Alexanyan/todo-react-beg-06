import React, { Component } from "react";

import Styles from "./AddTask.module.css";

import { Button, FormControl, Alert} from "react-bootstrap";


class AddTask extends Component {
  state = {
    inputValue: "",
    errorMessage: false,
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleClick = () => {
    if (this.state.inputValue === "") {
      this.setState({
        errorMessage: true,
      });
    } else {
      this.props.handleSubmit(this.state.inputValue);
      this.setState({
        errorMessage: false,
      });
    }

    this.setState({
      inputValue: "",
    });
  };

  

  render() {
    const styles = [Styles.Alert__danger, Styles.slide__right]
    return (
      <>
      {this.state.errorMessage && (
            <Alert className={ styles.join(' ') } variant="danger">
              Input value is empty!
            </Alert>
        )}
      <div className={Styles.addTask}>
        <FormControl
          aria-describedby="basic-addon1"
          placeholder="Write Task"
          aria-label="Write Task"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <Button variant="outline-primary" onClick={this.handleClick}>
          Add Task
        </Button>
      </div>
      </>
    );
  }
}

export default AddTask;
