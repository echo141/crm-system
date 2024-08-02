document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dataInput = document.getElementById('dataInput').value;
    addDataItem(dataInput);
    document.getElementById('dataForm').reset();
});

function addDataItem(data) {
    const dataList = document.getElementById('dataList');
    const dataItem = document.createElement('div');
    dataItem.classList.add('data-item');
    dataItem.innerHTML = `
        <span>${data}</span>
        <button class="edit-button" onclick="editDataItem(this)">Редактировать</button>
    `;
    dataList.appendChild(dataItem);
}

function editDataItem(button) {
    const dataItem = button.parentElement;
    const currentText = dataItem.querySelector('span').innerText;
    const newText = prompt('Редактировать данные:', currentText);
    if (newText) {
        dataItem.querySelector('span').innerText = newText;
    }
}
