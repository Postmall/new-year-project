import React, {useState} from 'react';
import './Banners.css'

const importAll = (r) => r.keys().map(r);
const  images = importAll(require.context('../public/images/banners', false, /\.(png|jpe?g|svg)$/));
const Banners = () => {
  const [visibleRows, setVisibleRows] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesPerRow = 5;

  const closeModal = () => {
    setSelectedImage(null);
  }

  const showMoreImages = () => {
    setVisibleRows(visibleRows + 1);
  }

  const renderImages = () => {
    const visibleImages = images.slice(0, visibleRows * imagesPerRow);
    return visibleImages.map((image, index) => (
      <img
      key={index}
      src={image}
      alt=''
      className='gallery-image'
      onClick={() => setSelectedImage(image)}/>
    ))
  }
  return (
    <div className='image-gallery' style={{padding: "0 0 30px 0"}}>
      <div className='image-grid'>
        {renderImages()}
      </div>
      {visibleRows * imagesPerRow < images.length && (
        <button className='show-more-button' onClick={showMoreImages}>
          Больше фото<p className='more-icon'></p>
        </button>
      )}
      {selectedImage && (
        <div className='modal-window-image' onClick={closeModal}>
          <div style={{display: "flex"}}
          onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt=''
            className='modal-image'/>
            <p><button onClick={closeModal}
            className='modal-image-close-button'></button></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Banners
