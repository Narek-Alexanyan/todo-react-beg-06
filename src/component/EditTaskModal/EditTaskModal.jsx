import React, { Component } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import Styles from './EditTaskModal.module.css'

class EditTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = () => {
      this.props.onSave(this.state)
      this.props.onClose()
  }

  render() {
      const {title, description} = this.state
    return (
      <Modal show={true} onHide={this.props.onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
              name="title"
              placeholder="Write Title"
              aria-label="Write Title"
              value={title}
              onChange={this.handleChange}
              onKeyPress={this.keyPress}
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
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

export default EditTaskModal;
