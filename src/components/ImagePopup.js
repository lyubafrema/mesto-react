function ImagePopup({ card, name, isOpen, onClose }) {

  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup`}>
      <figure className="big-image">
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        <img className="big-image__image" src={card.link} alt={card.name} />
        <figcaption className="big-image__title">{card.name}</figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup;