const showInputError = function (form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = function (form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = function (form, input, config) {
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

    showInputError(form, input, errorMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

// активна ли кнопка сохранить
function toggleButton(form, button, config) {
  // инпуты в массив
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

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
    hideInputError(form, input, config);
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
        checkInputValidity(form, input, config);
        if (form !== formEditAvatar) {
          toggleButton(form, button, config);
        }
      });
    });
  });
}

export { enableValidation, clearValidation, toggleButton, checkInputValidity };
