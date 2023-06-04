let URL = "http://localhost:8080/api/admin";
const roleUrl = 'http://localhost:8080/api/admin/roles';



// получаем роли с сервера
const selectRoleForm = $('#roles');

$.get(roleUrl, function(data) {
    let options = '';
    $.each(data, function(key, value) {
        options += `<option value="${Number(key) + 1}">${value.name}</option>`;
    });
    selectRoleForm.html(options);
});

// получаем пользователей с сервера
let userTable = $("#tableAllUsers");
let outputUser = [];

const renderTable = (users) => {
    outputUser = []; // Очистка массива перед обновлением таблицы
    users.forEach(user => {
        let roleLet = "";
        user.roles.forEach((role) => {
            // Удаляем префикс "ROLE_" из имени роли
            let roleName = role.name.replace("ROLE_", "");
            roleLet += roleName + "    ";
        });
        outputUser.push({ // Добавляем объект пользователя в массив
            id: user.id,
            name: user.name,
            surname: user.surname,
            department: user.department,
            salary: user.salary,
            username: user.username,
            password: user.password,
            roles: roleLet.slice(0, roleLet.length - 3)
        });
    });

    let tableContent = ''; // Создаем пустую строку
    outputUser.forEach(user => {
        tableContent += `
            <tr>
                <td><span>${user.id}</span></td>
                <td><span>${user.name}</span></td>
                <td><span>${user.surname}</span></td>
                <td><span>${user.department}</span></td>
                <td><span>${user.salary}</span></td>
                <td><span>${user.username}</span></td>
                <td><span>${user.password}</span></td>
                <td><span>${user.roles}</span></td>
                <th>
                    <button data-id="${user.id}" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal" id="editbtn">Edit</button>
                </th>
                <th>
                    <button data-id="${user.id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" id="delbtn">Delete</button>
                </th>
            </tr>
        `;
    });

    userTable.html(tableContent); // Устанавливаем строку с содержимым таблицы
};

$.get(URL, function(data) {
    renderTable(data);
});



// Заполнение форм Edit и Delete
userTable.on('click', '#editbtn', function() {
    let userId = $(this).data('id');
    $.get(`${URL}/${userId}`, function(data) {
        $("#idEdit").val(data.id);
        $("#nameEdit").val(data.name);
        $("#surnameEdit").val(data.surname);
        $("#departmentEdit").val(data.department);
        $("#salaryEdit").val(data.salary);
        $("#usernameEdit").val(data.username);
        $("#pass").val(data.password);

        $.get(roleUrl, function(rolesData) {
            let options = '';
            $.each(rolesData, function(id, name) {
                const selected = data.roles.some(role => role.id === Number(id)) ? 'selected' : '';
                options += `<option value="${Number(id) + 1}" ${selected}>${name.name}</option>`;
            });

            $('#rolesEdit').html(options);
            $('#editModal').modal();
        });
    });
});

userTable.on('click', '#delbtn', function() {
    let userId = $(this).data('id');
    $.get(`${URL}/${userId}`, function(data) {
        let roles = '';
        data.roles.forEach(role => roles += role.name + " ");
        $("#idDelete").val(data.id);
        $("#nameDelete").val(data.name);
        $("#surnameDelete").val(data.surname);
        $("#departmentDelete").val(data.department);
        $("#salaryDelete").val(data.salary);
        $("#usernameDelete").val(data.username);
        $("#passwordDel").val(data.password);
        $("#rolesDelete").val(roles);
    });
});


// Изменение юзера
let modalFormEdit = $('#editModalForm');
let roleEdit = $('#rolesEdit');

modalFormEdit.submit(function(e) {
    e.preventDefault();

    $('#nameEditError').text('');
    $('#surnameEditError').text('');
    $('#salaryEditError').text('');
    $('#usernameEditError').text('');
    $('#passwordEditError').text('');

    const rol = [];
    $('#rolesEdit option:selected').each(function() {
        rol.push({
            id: $(this).val(),
            name: $(this).text()
        });
    });

    const user = {
        id: $("#idEdit").val(),
        name: $("#nameEdit").val(),
        surname: $("#surnameEdit").val(),
        department: $("#departmentEdit").val(),
        salary: $("#salaryEdit").val(),
        username: $("#usernameEdit").val(),
        password: $("#pass").val(),
        roles: rol
    };

    $.ajax({
        url: `${URL}`,
        type: 'PATCH',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function() {
            $('#editModal').modal('hide');
            outputUser = '';
            $.get(URL, function(data) {
                renderTable(data);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // обработка ошибки
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                const errors = jqXHR.responseJSON.message.split(';');
                errors.forEach(error => {
                    const [field, message] = error.split(' - ');
                    $(`#${field}EditError`).text(message); // обновляем текст ошибки
                });
            }
        }
    });
});




// Удаление юзера
let modalFormDelete = $('#deleteModalForm');

modalFormDelete.submit(function(e) {
    e.preventDefault();
    let userId = $("#idDelete").val();

    $.ajax({
        url: `${URL}/${userId}`,
        type: 'DELETE',
        success: function() {
            $('#deleteModal').modal('hide');
            outputUser = '';
            $.get(URL, function(data) {
                renderTable(data);
            });
        }
    });
});



// Добавление юзера

let userFormNew = $("#newUserForm");

userFormNew.submit(function(e) {
    e.preventDefault();

    $('#nameEditError').text('');
    $('#surnameEditError').text('');
    $('#salaryEditError').text('');
    $('#usernameEditError').text('');
    $('#passwordEditError').text('');

    const roles = [];
    $('#roles option:selected').each(function() {
        roles.push({
            id: $(this).val(),
            name: $(this).text()
        });
    });

    const user = {
        name: $(".name_input").val(),
        surname: $(".surname_input").val(),
        department: $(".department_input").val(),
        salary: $(".salary_input").val(),
        username: $(".username_input").val(),
        password: $(".password_input").val(),
        roles: roles
    };

    $.ajax({
        url: URL,
        type: 'POST',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function(data) {
            $('#listUsers-tab').tab('show');
            userFormNew[0].reset();
            $.get(URL, function(data) {
                renderTable(data);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // обработка ошибки
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                const errors = jqXHR.responseJSON.message.split(';');
                errors.forEach(error => {
                    const [field, message] = error.split(' - ');
                    $(`#${field}Error`).text(message); // обновляем текст ошибки
                });
            }
        }
    });
});