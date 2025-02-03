export default function Notification({
  color = "blue",
  message = "",
  show = false,
}) {
  return (
    <div
      class="toast-container p-3 top-0 start-50 translate-middle-x"
      id="toastPlacement"
      data-original-class="toast-container p-3"
    >
      <div
        className={`toast fade ${show ? "show" : ""}`}
        style={{ backgroundColor: color }}
      >
        <div class="d-flex">
          <div class="toast-body">{message}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
