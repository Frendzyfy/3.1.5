

//Функция которая убирает у Ролей префикс ROLE_
$(document).ready(function() {
    // Находим все элементы списка ролей
    let roles = $('#tableD tbody tr td:nth-child(5) p');

    // Проходим по всем элементам и удаляем префикс "ROLE_"
    roles.each(function() {
        let roleName = $(this).text();
        $(this).text(roleName.replace('ROLE_', ''));
    });
});



