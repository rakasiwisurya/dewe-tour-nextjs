import React from "react";
import { Button, Modal, ModalProps } from "react-bootstrap";

const ModalLogin = ({ onHide, onSwitch, ...rest }: ModalProps & { onSwitch: () => void }) => {
  return (
    <Modal {...rest} onHide={onHide} centered>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
