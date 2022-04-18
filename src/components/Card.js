import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUserContext = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUserContext._id;
  const isLiked = props.card.likes.some(
    (user) => user._id === currentUserContext._id
  );

  const handleLike = () => {
    props.onLike(props.card, isLiked);
  };

  const handleDelete = () => {
    props.onDelete(props.card._id);
  };

  return (
    <li key={props} className="cards__item">
      <img
        className="cards__photo"
        src={`${props.card.link}`}
        alt={props.card.name}
        onClick={() =>
          props.onClick({ link: props.card.link, name: props.card.name })
        }
      />

      {isOwn && (
        <button
          className="button cards__delete-button"
          type="button"
          title="Delete"
          aria-label="delete"
          onClick={handleDelete}
        ></button>
      )}

      <div className="cards__content">
        <p className="cards__name">{props.card.name}</p>

        <div className="cards__like">
          <button
            className={`button cards__like-button ${
              isLiked ? "cards__like-button_active" : ""
            }`}
            type="button"
            title="Like"
            aria-label="like"
            onClick={handleLike}
          ></button>
          <span className="cards__likes-amount"></span>
        </div>
      </div>
    </li>
  );
};

export default Card;
