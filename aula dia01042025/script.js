document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    const itemSelect = document.getElementById('itemSelect');
    const markButton = document.getElementById('markButton');
    const unmarkButton = document.getElementById('unmarkButton');
    const removeButton = document.getElementById('removeButton');

    const items = [];

    const addItem = () => {
        const itemValue = itemInput.value.trim();
        if (itemValue) {
            items.push(itemValue);
            updateTable();
            updateSelect();
            itemInput.value = '';
        }
    };

    const updateTable = () => {
        itemTable.innerHTML = '';
        items.forEach((item, index) => {
            const row = itemTable.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = item;
            cell.dataset.index = index; // Armazena o índice do item
        });
    };

    const updateSelect = () => {
        itemSelect.innerHTML = '<option value="">Selecione um item</option>';
        items.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = item;
            itemSelect.appendChild(option);
        });
    };

    const markItem = () => {
        const selectedIndex = itemSelect.value;
        if (selectedIndex !== '') {
            const row = itemTable.rows[selectedIndex];
            row.classList.add('marcado');
        }
    };

    const unmarkItem = () => {
        const selectedIndex = itemSelect.value;
        if (selectedIndex !== '') {
            const row = itemTable.rows[selectedIndex];
            if (row.classList.contains('marcado')) {
                row.classList.remove('marcado');
            } else {
                alert('Este item já está desmarcado.');
            }
        }
    };

    const removeItem = () => {
        const selectedIndex = itemSelect.value;
        if (selectedIndex !== '') {
            items.splice(selectedIndex, 1);
            updateTable();
            updateSelect();
        }
    };

    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });
    markButton.addEventListener('click', markItem);
    unmarkButton.addEventListener('click', unmarkItem);
    removeButton.addEventListener('click', removeItem);
});