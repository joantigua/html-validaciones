export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"

];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio", 
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Entre 6 y 12 caracteres, debe de contener al menos una letra mayuscula, una letra minuscula, un numero y no debe de contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 anios"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es de 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Debe de tener entre 10 y 40 caracteres"
    },
    
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}
function validarNacimiento(input){
    const fechaCliente = input.value;
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 anios";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const fehcaObj = new Date(fecha);
    const diferenciaFechas = new Date(
        fehcaObj.getFullYear() + 18, 
        fehcaObj.getMonth(), 
        fehcaObj.getDate()
        );
    return diferenciaFechas < fechaActual;
}