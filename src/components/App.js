import { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// Спасибо за ревью и "можно лучше", их всегда жду)

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsBigImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfile}
          onAddPlace={handleAddPlace}
          onEditAvatar={handleEditAvatar}
          onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          size="size_l"
          text="Сохранить">
          <>
            <div className="popup__input-container popup__input-container_top">
              <input id="name-input" type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_name"
                minLength="2" maxLength="40" required />
              <span className="name-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container popup__input-container_bottom">
              <input id="caption-input" type="text" name="about" placeholder="О себе"
                className="popup__input popup__input_type_caption" minLength="2" maxLength="200" required />
              <span className="caption-input-error popup__input-error"></span>
            </div>
          </>
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          size="size_m"
          text="Сохранить">
          <div className="popup__input-container popup__input-container_top">
            <input id="avatar-input" type="url" name="avatar" placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_avatar" required />
            <span className="avatar-input-error popup__input-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          size="size_l"
          text="Создать">
          <>
            <div className="popup__input-container popup__input-container_top">
              <input id="title-input" type="text" name="title" placeholder="Название"
                className="popup__input popup__input_type_title" minLength="2" maxLength="30" required />
              <span className="title-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container popup__input-container_bottom">
              <input id="link-input" type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_src" required />
              <span className="link-input-error popup__input-error"></span>
            </div>
          </>
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          onClose={closeAllPopups}
          size="size_s"
          text="Да" />
        <ImagePopup
          card={selectedCard}
          name="big-image"
          isOpen={isBigImagePopupOpen}
          onClose={closeAllPopups} />
      </div>
    </div>
  )
}

export default App;
