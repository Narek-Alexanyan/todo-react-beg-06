import React, {memo} from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";

import PropTypes from 'prop-types';

function Confirm(props) {
  return (
    <Modal show={true} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <ModalTitle style={{color: '#dc3545'}}>Are you sure to remove {props.size} task(s)</ModalTitle>
      </Modal.Header>
      <ModalBody>
        if you delete these tasks, you will no longer be able to return them!
      </ModalBody>
      <ModalFooter>
          <Button variant="outline-danger" onClick={props.onSubmit}>
              Remove
          </Button>
          <Button variant="outline-secondary" onClick={props.onClose}>
              Close
          </Button>
      </ModalFooter>
    </Modal>
  );
}

Confirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default memo(Confirm);
