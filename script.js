document.getElementById('addOrder').addEventListener('click', function() {
    document.getElementById('orderModal').style.display = "block";
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

    addOrder(service, priority, description, responsible);
    document.getElementById('orderForm').reset();
    document.getElementById('orderModal').style.display = "none";
});

function addOrder(service, priority, description, responsible) {
    const orderList = document.getElementById('orderList');
    const orderItem = document.createElement('div');

    orderItem.classList.add('data-item');
    orderItem.innerHTML = `
        <div>Услуга: ${service}</div>
        <div>Приоритет: ${priority}</div>
        <div>Ответственный: ${responsible}</div>
    `;
    orderList.appendChild(orderItem);
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
