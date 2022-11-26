import { Image, ModalBody, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, tags, toggle }) => {
  const onKeyDown = useCallback(
    e => {
      if (e.code !== 'Escape') {
        return;
      }
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const clickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  return createPortal(
    <Overlay onClick={clickOnBackdrop}>
      <ModalBody>
        <Image src={image} alt={tags} />
      </ModalBody>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.string,
};
