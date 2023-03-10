import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Loader from './Loader';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);


  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, data]) => {
        setCards(cards);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  const handleEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsBigImagePopupOpen(true);
    setSelectedCard(card);
  }

  const handleDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })   
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    setSubmitIsLoading(true);
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => card._id !== c._id))
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitIsLoading(false);
    });
  }

  function handleUpdateUser(data) {
    setSubmitIsLoading(true);
    api.editProfileInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitIsLoading(false);
    });
  }

  function handleUpdateAvatar(data) {
    setSubmitIsLoading(true);
    api.changeAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitIsLoading(false);
    });
  }

  function handleAddPlaceSubmit(data) {
    setSubmitIsLoading(true);
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitIsLoading(false);
    });
  }

  const closeAllPopups = (e) => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsBigImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isBigImagePopupOpen || isConfirmDeletePopupOpen;

  useEffect(() => {
    function closeByEscape(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


  function handleOnOverlayClose(e) {
    if (e.target === e.currentTarget ) {
      closeAllPopups();
    }
  }

  if (isLoading) {
    return (
      <div className="root">
        <div className="page">
          <Header />
          <Loader isLoading={isLoading}/>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfile}
          onAddPlace={handleAddPlace}
          onEditAvatar={handleEditAvatar}
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          cards={cards}
          />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          onOverlayClose={handleOnOverlayClose} 
          isLoading={submitIsLoading}/>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          onOverlayClose={handleOnOverlayClose} 
          isLoading={submitIsLoading}/>
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClose={handleOnOverlayClose} 
          isLoading={submitIsLoading}/>
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          isLoading={submitIsLoading}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          onOverlayClose={handleOnOverlayClose}
          name="delete-card"
          title="???? ???????????????"
          size="size_s"
          text="????"
          card={selectedCard}
        />
        <ImagePopup
          card={selectedCard}
          name="big-image"
          isOpen={isBigImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOnOverlayClose} />
      </div>
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App;