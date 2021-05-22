const firebaseConfig = {
	apiKey: "AIzaSyCri3ybKnhxsoFzAXweDKQJuuIiKcNM8mM",
	authDomain: "coursework-recipes.firebaseapp.com",
	projectId: "coursework-recipes",
	storageBucket: "coursework-recipes.appspot.com",
	messagingSenderId: "537320696814",
	appId: "1:537320696814:web:e5d09db52ce2c9a72d3cff"
};

/**
 * Сохраняет размер коллекции.
 * @param {*} db - База данных.
 */
function firebaseSetCollectionSize(db) {
	db.collection("recipes").get().then((snapshot) => {
		document.getElementById("recipes-size").innerHTML = snapshot.size;
	});
}

/**
 * Возвращает размер коллекции.
 */
function firebaseGetCollectionSize() {
	return parseInt(document.getElementById("recipes-size").innerHTML);
}

/**
 * Добавляет блюдо в базу данных.
 * @param {*} db - База данных.
 * @param {*} title - Название блюда.
 * @param {*} pathToImg - Изображение блюда.
 * @param {*} time - Время готовка.
 * @param {*} servings - Количество порций.
 * @param {*} nutritions - Энергетическая ценность.
 * @param {*} ingredients - Ингредиенты.
 * @param {*} directions - Рецепт.
 */
function firebaseAddRecipe(db, title, pathToImg, time, servings, nutritions, ingredients, directions) {
	const id = firebaseGetCollectionSize(db, "recipes");
	db.collection("recipes").doc("" + id).set({
		id: id,
		title: title,
		pathToImg: pathToImg,
		rating: 0,
		time: time,
		servings: servings,
		nutritions: nutritions,
		ingredients: ingredients,
		directions: directions
	})
	.then(() => {
		console.log("Document successfully written!");
	})
	.catch((error) => {
		console.error("Error writing document: ", error);
	});
}

/**
 * Удаляет блюдо по id из базы данных.
 * @param {*} db - База данных.
 * @param {*} id - ID рецепта в базе данных.
 */
function firebaseDeleteRecipe(db, id) {
	db.collection("recipes").doc("" + id).delete().then(() => {
		console.log("Document successfully deleted!");
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});
}

/**
 * Возвращает данные блюда по id из базы данных
 * @param {*} db - База данных.
 * @param {*} id - ID рецепта в базе данных.
 */
function firebaseGetRecipe(db, id) {
	db.collection("recipes").doc("" + id).get().then((doc) => {
		if (doc.exists) {
			return doc.data();
		} else {
			console.log("No such document!");
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});
}
