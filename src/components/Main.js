import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
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
        <section className="elements">
          {
            cards.map((card) =>
              <Card card={card} onCardClick={onCardClick} />
            )
          }
        </section>
      </div>
    </main>
  )
}

export default Main;