import Styles from "./Task.module.css";

import { Card, Button, FormControl} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function Task({ task, index, removeTask }) {
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
        <FormControl type='checkbox' className={Styles.Card__checkbox}/>
        <Card.Text>
          {index + 1}. {task.title}
        </Card.Text>
        <Button variant="warning">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="danger" className="ml-3" onClick={(e) => removeTask(task._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Task;
