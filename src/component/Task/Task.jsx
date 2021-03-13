import React from "react";
import PropTypes from 'prop-types';

import Styles from "./Task.module.css";

import { Card, Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function Task({
  task,
  index,
  removeTask,
  handleToggleCheckTask,
  isAnyTaskChecked,
  isChecked,
  onEdit
}) {
  let addClass = () => {
    if (index % 2) {
      return Styles.card__bg1;
    } else {
      return Styles.card__bg2;
    }
  };



  const classes = [addClass()];
  if (isChecked) classes.push(Styles.checked);

  return (
    <Card className={classes.join(" ")}>
      <Card.Body>
        <FormControl
          type="checkbox"
          className={Styles.Card__checkbox}
          onChange={() => handleToggleCheckTask(task._id, isChecked)}
          checked={isChecked}
        />
        <Card.Title>{index + 1}. {task.title}</Card.Title>
        <Card.Text>
          {task.description}
        </Card.Text>
        <Button variant="warning" disabled={isAnyTaskChecked} onClick={()=> onEdit(task)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          variant="danger"
          className="ml-3"
          onClick={() => removeTask(task._id)}
          disabled={isAnyTaskChecked}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Body>
    </Card>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired,
  removeTask: PropTypes.func.isRequired,
  handleToggleCheckTask: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired
}

export default React.memo(Task);
