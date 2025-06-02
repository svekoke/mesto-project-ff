import "../pages/index.css";
import { createCard, removeCard, handleLikeClick } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modal.js";
import {
  enableValidation,
  toggleButton,
  clearValidation,
} from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  updateUserAvatar,
  addNewCard,
  deleteCard,
} from "../components/api.js";

let userId = null;

//валидация
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

// @todo: DOM узлы
const container = document.querySelector(".places__list");

// попапы и кнопки
// блок попапа формы реадктирования
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// закрытие попапов
const closeEdit = popupEdit.querySelector(".popup__close");
const closeNewCard = popupNewCard.querySelector(".popup__close");
const closeImagePopup = popupImage.querySelector(".popup__close");

// закрытие попапа по фону
popupEdit.addEventListener("click", closePopupByOverlay);
popupNewCard.addEventListener("click", closePopupByOverlay);
popupImage.addEventListener("click", closePopupByOverlay);

// открытие попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Открытие/закрытие попапа на "+"
addCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// открытие/закрытие попапа редактирования профиля
closeEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

// открытие/Закрытие попапа "Новое место"
closeNewCard.addEventListener("click", function () {
  closePopup(popupNewCard);
});

// звакрытие попапа с изображением
closeImagePopup.addEventListener("click", function () {
  closePopup(popupImage);
});

// поиск формы
const profileEditForm = popupEdit.querySelector("form");

// имя и описание пользователя стандартное
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// ввод нового имени и описания
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//4. Редактирование имени и описания (ред 7 спринт)
profileEditButton.addEventListener("click", function () {
  // событие по клику
  // в форму ввода в попапе сохраняет текст из профиля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  // нахождение кнопки сохранить(активна ли,включить или выключить)
  const saveButton = popupEdit.querySelector(".popup__button");
  // заполнены ли поля (да=сохранить), валидация
  toggleButton(profileEditForm, saveButton, config);

  openPopup(popupEdit);
});

// сохранение формы
function handleProfileFormSubmit(evt) {
  // отмена перезагрузки страницы
  evt.preventDefault();

  // кнопка сохранение...
  const saveButton = popupEdit.querySelector(".popup__button");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  // получение данных  из формы
  const name = nameInput.value;
  const job = jobInput.value;

  updateUserInfo(name, job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileJob.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    });
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// добавление карточки
const formNewCard = popupNewCard.querySelector("form");
const cardNameInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

// заполнение и отправление формы
function handleNewCardSubmit(evt) {
  // отмена перезагрузки страницы
  evt.preventDefault();

  // сохранение...
  const saveButton = popupNewCard.querySelector(".popup__button");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  // получение данных из формы
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addNewCard(name, link)
    .then((data) => {
      const newCard = createCard(
        data,
        removeCard,
        handleImageClick,
        handleLikeClick,
        userId,
        handleDeliteForUser
      );
      container.prepend(newCard);
      closePopup(popupNewCard);
      formNewCard.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    });
}

formNewCard.addEventListener("submit", handleNewCardSubmit);

// открытие попапа с картинкой
function handleImageClick(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

// загрузка данных с сервера, гет запрос к АПИ спринт 7
// отправление запроса данных пользователя и карточки
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    // обновляет имя, описание, аватар, сохраняет айди
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    // добавление карточки на страницу
    cards.forEach((card) => {
      const newCard = createCard(
        card,
        removeCard,
        handleImageClick,
        handleLikeClick,
        userId,
        handleDeliteForUser
      );
      container.append(newCard);
    });
  })
  .catch((err) => console.error("Ошибка при загрузке данных:", err));

// функция удаления карточки
function handleDeliteForUser(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      removeCard(cardElement); // удаление из DOM
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

// редактор аватарки
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const closeEditAvatar = popupEditAvatar.querySelector(".popup__close");
const formEditAvatar = popupEditAvatar.querySelector("form");
const avatarInput = formEditAvatar.querySelector('input[name="avatar"]');
const profileImage = document.querySelector(".profile__image");

editAvatarButton.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(formEditAvatar, config);

  // чтоб кнопке не добавлялся класс
  const saveButton = formEditAvatar.querySelector(config.submitButtonSelector);
  saveButton.classList.remove(config.inactiveButtonClass);
  saveButton.disabled = false;

  openPopup(popupEditAvatar);
});

closeEditAvatar.addEventListener("click", () => {
  closePopup(popupEditAvatar);
});

popupEditAvatar.addEventListener("click", closePopupByOverlay);

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // сохарнение...
  const saveButton = formEditAvatar.querySelector(".popup__button");
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const avatarUrl = avatarInput.value;

  updateUserAvatar(avatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    });
});
