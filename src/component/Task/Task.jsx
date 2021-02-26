import Styles from "./Task.module.css";

import { Card } from "react-bootstrap";

function Task({ task, index }) {
  let addClass = () => {
    if (index % 2) {
      return Styles.card__bg1;
    } else {
      return Styles.card__bg2;
    }
  };

  return (
    <Card className={addClass()}>
      <Card.Body>
        <Card.Text>
          {index + 1}. {task}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Task;
