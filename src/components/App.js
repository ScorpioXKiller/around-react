import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard({
      isCardOpen: true,
      id: data.id,
      link: data.link,
      title: data.name,
    });
  };

  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const handleCardDelete = (id) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard({
      id: id
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .uploadUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const handleUpdateAvatar = (url) => {
    api
      .uploadProfileAvatar(url)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .uploadCard({ name, link })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const handleDeleteSubmit = (id) => {
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({
      isCardOpen: false,
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          onDeleteSubmit={handleDeleteSubmit}
        />

        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          selectedCard={selectedCard}
          isAddPlaceClick={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          cards={cards}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
