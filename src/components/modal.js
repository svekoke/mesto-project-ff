//открытие попапа функция
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// 8. Открытие попапа с картинкой
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// Функция открытия попапа с картинкой
export function handleImageClick(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  popupImage.classList.add("popup_is-opened");
}

export { popupImage };
