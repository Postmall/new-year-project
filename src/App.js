import React, {useState, useEffect, useRef} from "react";
import ModalWindow from './ModalWindow';
import AllGallery from "./AllGallery";
import Banners from "./Banners";
import RoomInside from "./RoomInside";
import PlaceOutside from "./PlaceOutside";
import DinningRoom from "./DinningRoom";
import Review from "./Review";

function App() {

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderComponent = () => {
    switch (selectedCategory) {
      case 'All':
        return <AllGallery/>;
      case 'Banners':
        return <Banners/>;
      case 'RoomInside':
        return <RoomInside/>;
      case 'PlaceOutside':
        return <PlaceOutside/>;
      case 'DinninRoom':
        return <DinningRoom/>;
      default:
        return <AllGallery/>;
    }
  }

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const conteinerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviws = [
    <Review key={1} name='Владислав М.' text='Очень понравилось, отличная база, территория чистая, расположена в лесу,
    в дали от дороги. В домиках, убрано, шикарное, белоснежное постельное белье, полотенца. В каждом домике посуда,
    по количеству людей. Микроволновка, холодильник. Приветливые, хозяева. Все расскажут, посоветуют куда сходить,
    поехать. Помогут, если необходимо. Вечером можно потанцевать, попеть караоке.'/>,
    <Review key={2} name='Владислав М.' text='Все очень понравилось. Чистые уютные домики со всеми удобствами, зоны отдыха,
    мангальная, отдельно кухня. База находится в лесу. Очень гостиприимные хозяева Алексей и Светлана.
    Посоветовали много интересных мест, что можно было посмотреть в Архызе. Если собирусь еще приехать,
    то обязательно остановлюсь на турбазе "Счастливые люди"'/>,
    <Review key={3} name='Владислав М.' text='Отличная база отдыха в лесу, новые уютные домики. Очень чисто и тихо!
    В каждом домике терраса, на территории детская площадка, батут, места для отдыха с очагом. Приветливые хозяева. 
    Осталось хорошее впечатление от отдыха.'/>,
  ];

  const visibleReviews = 3;
  const handleScroll = () => {
    const box = conteinerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = width;
      box.style.scrollBehavior = 'smooth';
    }
  }

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  /*useEffect(() => {
    const box = conteinerRef.current;
    const firstReview = box.querySelector('.review-card');
    reviewWidthRef.current = firstReview.clientWidth();
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListner('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    }
  }, []);*/

  return (
    <div>
      <header>
        <div className="menu">
          <a className="link">O нас</a>
          <a className="link">Услуги</a>
          <a className="link">Медиа</a>
          <a className="link">Отзывы</a>
          <a className="link">Информация</a>
        </div>
  
        <button onClick={handleOpenModal} className="btn"> Забронировать</button>
        <ModalWindow show={showModal} onClose={handleCloseModal}>
          <h2>Контакты</h2>
          <p></p>
          <p>Забронировать через сервис Бронируй.онлайн</p>
        </ModalWindow>

        <a href="https://www.instagram.com/schastlivie_ludi_arhiz/" target="_blank"
        className="icon telegram"></a>
        <a href="https://www.instagram.com/schastlivie_ludi_arhiz/" target="_blank"
        className="icon instagram"></a>
      </header>

      <div className="welcome-block">
        <div className="first-block">
          <h1> <span className="title">Счастливые люди</span></h1>
          <h2 style={{marginBottom: '7%', marginTop: '7%'}}>Комфорт, природа и активный отдых вдали от суеты.</h2>
        </div>
        <div className="welcome-image-block">
          <div className="welcome-image-"></div>
        </div>
      </div>

      <div className="service-block" draggable="false">
        <h1 style={{fontSize:"46px"}}>НАШИ УСЛУГИ</h1>
        <div style={{display:"flex"}}>
          <p className="tag">< p className="tag-icon"/>
          Трансфер</p>
          <p className="tag">< p className="tag-icon"/>
          Экскурсионные прогулки</p>
          <p className="tag">< p className="tag-icon"/>
          Мангальная зона</p>
          <p className="tag">< p className="tag-icon"/>
          Кухонная зона</p>
        </div>
      </div>
      <div className="media-block">
        <h1 className="main-title">Медиа</h1>
        <div style={{display: "flex", justifyContent:"center", marginBottom: "20px"}}>
          <p className={`tag ${selectedCategory === 'All' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('All')}>Все фотографии</p>
          <p className={`tag ${selectedCategory === 'Banners' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('Banners')}>Люкс номер внутри</p>
          <p className={`tag ${selectedCategory === 'RoomInside' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('RoomInside')}>Номер внутри</p>
          <p className={`tag ${selectedCategory === 'PlaceOutside' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('PlaceOutside')}>База</p>
          <p className={`tag ${selectedCategory === 'DinningRoom' ? 'selected' : ''}`}
          onClick={() => setSelectedCategory('DinningRoom')}>Столовая и остальные помещения</p>
        </div>
        <div className="content" style={{marginLeft: "-5vw", 
        marginRight: "-5vw"}}>
            {renderComponent()}
        </div>
      </div>

      <div className="review-block">
        <h1>ОТЗЫВЫ</h1>
        <p className="description">Больше отзывов <a>здесь</a></p>
        <div className="review-carousel">
          <div className="review-container" ref={conteinerRef}>
            {reviws.slice(-visibleReviews)}
            {reviws}
            {reviws.slice(0, visibleReviews)}
          </div>
        </div>
        <div>
          
        </div>
      </div>

      <div className="information-block">
        <h1 style={{fontSize: "46px", paddingBottom:"20px"}}>ИНФОРМАЦИЯ</h1>
        <ol className="information-points">
          <li className="point">Доступ в интернет: на всей территории</li>
          <li className="point">Проживание с животными (по договорённости)</li>
          <li className="point">Прачечная</li>
          <li className="point">Общая кухня</li>
          <li className="point">Время заезда: 14:00</li>
          <li className="point">Время выезда: 12:00</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
