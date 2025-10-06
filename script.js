const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
const inputField = document.querySelector('.buscador');
const alertMessage = document.createElement('p');
alertMessage.className = "alert-message";
alertMessage.style.display = 'none';

function showAlert(message) {
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 2000);
}

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || '';
    notesContainer.appendChild(alertMessage);
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

showNotes();

createBtn.addEventListener("click", () => {
    const inputText = inputField.value;

    if (inputText === "") {
        showAlert("plis add your text");
        return;
    }

    const inputBox = document.createElement('p');
    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'false');

    const imgCirculo = document.createElement('img');
    imgCirculo.src = "../imagenes/circulo-removebg-preview.png";
    imgCirculo.className = "pi";

    const imgBien = document.createElement('img');
    imgBien.src = "../imagenes/checked.png";
    imgBien.className = "po";
    imgBien.style.display = 'none';

    const imgX = document.createElement('img');
    imgX.src = "../imagenes/delete.png";
    imgX.className = "pu";

    inputBox.textContent = inputText;
    inputBox.appendChild(imgCirculo);
    inputBox.appendChild(imgBien);
    inputBox.appendChild(imgX);
    notesContainer.appendChild(inputBox);

    imgCirculo.onclick = () => {
        imgCirculo.style.display = 'none';
        imgBien.style.display = 'block';
        inputBox.classList.add('completed');
    };

    imgBien.onclick = () => {
        imgBien.style.display = 'none';
        imgCirculo.style.display = 'block';
        inputBox.classList.remove('completed');
    };

    imgX.onclick = () => {
        inputBox.remove();
        updateStorage();
    };

    inputField.value = "";
    updateStorage();
});

notesContainer.addEventListener("input", function(e) {
    if (e.target.tagName === "P") {
        updateStorage();
    }
});
