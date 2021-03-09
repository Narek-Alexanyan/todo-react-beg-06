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
        <Card.Text>
          {index + 1}. {task.title}
        </Card.Text>
        <Button variant="warning" disabled={isAnyTaskChecked}>
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
  task: PropTypes.object,
  index: PropTypes.number,
  removeTask: PropTypes.func,
  handleToggleCheckTask: PropTypes.func,
  isAnyTaskChecked: PropTypes.bool,
  isChecked: PropTypes.bool
}

export default React.memo(Task);
