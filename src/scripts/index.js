import "../pages/index.css";
import { createCard, removeCard, handleLikeClick } from "../components/card.js";
import { initialCards } from "../components/cards.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modal.js";
// @todo: DOM узлы
const container = document.querySelector(".places__list");

// константы для попапов
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// константы для закрытия попапов
const closeEdit = popupEdit.querySelector(".popup__close");
const closeNewCard = popupNewCard.querySelector(".popup__close");
const closeImagePopup = popupImage.querySelector(".popup__close");

// открытие попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

popupEdit.addEventListener("click", closePopupByOverlay);
popupNewCard.addEventListener("click", closePopupByOverlay);
popupImage.addEventListener("click", closePopupByOverlay);

// Открытие попапа на "+"
addCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// Закрытие попапа редактирования профиля
closeEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

// Закрытие попапа "Новое место"
closeNewCard.addEventListener("click", function () {
  closePopup(popupNewCard);
});

// звакрытие попапа с изображением
closeImagePopup.addEventListener("click", function () {
  closePopup(popupImage);
});

// константы для редактирования имени и инф профиля
const profileEditForm = popupEdit.querySelector("form");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//4. Редактирование имени и инф
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileJob.textContent = job;

  closePopup(popupEdit);
}

profileEditForm.addEventListener("submit", handleFormSubmit); // Теперь слушаем событие отправки формы

// 6. Добавление карточки
const formNewCard = popupNewCard.querySelector("form");
const cardNameInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCard(
    { name, link },
    removeCard,
    handleImageClick,
    handleLikeClick
  );
  container.prepend(newCard);

  closePopup(popupNewCard);
  formNewCard.reset();
}

formNewCard.addEventListener("submit", handleNewCardSubmit);

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const newCard = createCard(
    item,
    removeCard,
    handleImageClick,
    handleLikeClick
  );
  container.append(newCard);
});

// Функция открытия попапа с картинкой
function handleImageClick(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}
