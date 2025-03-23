// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(item, removeCard, imageClickHandler) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // Добавляем обработчик клика по изображению
  cardImage.addEventListener("click", function () {
    imageClickHandler(item.link, item.name);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}
