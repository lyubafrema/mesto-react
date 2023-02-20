import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(cards);
      })
  }, [])

  return (
    <main className="content">
      <div className="spinner"></div>
      <div className="container">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__overlay" onClick={onEditAvatar}>
              <img className="profile__avatar" alt="Фото профиля." src={userAvatar} />
            </div>
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__caption">{userDescription}</p>
            </div>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <Card cards={cards} onCardClick={onCardClick} />
      </div>
    </main>
  )
}

export default Main;