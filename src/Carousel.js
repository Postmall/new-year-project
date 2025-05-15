import React, {useRef, useState, useEffect} from 'react'
import './Carousel.css'


const importAll = (r) => r.keys().map(r);
const  images = importAll(require.context('../public/images', false, /\.(png|jpe?g|svg)$/));

const Carousel = ({direction}) => {
    const carouselRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const requestIdRef = useRef(null);
    const startPositionRef = useRef(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const closeModal = () => {
        setSelectedImage(null);
    }

    useEffect(() => {
        const carousel = carouselRef.current;
    
        const animate = () => {
            if (!isHovered) {
                // Прокрутка вправо или влево
                startPositionRef.current += direction === 'left' ? -0.3 : 0.3;
    
                // Ограничиваем прокрутку по ширине карусели
                if (startPositionRef.current >= carousel.scrollWidth) {
                    startPositionRef.current = 0;
                } else if (startPositionRef.current < 0) {
                    startPositionRef.current = carousel.scrollWidth - carousel.clientWidth;
                }
    
                // Прокручиваем
                carousel.scrollLeft = startPositionRef.current;
            }
            requestIdRef.current = requestAnimationFrame(animate);
        };
    
        // Стартуем анимацию
        requestIdRef.current = requestAnimationFrame(animate);
    
        return () => cancelAnimationFrame(requestIdRef.current);
    }, [direction, isHovered]);
    

  return (
    <div
    className='carousel-container'
    ref={carouselRef}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <div className='carosel-content'>
            {images.map((image, index) => (
                <img key={index} src={image} className='carousel-image'
                onClick={() => setSelectedImage(image)}/>
            ))}
        </div>
        {selectedImage && (
            <div className='modal-window-image' onClick={closeModal}>
                <div style={{ display: "flex" }}
                onClick={(e) => e.stopPropagation()}>
                    <img src={selectedImage} alt='' className='modal-image'/>
                    <p><button onClick={closeModal}
                    className='modal-image-close-button'></button></p>
                </div>
            </div>
        )}
      
    </div>
  )
}

export default Carousel
