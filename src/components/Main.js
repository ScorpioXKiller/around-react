import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatarEditButton from "../images/ui/avatar-edit-button.svg";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

const Main = (props) => {
  const currentUserContext = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUserContext.avatar})` }}
        >
          <div className="profile__avatar-overlay">
            <img
              id="avatar-edit"
              className="profile__avatar-edit-button"
              src={avatarEditButton}
              alt="Edit button"
              onClick={props.onEditAvatarClick}
            />
          </div>
        </div>

        <div className="profile__info-container">
          <div className="profile__info">
            <h1 className="profile__name">{currentUserContext.name}</h1>

            <button
              className="button profile__edit-button"
              type="button"
              id="info-edit"
              title="Edit profile"
              aria-label="edit"
              onClick={props.onEditProfileClick}
            ></button>

            <p className="profile__about">{currentUserContext.about}</p>
          </div>

          <button
            className="button profile__add-button"
            type="button"
            id="add"
            title="Add image"
            aria-label="add"
            onClick={props.onAddPlaceClick}
          ></button>
        </div>
      </section>

      <section className="user-photos">
        <ul className="cards">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onClick={props.onCardClick}
              onLike={props.onCardLike}
              onDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>

      <ImagePopup selectedCard={props.selectedCard} onClose={props.onClose} />

      <section className="popup confirm-popup">
        <div className="popup__page-overlay"></div>

        <div className="popup__container">
          <button
            className="button popup__close-button"
            type="button"
            title="Close"
            aria-label="close"
          ></button>
          <h2 className="popup__title confirm-popup-title">Are you sure?</h2>
          <form className="form" noValidate>
            <button
              className="button form__submit-button"
              type="submit"
              title="Confirm"
            >
              Yes
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Main;
