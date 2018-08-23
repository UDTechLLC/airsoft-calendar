import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from './../../components/common';
import Aux from '../Aux/Aux';

const WithModalWrapper = props => (
  <Aux>
    <Modal
      show={!!props.modalContent}
      modalClosed={props.hideModal}
    >
      {props.modalContent}
    </Modal>
    {props.children}
  </Aux>
);

WithModalWrapper.propTypes = {
  modalContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node
};

WithModalWrapper.defaultProps = {
  modalContent: null,
  children: <div />
};

export default WithModalWrapper;
