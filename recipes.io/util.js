/**
* Меняет URL страницы.
*/
function linkTo(id) {
	if (id == "login"){
		const userID = firebase.auth().currentUser; // checkLogin();
		if (userID != null) {
			console.log("logged in, redirecting");
			document.location.href = "./user.html?uID=" + userID.uid;
		} else {
			console.log("not logged in");
			document.location.href = "./login.html";
		}
	} else {
		document.location.href = "./" + id + ".html";
	}
}

/**
 * Создаёт карточку с рецептом блюда с переданными параметрами.
 * @param {*} recipeID - ID рецепта в базе данных.
 * @param {*} title - Название блюда.
 * @param {*} pathToImg - Путь до изображения блюда.
 * @param {*} time - Время приготовления.
 * @param {*} servings - Количество порций.
 * @param {*} rating - Рейтинг
 * @returns Карточку-строку для добавления в HTML-файл.
 */
function getRecipeCard(recipeID, title, pathToImg, time, servings, rating) {
	const card ='<div class="recipe-card" onclick="loadFullRecipe(' + recipeID + ')"><div style="height:16rem">' +
				'<img id="recipe-card-img" src="' + pathToImg + '" height="256" width="256"></div><div>' + 
				'<p id="recipe-card-title">' + title + '</p>' + 
				'<p id="recipe-card-time">Время: ' + time + '</p>' + 
				'<p id="recipe-card-servings">Порций: ' + servings + '</p>' + 
				'<p id="recipe-card-rating">Рейтинг: ' + rating + '</p></div></div>';
	return card;
}

/**
 * Открывает новую вкладку с полным описанием рецепта.
 * @param {*} recipeID - ID рецепта в базе данных.
 */
 function loadFullRecipe(recipeID) {
	// document.location.href = "./recipe.html?rID=" + recipeID;
	window.open("./recipe.html?rID=" + recipeID, '_blank').focus();
}

/**
 * Функция сравнения паролей из указанных полей.
 * @param {*} pw0 - Поле первой записи пароля.
 * @param {*} pw1 - Поле второй записи пароля.
 * @param {*} erm - Элемент, который отобразит ошибку.
 * @returns Флаг сравнения.
 */
function comparePasswords(pw0, pw1, erm) {
	const pass0 = document.getElementById(pw0).value;
	const pass1 = document.getElementById(pw1).value;
	if (pass0 != pass1) {
		document.getElementById(erm).innerHTML = "Пароли не совпадают!";
		return false;
	} else {
		document.getElementById(erm).innerHTML = "";
		return true;
	}
}

/**
 * Генерирует случайную "соль" для хеширования пароля.
 * @param {*} length - Длина строки "соли".
 * @returns Строка "соли".
 */
function genSalt(length = 8) {
	let result = [];
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join('');
}

/**
 * Хеш-функция.
 * @param {*} str - Строка для шифрования.
 * @returns Хеш входной строки.
 */
function hashCode(str) {
	let hash = 0, i, chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash).toString(16);
}
