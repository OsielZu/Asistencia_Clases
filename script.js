let currentData = {};

function showConfirmation() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const grade = document.getElementById('grade').value;
    const group = document.getElementById('group').value;
    const studentNumber = document.getElementById('student-number').value;
    const photo = document.getElementById('photo').files[0];

    if (!name || !surname || !grade || !group || !studentNumber) {
        document.getElementById('error-popup').style.display = 'flex';
        return;
    }

    // Guardar los datos actuales
    currentData = {
        name,
        surname,
        grade,
        group,
        studentNumber,
        photo
    };

    // Mostrar el pop-up
    document.getElementById('warning-popup').style.display = 'flex';
}

function closeErrorPopup() {
    document.getElementById('error-popup').style.display = 'none';
}

function generateCard() {
    const { name, surname, grade, group, studentNumber, photo } = currentData;

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // Cargar la foto
    const photoURL = URL.createObjectURL(photo);

    // Concatenar todos los datos para el QR
    const qrData = `Nombre: ${name}\nApellidos: ${surname}\nGrado: ${grade}\nGrupo: ${group}\nNúmero de Estudiante: ${studentNumber}`;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=100x100`;

    const cardHTML = `
        <div class="student-card" id="student-card">
            <img id="student-photo" src="${photoURL}" alt="Foto del Estudiante" style="width: 100px; height: 100px; object-fit: cover;">
            <h2>${name} ${surname}</h2>
            <p>Grado: ${grade}</p>
            <p>Grupo: ${group}</p>
            <p>Número de Estudiante: ${studentNumber}</p>
            <img src="${qrCodeURL}" alt="Código QR">
        </div>
    `;

    cardContainer.innerHTML = cardHTML;

    // Mostrar el botón de descarga
    document.getElementById('download-btn').style.display = 'block';

    // Ocultar el pop-up
    closePopup();
}

function closePopup() {
    document.getElementById('warning-popup').style.display = 'none';
}

function downloadCard() {
    html2canvas(document.getElementById('student-card'), {
        useCORS: true,
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'tarjeta-estudiante.png';
        link.click();
    }).catch(error => {
        console.error('Error al generar la imagen:', error);
    });
}

function clearForm() {
    document.getElementById('registration-form').reset();
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('download-btn').style.display = 'none';
}
