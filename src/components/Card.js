function Card(props) {
  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <button type="button" aria-label="Удалить" className="element__delete"></button>
      <img className="element__image" src={card.link} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button type="button" aria-label="Лайк" className="element__like"></button>
          <span className="element__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
export default Card;