import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./ContactForm.module.css";
import Spinner from "../Spinner/Spinner";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

const inputsInfo = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
    label: "Your Name",
    controlId: "formBasicName",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email address",
    controlId: "formBasicEmail",
  },
  {
    name: "message",
    type: "null",
    placeholder: "Type Your Message",
    label: "Your Message",
    controlId: "formBasicTextarea",
    as: "textarea",
    rows: 3,
  },
];

const API_HOST = "http://localhost:3001";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    loading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };
  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    const { name, email, message } = this.state;
    const formData = {
      name: name,
      email: email,
      message: message,
    };
    fetch(`${API_HOST}/form`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          loading: false,
        });
        this.props.history.push('/')
      })
      .catch((error) => {
        console.log("Form error", error);
        this.setState({
            loading: false,
          });
      })
  };
  render() {
    const inputsJsx = inputsInfo.map((input, index) => {
      return (
        <Form.Group controlId={input.controlId} key={index}>
          <Form.Label>{input.label}</Form.Label>
          <Form.Control
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            as={input.as && input.as}
            value={this.state[input.name]}
            rows={input.rows && input.rows}
            onChange={this.handleChange}
          />
        </Form.Group>
      );
    });
    return (
      <>
        {this.state.loading && <Spinner />}
        <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {inputsJsx}

          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

ContactForm.propTypes = {
    history: PropTypes.object
}

export default withRouter(ContactForm);
