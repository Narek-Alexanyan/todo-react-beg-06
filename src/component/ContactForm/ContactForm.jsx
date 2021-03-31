import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./ContactForm.module.css";
import Spinner from "../Spinner/Spinner";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  isRequired,
  maxLength,
  minLength,
  validateEmail,
} from "../../utils/validators";

const maxLength30 = maxLength(30);
const minLength1 = minLength(1);

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
    name: {
      valid: false,
      error: null,
      value: "",
    },
    email: {
      valid: false,
      error: null,
      value: "",
    },
    message: {
      valid: false,
      error: null,
      value: "",
    },
    loading: false,
    errorMessage: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    let valid = true;

    let error =
      isRequired(value) ||
      maxLength30(value) ||
      minLength1(value) ||
      (name === "email" && validateEmail(value));
    if (error) valid = false;

    this.setState({
      [name]: {
        valid: valid,
        error: error,
        value: value,
      },
    });
  };

  handleSubmit = () => {
    const formData = {
      ...this.state,
    };
    for (let key in formData) {
      if (
        typeof formData[key] === "object" &&
        formData[key].hasOwnProperty("value")
      ) {
        formData[key] = formData[key].value;
      } else {
        delete formData[key];
      }
    }

    this.setState({
      loading: true,
      errorMessage: null,
    });

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
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("Form error", error);
        this.setState({
          loading: false,
          errorMessage: error.message,
        });
      });
  };


  render() {
    const { name, email, message } = this.state
    const inputsJsx = inputsInfo.map((input, index) => {
      return (
        <Form.Group controlId={input.controlId} key={index}>
          <Form.Label>{input.label}</Form.Label>
          <Form.Control
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            as={input.as && input.as}
            value={this.state[input.name].value}
            rows={input.rows && input.rows}
            onChange={this.handleChange}
          />
          <Form.Text className={styles.form__invalid_text}>
            {this.state[input.name].error}
          </Form.Text>
        </Form.Group>
      );
    });
    return (
      <>
        {this.state.loading && <Spinner />}
        <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {this.state.errorMessage && (
            <h3 className={styles.slideInTop}>
              {this.state.errorMessage.slice(6)}
            </h3>
          )}
          {inputsJsx}

          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
            disabled={name.error || 
              email.error ||
              message.error
            }
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

ContactForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ContactForm);
