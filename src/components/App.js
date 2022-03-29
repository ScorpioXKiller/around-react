import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function App() {
  const [isEditAvatarClick, setIsEditAvatarClick] = useState(false);
  const [isEditProfileClick, setIsEditProfileClick] = useState(false);
  const [isAddPlaceClick, setIsAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  const handleEditAvatarClick = () => {
    setIsEditAvatarClick(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileClick(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlaceClick(true);
  };

  const handleCardClick = (evt) => {
    setSelectedCard(evt.target);
  };

  const closeAllPopups = () => {
    setIsEditAvatarClick(false);
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setSelectedCard("");
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        selectedCard={selectedCard}
        isEditAvatarClick={isEditAvatarClick}
        isEditProfileClick={isEditProfileClick}
        isAddPlaceClick={isAddPlaceClick}
        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
