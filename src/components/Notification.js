import { useEffect } from "react";

function Notification({ color = "blue", message = "", onDismiss }) {
  useEffect(() => {
    // Auto-dismiss toast after 5 seconds
    const timer = setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 5000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      className="toast-container p-3 top-0 start-50 translate-middle-x"
      id="toastPlacement"
      data-original-class="toast-container p-3"
    >
      <div
        className="toast fade show"
        style={{ backgroundColor: color, filter: "opacity(90%)" }}
        onAnimationEnd={onDismiss}
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={onDismiss}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
