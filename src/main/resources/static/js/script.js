
function delPrefix() {
    const roleCells = document.querySelectorAll(".table tbody td:nth-child(6)"); // Выбираем все ячейки с ролями

    roleCells.forEach(function (cell) {
        let roles = cell.textContent.trim().split(","); // Получаем список ролей из содержимого ячейки
        let cleanedRoles = roles.map(function (role) {
            return role.replace("ROLE_", ""); // Удаляем префикс "ROLE_" из каждой роли
        });
        cell.textContent = cleanedRoles.join(" "); // Заменяем содержимое ячейки на очищенные роли
    });
}


// Вызов функции для получения пользователей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // getUsers();
    delPrefix();
});

document.addEventListener("DOMContentLoaded", function () {
    const roleCells = document.querySelectorAll(".table tbody td:nth-child(6)"); // Выбираем все ячейки с ролями

    roleCells.forEach(function (cell) {
        let roles = cell.textContent.trim().split(","); // Получаем список ролей из содержимого ячейки
        let cleanedRoles = roles.map(function (role) {
            return role.replace("ROLE_", ""); // Удаляем префикс "ROLE_" из каждой роли
        });
        cell.textContent = cleanedRoles.join(", "); // Заменяем содержимое ячейки на очищенные роли
    });
});


//
//
// //______________________________________________________________________________________
// // Обработчик события отправки формы
//
//
// // JavaScript-код для управления активной вкладкой - Пока отключил, некорректная работа.
//
// document.addEventListener("DOMContentLoaded", function() {
//     const activeTab = sessionStorage.getItem("activeTab");
//
//     if (activeTab === "newUser") {
//         document.getElementById("listUsers-tab").classList.remove("active");
//         document.getElementById("listUsers-tab-pane").classList.remove("active", "show");
//
//         document.getElementById("newUser-tab").classList.add("active");
//         document.getElementById("newUser-tab-pane").classList.add("active", "show");
//     } else {
//         // Проверяем, был ли пользователь успешно создан
//         const userCreated = sessionStorage.getItem("userCreated");
//         if (userCreated === "true") {
//             // Устанавливаем активную вкладку в "User table"
//             document.getElementById("newUser-tab").classList.remove("active");
//             document.getElementById("newUser-tab-pane").classList.remove("active", "show");
//
//             document.getElementById("listUsers-tab").classList.add("active");
//             document.getElementById("listUsers-tab-pane").classList.add("active", "show");
//         }
//     }
// });
//
// document.getElementById("listUsers-tab").addEventListener("click", function() {
//     sessionStorage.setItem("activeTab", "listUsers");
// });
//
// document.getElementById("newUser-tab").addEventListener("click", function() {
//     sessionStorage.setItem("activeTab", "newUser");
// });
// //
// //
//
//
//
//
