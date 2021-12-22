import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = query => {
    setSearchQuery(query);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer />
    </>
  );
}

export default App;
