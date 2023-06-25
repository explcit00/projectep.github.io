function getItems() {
    return JSON.parse(localStorage.getItem('items')) || [];
}

    function saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
    }

    function addItem() {
        var itemName = $('#itemName').val();
        var itemQuantity = parseInt($('#itemQuantity').val());
        var items = getItems();
        items.push({ name: itemName, quantity: itemQuantity });
        saveItems(items);
        updateItemList();
        $('#itemName').val('');
        $('#itemQuantity').val('');
    }

    function deleteItem(index) {
        var items = getItems();
        items.splice(index, 1);
        saveItems(items);
        updateItemList();
    }

    function updateItemList() {
        var items = getItems();
        var tableBody = $('#itemTable tbody');
        tableBody.empty();
        items.forEach(function (item, index) {
            var row = $('<tr>');
            row.append('<td>' + item.name + '</td>');
            row.append('<td>' + item.quantity + '</td>');
            var editButton = $('<button>')
                .addClass('btn btn-primary btn-sm')
                .text('Edit')
                .click(function () {
                    editMode(index);
                });
            var deleteButton = $('<button>')
                .addClass('btn btn-danger btn-sm')
                .text('Delete')
                .click(function () {
                    deleteItem(index);
                });
            row.append($('<td>').append(editButton, deleteButton));
            tableBody.append(row);
        });
    }

    function editMode(index) {
        var items = getItems();
        var item = items[index];
        $('#itemName').val(item.name);
        $('#itemQuantity').val(item.quantity);
        $('#itemForm').off('submit').on('submit', function (event) {
            event.preventDefault();
            items[index].name = $('#itemName').val();
            items[index].quantity = parseInt($('#itemQuantity').val());
            saveItems(items);
            updateItemList();
            $('#itemName').val('');
            $('#itemQuantity').val('');
            $('#itemForm').off('submit').on('submit', addItem);
        });
    }

    $(document).ready(function () {
        updateItemList();
        $('#itemForm').submit(addItem);
    });