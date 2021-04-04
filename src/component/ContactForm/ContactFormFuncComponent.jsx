import { Form, Button } from "react-bootstrap";
import styles from "./ContactForm.module.css";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import { withRouter } from "react-router";
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

function ContactFormFuncComponent(props) {
  const [form, setForm] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let valid = true;

    let error =
      isRequired(value) ||
      maxLength30(value) ||
      minLength1(value) ||
      (name === "email" && validateEmail(value));
    if (error) valid = false;

    setForm({
      ...form,
      [name]: {
        valid: valid,
        error: error,
        value: value,
      },
    });
  };
  const handleSubmit = () => {
    setErrorMessage(null);
    setLoading(true);
    const formData  = {
        ...form
    }

    for (let key in formData) {
        formData[key] = formData[key].value
      } 

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
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        console.log("Form error", error);
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  const { name, email, message } = form;
  const inputsJsx = inputsInfo.map((input, index) => {
    return (
      <Form.Group controlId={input.controlId} key={index}>
        <Form.Label>{input.label}</Form.Label>
        <Form.Control
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          as={input.as && input.as}
          value={[input.name].value}
          rows={input.rows && input.rows}
          onChange={handleChange}
          required
          isInvalid={!form[input.name].value}
        />
        
        <Form.Text className={styles.form__invalid_text}>
          {form[input.name].error}
        </Form.Text>
      </Form.Group>
    );
  });

  return (
    <>
      {loading && <Spinner />}
      <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {errorMessage && (
          <h3 className={styles.slideInTop}>{errorMessage.slice(6)}</h3>
        )}
        {inputsJsx}

        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
            disabled={name.error || email.error || message.error}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default withRouter(ContactFormFuncComponent);
