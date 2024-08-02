let editingOrderId = null; // Для хранения ID редактируемой заявки

document.getElementById('addOrder').addEventListener('click', function() {
    document.getElementById('orderModal').style.display = "block";
    editingOrderId = null; // Сбросить редактирование
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('orderModal').style.display = "none";
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const service = document.getElementById('serviceInput').value;
    const priority = document.getElementById('priorityInput').value;
    const description = document.getElementById('descriptionInput').value;
    const responsible = document.getElementById('responsibleInput').value;
    const status = document.getElementById('statusInput').value;

    if (editingOrderId) {
        updateOrder(editingOrderId, service, priority, description, responsible, status);
    } else {
        addOrder(service, priority, description, responsible, status);
    }
    document.getElementById('orderForm').reset();
    document.getElementById('orderModal').style.display = "none";
});

function addOrder(service, priority, description, responsible, status) {
    const orderList = document.getElementById('orderList');
    const orderItem = document.createElement('div');

    orderItem.classList.add('data-item');
    orderItem.style.backgroundColor = getPriorityColor(priority);
    
    orderItem.innerHTML = `
        <div>Услуга: ${service}</div>
        <div>Приоритет: ${priority}</div>
        <div>Ответственный: ${responsible}</div>
        <div>Описание: ${description}</div>
        <div>Статус: ${status}</div>
        <button class="edit-button">Изменить заявку</button>
        <button class="complete-button">Закрыть</button>
    `;
    
    orderItem.querySelector('.edit-button').addEventListener('click', function() {
        editOrder(service, priority, description, responsible, status, orderItem);
    });
    
    orderItem.querySelector('.complete-button').addEventListener('click', function() {
        completeOrder(orderItem);
    });

    orderList.appendChild(orderItem);
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'Низкий':
            return '#dff0d8'; // зеленый
        case 'Средний':
            return '#fcf8e3'; // желтый
        case 'Высокий':
            return '#f2dede'; // красный
    }
}

function editOrder(service, priority, description, responsible, status, orderItem) {
    document.getElementById('serviceInput').value = service;
    document.getElementById('priorityInput').value = priority;
    document.getElementById('descriptionInput').value = description;
    document.getElementById('responsibleInput').value = responsible;
    document.getElementById('statusInput').value = status;
    document.getElementById('orderModal').style.display = "block";
    
    editingOrderId = orderItem;
}

function updateOrder(orderItem, service, priority, description, responsible, status) {
    orderItem.querySelector('div:nth-child(1)').innerText = `Услуга: ${service}`;
    orderItem.querySelector('div:nth-child(2)').innerText = `Приоритет: ${priority}`;
    orderItem.querySelector('div:nth-child(3)').innerText = `Ответственный: ${responsible}`;
    orderItem.querySelector('div:nth-child(4)').innerText = `Описание: ${description}`;
    orderItem.querySelector('div:nth-child(5)').innerText = `Статус: ${status}`;
    orderItem.style.backgroundColor = getPriorityColor(priority);
}
function completeOrder(orderItem) {
    const completedList = document.getElementById('completedList');
    completedList.appendChild(orderItem);
    orderItem.querySelector('.edit-button').remove(); // Удаляем кнопку "Изменить заявку"
    orderItem.querySelector('.complete-button').remove(); // Удаляем кнопку "Закрыть"
}

document.getElementById('saveProfile').addEventListener('click', function() {
    const nickname = document.getElementById('nicknameInput').value;
    const organization = document.getElementById('organizationInput').value;
    const fileInput = document.getElementById('profilePic');

    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('avatar').style.backgroundImage = `url(${event.target.result})`;
            document.getElementById('avatar').style.backgroundSize = 'cover';
        }
        reader.readAsDataURL(fileInput.files[0]);
    }

    alert(`Профиль сохранен:\nНикнейм: ${nickname}\nОрганизация: ${organization}`);
});

document.getElementById('editProfile').addEventListener('click', function() {
    const nickname = document.getElementById('nicknameInput');
    const organization = document.getElementById('organizationInput');

    nickname.disabled = !nickname.disabled;
    organization.disabled = !organization.disabled;
    this.innerText = nickname.disabled ? 'Редактировать' : 'Сохранить';
});
