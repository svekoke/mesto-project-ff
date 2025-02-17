// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, removeCard) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = item.link; // Устанавливаем ссылку на изображение
  cardImage.alt = item.name; // Устанавливаем описание изображения
  cardTitle.textContent = item.name; // Устанавливаем название карточки

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    removeCard(cardElement); // Вызываем функцию удаления карточки
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const newCard = createCard(item, removeCard);
  container.append(newCard);
});
