const ImagePopup = (props) => {
  return (
    <section
      className={`popup popup_type_imagePopup ${
        props.selectedCard.isCardOpen ? "popup_visible" : ""
      }`}
    >
      <div className="popup__page-overlay" onClick={props.onClose}></div>

      <div className="card-popup__container">
        <button
          className="button popup__close-button card-popup__close-button"
          type="button"
          title="Close"
          aria-label="close"
          onClick={props.onClose}
        ></button>

        <img
          className="card-popup__image"
          src={props.selectedCard.link}
          alt="Place"
        />

        <h2 className="card-popup__name">{props.selectedCard.title}</h2>
      </div>
    </section>
  );
};

export default ImagePopup;
