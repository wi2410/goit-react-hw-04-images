import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/index';
// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };
  return (
    <>
      <GalleryItem onClick={toggle}>
        <GalleryImage src={webformatURL} alt={tags} />
      </GalleryItem>
      {isOpen && <Modal toggle={toggle} image={largeImageURL} tags={tags} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
