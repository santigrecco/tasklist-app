import { func, shape, string } from "prop-types";
import "./Task.scss";
import { Modal } from "../Modal/Modal";
import { useRef } from "react";
import { taskService } from "../../services/Task";

export function Task({ task, onComplete }) {
  const { _id, title } = task;
  const modal = useRef(null);

  function taskClicked() {
    modal.current.show();
  }

  async function completeTask() {
    await taskService.completeTask(task);
    modal.current.hide();
    onComplete();
  }

  return (
    <>
      <div className="task" onClick={taskClicked}>
        <p className="id">Task# {_id}</p>
        <p className="title">{title}</p>
      </div>
      <Modal ref={modal}>
        <div className="task task-modal">
          <div className="data">
            <div className="id">Task#{_id}</div>
            <div className="title">{title}</div>
          </div>
          <div className="actions">
            <button className="complete" onClick={completeTask}>
              Complete
            </button>
            <button onClick={() => modal.current.hide()}>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

Task.propTypes = {
  task: shape({
    _id: string.isRequired,
    title: string.isRequired,
  }),
  onComplete: func,
};
