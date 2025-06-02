import { changeLikeCardStatus } from "./api.js";
// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(
  item,
  removeCard,
  imageClickHandler,
  handleLikeClick,
  userId,
  handleDeliteForUser
) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  cardElement.dataset.id = item._id;

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  likeButton.dataset.userId = userId;

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // счетчик лайка
  likeCount.textContent = item.likes.length;

  // смена стиля при активном лайке
  const isLiked = item.likes.some((user) => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  //кнопка удаления только для пользователя
  if (item.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      handleDeliteForUser(cardElement, item._id);
    });
  }

  // обработчик клика по изображению
  cardImage.addEventListener("click", function () {
    imageClickHandler(item.link, item.name);
  });

  likeButton.addEventListener("click", handleLikeClick);

  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// функция лайка карточки
export function handleLikeClick(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest(".card");
  const cardId = cardElement.dataset.id;
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const userId = likeButton.dataset.userId;

  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  changeLikeCardStatus(cardId, !isLiked)
    .then((updatedCard) => {
      likeCountElement.textContent = updatedCard.likes.length;

      const isNowLiked = updatedCard.likes.some((user) => user._id === userId);

      if (isNowLiked) {
        likeButton.classList.add("card__like-button_is-active");
      } else {
        likeButton.classList.remove("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.error("Ошибка при лайке:", err);
    });
}
