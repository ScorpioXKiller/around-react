import { useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [addPlaceSubmitButtonTitle, setAddPlaceSubmitButtonTitle] =
    useState("Create");
  const [editAvatarSubmitButtonTitle, setEditAvatarSubmitButtonTitle] =
    useState("Save");
  const [editProfileSubmitButtonTitle, setEditProfileSubmitButtonTitle] =
    useState("Save");
  const [confirmDeleteButtonTitle, setConfirmDeleteButtonTitle] =
    useState("Yes");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getInitialData()
      .then(([card, user]) => {
        setCurrentUser(user);
        setCards(card);
        setIsLoading(false);
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

  const handleCardLike = useCallback((card, isLiked) => {
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
  }, []);

  const handleCardDelete = (id) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard({
      id: id,
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    setEditProfileSubmitButtonTitle("Saving...");
    api
      .uploadUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditProfileSubmitButtonTitle("Save"));
  };

  const handleUpdateAvatar = (url) => {
    setEditAvatarSubmitButtonTitle("Saving...");
    api
      .uploadProfileAvatar(url)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditAvatarSubmitButtonTitle("Save"));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setAddPlaceSubmitButtonTitle("Saving...");
    api
      .uploadCard({ name, link })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setAddPlaceSubmitButtonTitle("Create"));
  };

  const handleDeleteSubmit = (cardId) => {
    setConfirmDeleteButtonTitle("Deleting...");
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setConfirmDeleteButtonTitle("Yes"));
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
        {isLoading && <LoadingSpinner />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          submitButtonTitle={editAvatarSubmitButtonTitle}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          submitButtonTitle={editProfileSubmitButtonTitle}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          submitButtonTitle={addPlaceSubmitButtonTitle}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          selectedCard={selectedCard}
          submitButtonTitle={confirmDeleteButtonTitle}
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
