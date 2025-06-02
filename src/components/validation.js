const showInputError = function (input, errorMessage) {
  const errorElement = input.nextElementSibling;
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = function (input) {
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

    showInputError(input, errorMessage);
  } else {
    hideInputError(input);
  }
};

// активна ли кнопка сохранить
function toggleButton(form, button, config) {
  // инпуты в массив
  const inputs = Array.from(form.querySelectorAll(".popup__input"));

  // валидны ли поля
  const formValid = inputs.every(function (input) {
    return input.validity.valid;
  });

  // включена или выключена кнопка (ок=включаем кнопку, убирается стиль)
  if (formValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    hideInputError(input);
  });
  const button = form.querySelector(config.submitButtonSelector);
  toggleButton(form, button, config);
}

function enableValidation(config, formEditAvatar) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input);
        if (form !== formEditAvatar) {
          toggleButton(form, button, config);
        }
      });
    });
  });
}

export { enableValidation, clearValidation, toggleButton, checkInputValidity };
