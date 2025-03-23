import "../pages/index.css";
import { createCard, removeCard } from "../components/card.js";
import { initialCards } from "../components/cards.js";
import {
  openPopup,
  closePopup,
  popupImage,
  handleImageClick,
} from "../components/modal.js";
// @todo: DOM узлы
const container = document.querySelector(".places__list");

// константы для попапов
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

// константы для закрытия попапов
const closeEdit = popupEdit.querySelector(".popup__close");
const closeNewCard = popupNewCard.querySelector(".popup__close");
const closeImagePopup = popupImage.querySelector(".popup__close");

// открытие попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Открытие попапа для редактирования профиля
profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
});

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

closeImagePopup.addEventListener("click", function () {
  closePopup(popupImage);
});

// Закрытие попапа на escape
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

// Закрытие попапа при клике на фон
popupEdit.addEventListener("click", function (event) {
  if (event.target === popupEdit) {
    closePopup(popupEdit);
  }
});

popupNewCard.addEventListener("click", function (event) {
  if (event.target === popupNewCard) {
    closePopup(popupNewCard);
  }
});

popupImage.addEventListener("click", function (event) {
  if (event.target === popupImage) {
    closePopup(popupImage);
  }
});

// константы для редактирования имени и инф профиля
const formElement = popupEdit.querySelector("form");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//4. Редактирование имени и инф
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileJob.textContent = job;

  closePopup(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit); // Теперь слушаем событие отправки формы

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

  const newCard = createCard({ name, link }, removeCard, handleImageClick);
  container.prepend(newCard);

  closePopup(popupNewCard);
  formNewCard.reset();
}

formNewCard.addEventListener("submit", handleNewCardSubmit);

// 7.Лайк карточки
container.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const newCard = createCard(item, removeCard, handleImageClick);
  container.append(newCard);
});
