import { createRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const imageInput = createRef();

  useEffect(() => {
    imageInput.current.value = "";
  }, [imageInput]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateAvatar(imageInput.current.value);
  };

  return (
    <PopupWithForm
      name="editProfileAvatar"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle="Save"
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          ref={imageInput}
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
  );
};

export default EditAvatarPopup;