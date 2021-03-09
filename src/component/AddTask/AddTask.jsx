import React, { Component } from "react";
import PropTypes from 'prop-types';

import Styles from "./AddTask.module.css";

import { Button, FormControl, Alert } from "react-bootstrap";

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

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
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
    const { isAnyTaskChecked } = this.props;
    const styles = [Styles.Alert__danger, Styles.slide__right];
    return (
      <>
        {this.state.errorMessage && (
          <Alert className={styles.join(" ")} variant="danger">
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
            onKeyPress={this.keyPress}
            disabled={isAnyTaskChecked}
          />
          <Button
            variant="outline-primary"
            onClick={this.handleClick}
            disabled={isAnyTaskChecked}
          >
            Add Task
          </Button>
        </div>
      </>
    );
  }
}

AddTask.protoTypes = {
  handleSubmit: PropTypes.func,
  isAnyTaskChecked: PropTypes.bool
}

export default AddTask;
