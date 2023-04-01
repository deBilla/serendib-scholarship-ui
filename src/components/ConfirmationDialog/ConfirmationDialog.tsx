import { Button, Modal } from "react-bootstrap";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel?: () => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationDialog = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  show,
  setShow,
}: ConfirmationDialogProps) => {
  const handleClose = () => {
    setShow(false);
    if (onCancel) onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
