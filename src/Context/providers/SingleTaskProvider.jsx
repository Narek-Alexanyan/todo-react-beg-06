import { useState, useEffect } from "react";
import { SingleTaskContext } from "../context";
import { withRouter } from "react-router-dom";

const API_HOST = "http://localhost:3001";

function SingleTaskProvider(props) {
  const [singleTask, setSingleTask] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEditModal = () => {
    setIsEditModal(!isEditModal);
  };

  const handleEditTask = (editTask) => {
    setLoading(true);
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

        setSingleTask(data);
        setIsEditModal(false);
      })
      .catch((error) => {
        console.log("SingleTask ,Edit Task Request Error", error);
      })
      .finally(() => {
          setLoading(false);
      });
  };

  const handleDeleteTask = () => {
    const { _id } = singleTask;
    setLoading(true);
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log("SIngleTask Delete TAsk Request Error", error);
      });
  };

  useEffect(()=> {
      const { id } = props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        setSingleTask(data)
      })
      .catch((error) => {
        props.history.push("/errorPage");
        console.log("Single Task Get Request error", error);
      });
  }, [])


  const goBack = () => {
    props.history.go(-1);
  };
  return (
    <SingleTaskContext.Provider
      value={{
        singleTask,
        isEditModal,
        loading,
        toggleEditModal,
        handleEditTask,
        handleDeleteTask,
        goBack
      }}
    >
      {props.children}
    </SingleTaskContext.Provider>
  );
}

export default withRouter(SingleTaskProvider);
