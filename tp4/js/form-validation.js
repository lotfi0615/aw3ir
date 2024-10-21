window.onload = function () {
    displayContactList();

    const form = document.querySelector("#myForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let formValid = true;

        const fields = ["nom", "prenom", "adressePostale"];
        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (input.value.trim().length < 5) {
                input.classList.add("is-invalid");
                formValid = false;
            } else {
                input.classList.remove("is-invalid");
            }
        });

        const emailInput = document.getElementById("email");
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add("is-invalid");
            formValid = false;
        } else {
            emailInput.classList.remove("is-invalid");
        }

        const dateNaissanceInput = document.getElementById("dateNaissance");
        if (new Date(dateNaissanceInput.value) >= Date.now()) {
            dateNaissanceInput.classList.add("is-invalid");
            formValid = false;
        } else {
            dateNaissanceInput.classList.remove("is-invalid");
        }

        if (formValid) {
            // Ajoutez le contact au store
            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const dateNaissance = document.getElementById("dateNaissance").value;
            const adressePostale = document.getElementById("adressePostale").value;
            const email = document.getElementById("email").value;

            contactStore.add(nom, prenom, dateNaissance, adressePostale, email);
            displayContactList(); // Affichez la liste mise à jour
            form.reset(); // Réinitialisez le formulaire
        }
    });
};

function displayContactList() {
    const contactListString = localStorage.getItem('contactList');
    const contactList = contactListString ? JSON.parse(contactListString) : [];

    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ''; // Réinitialisez le contenu avant d'ajouter

    for (const [index, contact] of contactList.entries()) {
        tbody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.date}</td>
                <td>${contact.adress}</td>
                <td>${contact.mail}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeContact(${index})">Supprimer</button>
                </td>
            </tr>
        `;
    }
}

function removeContact(index) {
    contactStore.remove(index);
    displayContactList(); // Met à jour l'affichage après suppression
}



function calcNbChar(id) {
    document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}






