import React, { createRef } from "react";
import { Modal, Button, FormControl, Alert } from "react-bootstrap";

import PropTypes from 'prop-types';

import Styles from "./AddTaskModal.module.css";

class AddTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
      errorMessage: false,
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  };

  handleClick = () => {
    const { title, description } = this.state;
    if (title === "" || description === "") {
      this.setState({
        errorMessage: true,
      });
      return;
    }

    const formData = {
      title,
      description,
    };
    this.props.onSubmit(formData);
    this.props.onHide();
  };
  componentDidMount() {
    this.inputRef.current.focus();
  }
  render() {
    const { onHide, isAnyTaskChecked } = this.props;
    const { title, description } = this.state;
    const styles = [Styles.Alert__danger, Styles.slide__right];

    return (
      <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Task Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errorMessage && (
            <Alert className={styles.join(" ")} variant="danger">
              {`${title === '' ? 'title is empty!' : 'Title it`s ok'} '-' ${description === '' ? 'description is empty!' : 'Description it`s ok'}`}
            </Alert>
          )}
          <div className={Styles.addTask}>
            <FormControl
              name="title"
              placeholder="Write Title"
              aria-label="Write Title"
              value={title}
              onChange={this.handleChange}
              onKeyPress={this.keyPress}
              disabled={isAnyTaskChecked}
              ref={this.inputRef}
            />
            <FormControl
              className={Styles.area}
              name="description"
              as="textarea"
              placeholder="Write Description"
              aria-label="Write Description"
              value={description}
              onChange={this.handleChange}
              disabled={isAnyTaskChecked}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button
            variant="outline-primary"
            onClick={this.handleClick}
            disabled={isAnyTaskChecked}
          >
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddTaskModal.propTypes = {
    isAnyTaskChecked: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
}

export default AddTaskModal;
