document.addEventListener("DOMContentLoaded", function () {
  // Referencias a los elementos del formulario
  const formulario = document.querySelector(".formularios");
  const txtNombre = document.getElementById("txtnombre");
  const txtEmail = document.getElementById("txtemail");
  const txtMensaje = document.getElementById("txtmensaje");

  // Configuración de límites
  const MAX_NOMBRE = 50;
  const MAX_MENSAJE = 100;

  // Expresión regular para validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // ===== Funciones de validación individuales =====

  function validarNombre() {
    const valor = txtNombre.value.trim();
    let error = "";

    if (valor === "") {
      error = "El nombre es obligatorio.";
    } else if (valor.length > MAX_NOMBRE) {
      error = `El nombre no puede superar los ${MAX_NOMBRE} caracteres.`;
    }

    mostrarError(txtNombre, error);
    return error === "";
  }

  function validarEmail() {
    const valor = txtEmail.value.trim();
    let error = "";

    if (valor === "") {
      error = "El correo es obligatorio.";
    } else if (!regexEmail.test(valor)) {
      error = "Ingresa un correo electrónico válido (ej: usuario@dominio.com).";
    }

    mostrarError(txtEmail, error);
    return error === "";
  }

  function validarMensaje() {
    const valor = txtMensaje.value.trim();
    let error = "";

    if (valor === "") {
      error = "El mensaje es obligatorio.";
    } else if (valor.length > MAX_MENSAJE) {
      error = `El mensaje no puede superar los ${MAX_MENSAJE} caracteres.`;
    }

    mostrarError(txtMensaje, error);
    return error === "";
  }

  // ===== Función auxiliar para mostrar/ocultar errores =====

  function mostrarError(campo, mensaje) {
    // Busca si ya existe un mensaje de error asociado al campo
    let errorExistente = campo.parentNode.querySelector(
      `.error-msg[data-for="${campo.id}"]`
    );

    if (mensaje) {
      // Crear mensaje si no existe
      if (!errorExistente) {
        errorExistente = document.createElement("span");
        errorExistente.className = "error-msg";
        errorExistente.dataset.for = campo.id;
        campo.parentNode.insertBefore(errorExistente, campo.nextSibling);
      }
      errorExistente.textContent = mensaje;
      campo.classList.add("campo-invalido");
      campo.classList.remove("campo-valido");
    } else {
      // Eliminar mensaje si el campo es válido
      if (errorExistente) {
        errorExistente.remove();
      }
      campo.classList.remove("campo-invalido");
      if (campo.value.trim() !== "") {
        campo.classList.add("campo-valido");
      }
    }
  }

  // ===== Validación en tiempo real =====

  txtNombre.addEventListener("input", function () {
    // Limita la escritura a 50 caracteres
    if (txtNombre.value.length > MAX_NOMBRE) {
      txtNombre.value = txtNombre.value.slice(0, MAX_NOMBRE);
    }
    validarNombre();
  });

  txtEmail.addEventListener("input", validarEmail);

  txtMensaje.addEventListener("input", function () {
    // Limita la escritura a 100 caracteres
    if (txtMensaje.value.length > MAX_MENSAJE) {
      txtMensaje.value = txtMensaje.value.slice(0, MAX_MENSAJE);
    }
    validarMensaje();
  });

  // ===== Validación al enviar el formulario =====

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Detiene el envío si hay errores

    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const mensajeValido = validarMensaje();

    if (nombreValido && emailValido && mensajeValido) {
      alert("¡Formulario enviado correctamente! 🎂");
      formulario.reset();

      // Limpia las clases de validación visual
      [txtNombre, txtEmail, txtMensaje].forEach((campo) => {
        campo.classList.remove("campo-valido", "campo-invalido");
      });
    } else {
      // Enfoca el primer campo con error
      const primerError = formulario.querySelector(".campo-invalido");
      if (primerError) primerError.focus();
    }
  });
});