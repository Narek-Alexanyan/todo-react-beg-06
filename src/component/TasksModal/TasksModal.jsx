import React, { createRef } from "react";
import { Modal, Button, FormControl, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dateFormatter from '../../utils/dateFormatter';

import Styles from "./TasksModal.module.css";

class TasksModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
      errorMessage: false,
      ...props.data,
      date: props.data ? new Date(props.data.date) : new Date()
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
    const { title, description, date } = this.state;
    if (title === "" || description === "") {
      this.setState({
        errorMessage: true,
      });
      return;
    }

    const formData = {
      title,
      description,
      date: dateFormatter(date)
    };
    this.props.onSubmit(formData);
    this.props.onHide();
  };

  handleSave = () => {
    this.props.onSave(this.state);
    this.props.onClose();
  };

  setDate = (date) => {
    this.setState({
      date
    })
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { title, description, errorMessage, date } = this.state;
    const styles = [Styles.Alert__danger, Styles.slide__right];
    const {
      onHide,
      isAnyTaskChecked,
      data,
      isOpenModalTask,
      onClose,
    } = this.props;
    return (
      <>
        {isOpenModalTask && (
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
              {errorMessage && (
                <Alert className={styles.join(" ")} variant="danger">
                  {`${title === "" ? "title is empty!" : "Title it`s ok"} '-' ${
                    description === ""
                      ? "description is empty!"
                      : "Description it`s ok"
                  }`}
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
                <DatePicker selected={date} onChange={date => this.setDate(date)} />
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
        )}
        {data && (
          <Modal show={true} onHide={onClose} centered>
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
              <DatePicker selected={date} onChange={date => this.setDate(date)}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

TasksModal.propTypes = {
  isAnyTaskChecked: PropTypes.bool,
  onHide: PropTypes.func,
  data: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func,
  isOpenModalTask: PropTypes.bool,
};

export default TasksModal;
