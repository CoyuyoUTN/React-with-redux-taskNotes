import { FaTrashAlt } from "react-icons/fa";
import DatePicker from "react-date-picker";
import { FcOk } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  changeCompleted,
  editTask,
} from "../features/tasks/tasksSlice";
import { RiEditLine } from "react-icons/ri";
import { Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";
const { confirm } = Modal;
const { Item } = Form;

const Task = ({ id, description, title, completed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      content: "This task will be eliminated",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        dispatch(deleteTask(id));
      },

      onCancel() {
        handleCancel();
        console.log("Cancel");
      },
    });
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [taskEdit, setTaskEdit] = useState({
    title: "",
    description: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setTaskEdit({ ...taskEdit, [name]: value });
  };
  const action = (id) => {
    dispatch(editTask({ ...taskEdit, id }));
    handleCancel();
  };

  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  return (
    <div
      key={id}
      className={
        completed
          ? "card card-4 animate__animated animate__fadeInDownBig"
          : "card card-completed animate__animated animate__heartBeat"
      }
    >
      <div className="noButtons-container">
        <div className="card__icon">
          <DatePicker
            onChange={onChange}
            value={value}
            disableCalendar={true}
            dayPlaceholder={"dd"}
            monthPlaceholder={"mm"}
            yearPlaceholder={"yyyy"}
          />
        </div>
        <h2 className="card__title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="buttons-container">
        <div
          onClick={() => dispatch(changeCompleted(id))}
          className="completed-button"
        >
          <FcOk />
        </div>

        <button
          type="button"
          className="card__exit"
          onClick={() => showDeleteConfirm(id)}
        >
          <i className="fas fa-times">
            <FaTrashAlt />
          </i>
        </button>

        <p className="card__edit">
          <Button type="primary" onClick={showModal}>
            <i className="fas fa-times">
              <RiEditLine />
            </i>
          </Button>
          <Modal
            title="Task Edit"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button onClick={handleCancel}>Cancelar</Button>,
              <Button type="primary" onClick={() => action(id)}>
                Enviar
              </Button>,
            ]}
            centered
          >
            <Form {...layout}>
              <Item label="Title">
                <Input name="title" onChange={handleChange} required />
              </Item>
              <Item label="Description">
                <Input name="description" onChange={handleChange} />
              </Item>
            </Form>
          </Modal>
        </p>
      </div>
    </div>
  );
};

export default Task;
