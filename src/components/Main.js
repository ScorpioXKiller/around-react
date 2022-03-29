import { useEffect, useState } from "react";
import avatarEditButton from "../images/ui/avatar-edit-button.svg";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Api from "./utils/Api";

const Main = (props) => {
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "21827e70-d261-4f64-a3bc-4b52f52216ed",
      "Content-Type": "application/json",
    },
  });

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  });

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(() => {
        return [...res];
      });
    });
  });

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
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
            <h1 className="profile__name">{userName}</h1>

            <button
              className="button profile__edit-button"
              type="button"
              id="info-edit"
              title="Edit profile"
              aria-label="edit"
              onClick={props.onEditProfileClick}
            ></button>

            <p className="profile__about">{userDescription}</p>
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
          {cards.map((card, id) => (
            <Card key={id} card={card} onClick={props.onCardClick} />
          ))}
        </ul>
      </section>

      <PopupWithForm
        name="editProfileAvatar"
        title="Change profile picture"
        isOpen={props.isEditAvatarClick}
        onClose={props.onClose}
      >
        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_el_avatar-link"
            id="avatar-input"
            name="link"
            placeholder="Image link"
            required
          />
          <span className="form__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="editProfile"
        title="Edit profile"
        isOpen={props.isEditProfileClick}
        onClose={props.onClose}
      >
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_el_user-name"
            id="name-input"
            name="name"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="form__input-error name-input-error"></span>
        </label>

        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_el_user-about"
            id="about-input"
            name="about"
            placeholder="About Me"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="form__input-error about-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="createCard"
        title="New place"
        isOpen={props.isAddPlaceClick}
        onClose={props.onClose}
      >
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_el_card-title"
            id="title-input"
            name="name"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
          />
          <span className="form__input-error title-input-error"></span>
        </label>

        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_el_image-link"
            id="image-input"
            name="link"
            placeholder="Image link"
            required
          />
          <span className="form__input-error image-input-error"></span>
        </label>
      </PopupWithForm>

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
