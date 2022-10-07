function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.querySelector(".form-photographerName").textContent = photographerName;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
//modal du succes apres le formulaire valide
const successModal = document.getElementById("successModal");

//formulaire champ prenom
const first = document.getElementById("first");
//formulaire champ nom
const last = document.getElementById("last");
//formulaire champ adresse mail
const email = document.getElementById("email");
//formulaire champ message
const message = document.getElementById("message");

//bouton soumettre formulaire
const submitButton = document.getElementById("btn-submit");
const form = document.querySelector("form");

const fermerButton = document.querySelector(".fermer-btn");
fermerButton.addEventListener("click", closeModal);

//fonctions ecoutant les changements input et blur sur les champs du formulaire pour valider, affiche ou cache le message d'erreur
first.addEventListener("input", () => {
    if (!firstValidator()) showError(first, errormessages["nameInvalid"]);
    else hideError(first);
    validate();
});

last.addEventListener("input", () => {
    if (!lastValidator()) showError(last, errormessages["nameInvalid"]);
    else hideError(last);
    validate();
});

email.addEventListener("input", () => {
    if (!emailValidator()) showError(email, errormessages["emailInvalid"]);
    else hideError(email);
    validate();
});

message.addEventListener("input", () => {
    if (!messageValidator()) showError(message, errormessages["messageInvalid"]);
    else hideError(message);
    validate();
});

//lors qu'on reussit a soumettre un formulaire valide, le modal de succes s'affiche
form.addEventListener("submit", (e) => {
    console.log(` Nom: ${last.value},\n Prénom: ${first.value},\n Email: ${email.value},\n Message: ${message.value},\n`)
    e.preventDefault();
    form.style.display = "none";
    successModal.style.display = "flex";
    successModal.style.visibility = "visible";

});

//message erreur
const errormessages = {
    nameInvalid: "Veuillez entrer 2 caractères ou plus.",
    emailInvalid: "Veuillez entrer une adresse mail valide.",
    messageInvalid: "Veuillez écrire dans le champ message."
};

//champ prenom invalide si vide ou moins de 3 caracteres
function firstValidator() {
    if (first.value == "" || first.value.length <= 2) return false;
    return true;
}
//champ nom invalide si vide ou moins de 3 caracteres
function lastValidator() {
    if (last.value == "" || last.value.length <= 2) return false;
    return true;
}

//champ mail invalide si ce n'est pas une adresse mail
function emailValidator() {
    return email.value
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

//champ nom invalide si vide ou moins de 3 caracteres
function messageValidator() {
    if (message.value == "") return false;
    return true;
}

//fonction pour valider le formulaire qui verifie les ville en derniere au cas ou tous les autres champs sont valide
function validate() {
    if (
        firstValidator() &&
        lastValidator() &&
        emailValidator() &&
        messageValidator()
    ) {
        submitButton.disabled = false;
    }
    else {
        submitButton.disabled = true;
    }
}

//affiche les messages d'erreurs sous chaque champ respectif
function showError(form, message) {
    form.parentElement.dataset.errorVisible = "true";
    form.parentElement.dataset.error = message;
}

//cache les messages d'erreurs 
function hideError(form) {
    form.parentElement.dataset.errorVisible = "false";
}

validate();