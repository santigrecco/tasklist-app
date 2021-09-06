import { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const root = document.getElementById("modal-root");

function ModalFn({ children, defaultState = false }, ref) {
  const [show, setShow] = useState(defaultState);

  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide: () => setShow(false),
  }));

  return createPortal(
    show ? (
      <div className="modal-container" onClick={() => setShow(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    ) : null,
    root
  );
}

export const Modal = forwardRef(ModalFn);
