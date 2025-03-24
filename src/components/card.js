// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(
  item,
  removeCard,
  imageClickHandler,
  handleLikeClick
) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // Добавляем обработчик клика по изображению
  cardImage.addEventListener("click", function () {
    imageClickHandler(item.link, item.name);
  });

  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// функция лайка карточки
export function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
