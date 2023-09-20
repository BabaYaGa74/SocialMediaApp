import "./ConfirmationCard.scss";

function ConfirmationCard({ onConfirm, onCancel, text }) {
  return (
    <div className="wrapper">
      <div className="confirmation-card">
        <p>Are you sure you want to {text}?</p>
        <div className="actions">
          <button onClick={onConfirm} className="confirm">
            Yes
          </button>
          <button onClick={onCancel} className="cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCard;
