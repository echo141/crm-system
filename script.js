document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const service = document.getElementById('dataInput').value;
    const priority = document.getElementById('priorityInput').value;
    const description = document.getElementById('descriptionInput').value;
    const responsible = document.getElementById('responsibleInput').value;
    addDataItem(service, priority, description, responsible);
    document.getElementById('dataForm').reset();
});

function addDataItem(service, priority, description, responsible) {
    const dataList = document.getElementById('dataList');
    const dataItem = document.createElement('div');
    const status = "зарегистрирован";

    dataItem.classList.add('data-item');
    dataItem.innerHTML = `
        <span>${service} - <span class="status">${status}</span></span>
        <div>Приоритет: ${priority}</div>
        <div>Ответственный: ${responsible}</div>
        <div class="details">
            <p>Описание: ${description}</p>
            <p>Дата создания: ${new Date().toLocaleDateString()}</p>
        </div>
        <button class="toggle-details" onclick="toggleDetails(this)">Показать детали</button>
        <button class="edit-button" onclick="editDataItem(this)">Редактировать статус</button>
    `;
    dataList.appendChild(dataItem);
}

function toggleDetails(button) {
    const details = button.previousElementSibling;
    details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
}

function editDataItem(button) {
    const dataItem = button.parentElement;
    const statusElement = dataItem.querySelector('.status');

    // Изменяем статус и обновляем ширину шкалы
    const currentStatus = statusElement.innerText;

    let newStatus, progressWidth;
    if (currentStatus === "зарегистрирован") {
        newStatus = "Принят";
        progressWidth = "66%";
        dataItem.querySelector('.progress-bar').style.backgroundColor = "#ffc107"; // Желтый
    } else if (currentStatus === "Принят") {
        newStatus = "Выполнен";
        progressWidth = "100%";
        dataItem.querySelector('.progress-bar').style.backgroundColor = "#5cb85c"; // Зеленый
    } else {
        newStatus = "зарегистрирован";
        progressWidth = "33%";
        dataItem.querySelector('.progress-bar').style.backgroundColor = "#dc3545"; // Красный
    }

    statusElement.innerText = newStatus;
    dataItem.querySelector('.progress-bar').style.width = progressWidth;
}
