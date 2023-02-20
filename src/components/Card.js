function Card({ cards, onCardClick }) {

  function handleClick(e) {
    const cardElem = {
      link: e.target.src,
      name: e.target.alt,
      alt: e.target.alt,
    };
    onCardClick(cardElem);
  }

  // попробовала вынести маппинг сюда, не знаю насколько верно реализовала, но в целом работает)
  // handleClick соответственно тоже изменила выше

  const cardsElements = cards.map((card) => {
    return <article className="element" key={card._id}>
      <button type="button" aria-label="Удалить" className="element__delete"></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button type="button" aria-label="Лайк" className="element__like"></button>
          <span className="element__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  }
  )

  return (
    <section className="elements">
      {cardsElements}
    </section>
  )
}
export default Card;