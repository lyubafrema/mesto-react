import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace, onOverlayClose}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  } 

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name,
      link
    });

    setTimeout(() => {
      setName('')
      setLink('')
    }, 2000);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
      size="size_l"
      text="Создать">
        <>
          <div className="popup__input-container popup__input-container_top">
            <input id="title-input" type="text" name="title" placeholder="Название"
                className="popup__input popup__input_type_title" minLength="2" maxLength="30" required value={name} onChange={handleChangeName}/>
            <span className="title-input-error popup__input-error"></span>
          </div>
          <div className="popup__input-container popup__input-container_bottom">
            <input id="link-input" type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_src" required value={link} onChange={handleChangeLink}/>
            <span className="link-input-error popup__input-error"></span>
          </div>
        </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;