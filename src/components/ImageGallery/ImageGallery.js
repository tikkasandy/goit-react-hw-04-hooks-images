import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.scss';
import imagesAPI from '../../services/images-api';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import CustomLoader from '../CustomLoader';
import Modal from '../Modal';

function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    if (query !== searchQuery) {
      reset();
    }
    console.log(searchQuery);
    const fetchImages = () => {
      setStatus('pending');

      imagesAPI
        .fetchImages(searchQuery, currentPage)
        .then(({ hits }) => {
          if (hits.length > 0) {
            console.log(hits);
            setImages(prevImages => [...prevImages, ...hits]);
            setStatus('resolved');
          } else {
            if (currentPage > 1) {
              return Promise.reject(new Error(`Show all images on you query.`));
            } else {
              return Promise.reject(
                new Error(`Images not found. Please enter a correct query.`),
              );
            }
          }
        })
        .catch(error => {
          setStatus('rejected');
          toast.error(error.message);
        });
    };

    fetchImages();
  }, [currentPage, searchQuery]);

  const handleImgClick = data => {
    setModalImage(data);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const changePage = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const reset = () => {
    setImages([]);
    setCurrentPage(1);
    setQuery(searchQuery);
    console.log('Reset');
  };

  // const { images, showModal, modalImage, status } = this.state;
  //const { largeImage, alt } = modalImage;
  return (
    <>
      {images.length > 0 && (
        <ul className={s.ImageGallery}>
          {images.map(({ id, largeImageURL, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              alt={tags}
              //largeImage={largeImageURL}
              openModal={handleImgClick}
            />
          ))}
        </ul>
      )}
      {/* {showModal && (
        // <Modal onClose={this.toggleModal} url={largeImage} alt={alt} />
      )} */}
      {status === 'resolved' && <Button onClick={changePage} />}
      {status === 'pending' && <CustomLoader />}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
