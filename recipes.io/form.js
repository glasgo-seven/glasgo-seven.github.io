let db;

const params = {
	"Животные продукты": [
		"Куриное яйцо",
		"Куриное филе",
		"Говяжий бульон",
		"Говяжий фарш",
		"Говядина",
		"Свинина"
	],
	"Кисло-молочные продукты": [
		"Сливочное масло",
		"Плавленый сыр",
		"Молоко",
		"Сыр пармезан",
		"Творог"
	],
	"Мучное": [
		"Пшеничная мука",
		"Гренки",
		"Белый хлеб",
		"Спагетти"
	],
	"Сладкое": [
		"Сахар",
		"Коричневый сахар",
		"Темный шоколад",
	],
	"Специи": [
		"Соль",
		"Молотый черный перец",
		"Черный перец горошком",
		"Специи",
		"Специи для плова"
	],
	"Масла": [
		"Подсолнечное масло",
		"Растительное масло",
		"Оливковое масло"
	],
	"Зелень": [
		"Зелень",
		"Лавровый лист",
		"Петрушка",
		"Сельдерей",
		"Кинза",
		"Укроп"
	],
	"Крупы": [
		"Рис"
	],
	"Овощи": [
		"Картофель",
		"Лук",
		"Морковь",
		"Помидоры",
		"Сладкий перец",
		"Томатная паста",
		"Чеснок",
		"Консервированные помидоры",
		"Репчатый лук",
	],
	"Орехи": [
		"Грецкие орехи"
	],
	"Алкоголь": [
		"Красное сухое вино"
	],
	"Фрукты": [
		"Консервированный ананас"
	],
	"Соусы": [
		"Соевый соус",
		"Бальзамический крем",
	],
	"Уксусы": [
		"Яблочный уксус",
	]
};

const _params = [
		"Куриное яйцо",
		"Подсолнечное масло",
		"Пшеничная мука",
		"Сахар",
		"Творог",
		"Грецкие орехи",
		"Коричневый сахар",
		"Сливочное масло",
		"Темный шоколад",
		"Гренки",
		"Зелень",
		"Картофель",
		"Куриное филе",
		"Лавровый лист",
		"Лук",
		"Молотый черный перец",
		"Морковь",
		"Плавленый сыр",
		"Соль",
		"Черный перец горошком",
		"Молоко",
		"Растительное масло",
		"Консервированный ананас",
		"Помидоры",
		"Сладкий перец",
		"Соевый соус",
		"Томатная паста",
		"Яблочный уксус",
		"Бальзамический крем",
		"Белый хлеб",
		"Оливковое масло",
		"Чеснок",
		"Говяжий бульон",
		"Говяжий фарш",
		"Консервированные помидоры",
		"Красное сухое вино",
		"Репчатый лук",
		"Петрушка",
		"Спагетти",
		"Сельдерей",
		"Сыр пармезан",
		"Говядина",
		"Кинза",
		"Рис",
		"Специи",
		"Укроп",
		"Свинина",
		"Специи для плова"
].sort();

/**
 * Сворачивает форму выборки.
 */
function formRollUp() {
	document.getElementById("form-ingredients").style.display = "none";
	document.getElementById("form-roller").style.marginTop = "1rem";
	document.getElementById("form-roller-p").onclick = function() {formRollDown()};
	document.getElementById("form-roller-p").innerHTML = "развернуть";
}

/**
 * Разворачивает форму выборки.
 */
function formRollDown() {
	document.getElementById("form-ingredients").style.display = "block";
	document.getElementById("form-roller").style.marginTop = "2rem";
	document.getElementById("form-roller-p").onclick = function() {formRollUp()};
	document.getElementById("form-roller-p").innerHTML = "свернуть";
}

/** TODO!
 * Загружает параметры выборки.
 */
function loadFormParametrs() {
/* 
<div class="row">
	<div class="cell">
		<input type="checkbox" checked><label>Помидоры</label>
	</div>
		<div class="cell">
	<input type="checkbox" checked><label>Огурцы</label>
	</div>
	<div class="cell">
		<input type="checkbox" checked><label>Картофель</label>
	</div>
</div>
*/
	firebase.initializeApp(firebaseConfig);
	const uID = firebase.auth().currentUser;
	db = firebase.firestore();

	const rowLen = 4;
	let i = 0;
	let cont = '<div class="row">';
	for (const [key, value] of Object.entries(params)) {
		if (i == 14 || i % rowLen == 0 && i != 0) {
			cont += '</div>';
			document.getElementById("form-params").innerHTML += cont;
			cont = '<div class="row">';
		}
		cont += `<div class="cell"><input class="form-param" id="${key}" type="checkbox" checked><label>${key}</label></div>`;
		i++;
	}
	document.getElementById("form-params").innerHTML += cont;
}

/** TODO!
 * Загружает и выводит рецепты, которые подходят под выбранные параметры выборки.
 */
function loadRecipesByForm() {
	let checkedValues = []; 
	const inputElements = document.getElementsByClassName('form-param');
	for(i = 0; inputElements[i]; ++i){
		if(!inputElements[i].checked){
			for (const [key, value] of Object.entries(params[inputElements[i].id])) {
				checkedValues.push(value);
			}
		}
	}
	formRollUp();
	const container = document.getElementById("recipes-container");
	container.innerHTML = '';
	db.collection("recipes").orderBy("id", "desc").get()
	.then((snapshot) => {
		snapshot.forEach((doc) => {
			let post = true;
			for (const [key, value] of Object.entries(checkedValues)) {
				if (value in doc.data().ingredients) {
					post = false;
					break;
				}
			}
			if (post) {
				container.innerHTML += getRecipeCard(doc.data().id,
													doc.data().title,
													doc.data().pathToImg,
													doc.data().time,
													doc.data().servings,
													doc.data().rating);
			}
		});
	});
}


/** 
 * (home.onload) Загружает и выводит рецепты в порядке их добавления.
 */
 function loadRecentRecipes() {
	const container = document.getElementById("recipes-container");
	container.innerHTML = '';

	db.collection("recipes").orderBy("id", "desc").get()
	.then((snapshot) => {
		snapshot.forEach((doc) => {
			container.innerHTML += getRecipeCard(doc.data().id,
												doc.data().title,
												doc.data().pathToImg,
												doc.data().time,
												doc.data().servings,
												doc.data().rating);
		});
	});
}
