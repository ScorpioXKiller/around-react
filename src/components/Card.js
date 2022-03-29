const Card = (props) => {
  return (
    <li key={props} className="cards__item">
      <img
        className="cards__photo"
        src={`${props.card.link}`}
        alt={props.card.name}
        onClick={props.onClick}
      />

      <button
        className="button cards__delete-button"
        type="button"
        title="Delete"
        aria-label="delete"
      ></button>

      <div className="cards__content">
        <p className="cards__name">{props.card.name}</p>

        <div className="cards__like">
          <button
            className="button cards__like-button"
            type="button"
            title="Like"
            aria-label="like"
          ></button>
          <span className="cards__likes-amount"></span>
        </div>
      </div>
    </li>
  );
};

export default Card;
