import React, { Component } from "react";
import styles from "./singleTask.module.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../component/TasksModal/TasksModal";



const API_HOST = "http://localhost:3001";

class SingleTask extends Component {
  state = {
    singleTask: null,
    isEditModal: false,
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  handleEditTask = (editTask) => {
    const formData = {
      title: editTask.title,
      description: editTask.description,
    }
    fetch(`${API_HOST}/task/${editTask._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        
        this.setState({
          singleTask: data,
          isEditModal: false,
        });
      })
      .catch((error) => {
        console.log("SingleTask ,Edit Task Request Error", error);
      });
  };

  handleDeleteTask = () => {
    const { _id } = this.state.singleTask;
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("SIngleTask Delete TAsk Request Error", error);
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("Single Task Get Request error", error);
      });
  }
  render() {
    const { singleTask, isEditModal } = this.state;
    if (!singleTask)
      return (
        <div className={styles.loader__wrapper}>
          <svg
            className={styles.loader}
            version="1.1"
            id="L7"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
          >
            <path
              fill="#000"
              d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="2s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
            <path
              fill="#000"
              d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="-360 50 50"
                repeatCount="indefinite"
              />
            </path>
            <path
              fill="#000"
              d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="2s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      );
    return (
      <div className={styles.singleTask}>
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
            <Button variant="danger" onClick={this.handleDeleteTask}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              variant="warning"
              className="ml-3"
              onClick={this.toggleEditModal}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        </div>
        {isEditModal && (
          <TaskModal
            data={singleTask}
            onSave={this.handleEditTask}
            onClose={() => this.toggleEditModal(null)}
          />
        )}
      </div>
    );
  }
}

export default SingleTask;
