function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

//открытие попапа функция
export function openPopup(popup) {
  // добавление класса видимого попапа
  popup.classList.add("popup_is-opened");
  // закрытие попапа на esc
  document.addEventListener("keydown", handleEscKey);
}

// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}
