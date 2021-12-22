import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

function ImageGalleryItem({ image, alt, openModal, largeImage }) {
  return (
    <li className={s.mageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={image}
        alt={alt}
        onClick={() => openModal({ largeImage, alt })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
