import React, { Component } from "react";
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

const API_HOST = "http://localhost:3001";

class SingleTask extends Component {
  state = {
    singleTask: null,
    isEditModal: false,
    loading: false,
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  handleEditTask = (editTask) => {
    this.setState({
      loading: true,
    });
    const formData = {
      title: editTask.title,
      description: editTask.description,
    };
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
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleDeleteTask = () => {
    const { _id } = this.state.singleTask;
    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log("SIngleTask Delete TAsk Request Error", error);
      });
  };

  goBack = () => {
    this.props.history.go(-1);
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
        this.props.history.push("/404");
        console.log("Single Task Get Request error", error);
      });
  }
  render() {
    const { singleTask, isEditModal, loading } = this.state;
    if (!singleTask || loading) return <Spinner />;
    return (
      <div className={styles.singleTask}>
        <Button onClick={this.goBack}>
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

SingleTask.propTypes = {
  history: PropTypes.object,
};

export default SingleTask;
