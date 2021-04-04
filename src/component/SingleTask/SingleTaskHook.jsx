import { SingleTaskContext } from '../../Context/context';
import styles from "./singleTask.module.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../component/TasksModal/TasksModal";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import { useContext } from 'react';

function SingleTaskHook() {
    const context = useContext(SingleTaskContext);
    const {
        singleTask,
        isEditModal,
        loading,
        toggleEditModal,
        handleEditTask,
        handleDeleteTask,
        goBack
    } = context;

    
    if (!singleTask || loading) return <Spinner />;
    return (
    
      <div className={styles.singleTask}>
        <Button onClick={goBack}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
          Go Back
        </Button>
        <h1>SingleTask</h1>
        <div className={styles.singleTaskSection}>
          <p>
            <strong>Title :</strong> {singleTask.title}
          </p>
          <p>
            <strong>Description :</strong>
            {singleTask.description}
          </p>
          <div>
            <Button variant="danger" onClick={handleDeleteTask}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              variant="warning"
              className="ml-3"
              onClick={toggleEditModal}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        </div>
        {isEditModal && (
          <TaskModal
            data={singleTask}
            onSave={handleEditTask}
            onClose={() => toggleEditModal(null)}
          />
        )}
      </div>
    )
  }
  SingleTaskHook.propTypes = {
    history: PropTypes.object,
  };

export default SingleTaskHook;
