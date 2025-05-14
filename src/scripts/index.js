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

//4. Редактирование имени и инф (ред 7 спринт)
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  toggleButton(profileEditForm, saveButton);
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

profileEditForm.addEventListener("submit", handleFormSubmit);

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

//7 спринт

const allForms = document.querySelectorAll(".popup__form");

//const popupContent = document.querySelector(".popup__content");
//const popupInputs = popupContent.querySelectorAll(".popup__input");

allForms.forEach((form) => {
  const inputs = form.querySelectorAll(".popup__input");
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input);
      toggleButton(form, button);
    });
  });
});

const showPopupError = function (input, errorMessage) {
  const errorElement = input.nextElementSibling;
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hidePopupError = function (input) {
  const errorElement = input.nextElementSibling;
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

const checkInputValidity = function (input) {
  if (!input.validity.valid) {
    let errorMessage = "";

    if (input.validity.valueMissing) {
      errorMessage = "Вы пропустили это поле.";
    } else if (input.validity.tooShort) {
      const minLength = input.getAttribute("minlength");
      const currentLength = input.value.length;
      errorMessage = `Минимальное количество символов: ${minLength}. Длина текста сейчас: ${currentLength} символ${
        currentLength > 1 ? "ов" : ""
      }.`;
    } else if (input.validity.typeMismatch && input.type === "url") {
      errorMessage = "Введите адрес сайта.";
    }

    showPopupError(input, errorMessage);
  } else {
    hidePopupError(input);
  }
};

// Проверка каждого поля (ред в 7 спринте)
//popupInputs.forEach((input) => {
//  input.addEventListener("input", function () {
//    checkInputValidity(input);
//    toggleButton(profileEditForm,saveButton)
//  });
//});

//переключение стилей нопки "сохранить"

const saveButton = popupEdit.querySelector(".popup__button");

function toggleButton(form, button) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const formValid = inputs.every(function (input) {
    return input.validity.valid;
  });
  button.disabled = !formValid;
}
