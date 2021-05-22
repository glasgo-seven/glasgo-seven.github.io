let db;
let recipesLoaded = 0;
const numOfRecipes = 3;

/** 
 * (home.onload) Загружает и выводит рецепты в порядке их добавления.
 */
function loadRecentRecipes() {
	firebase.initializeApp(firebaseConfig);
	db = firebase.firestore();

	const container = document.getElementById("recipes-container");
	container.innerHTML = '';

	db.collection("recipes").orderBy("id", "desc").limit(numOfRecipes).get()
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

	firebaseSetCollectionSize(db);
	recipesLoaded += numOfRecipes;
}


function loadNextRecipes() {
	const container = document.getElementById("recipes-container");
	container.innerHTML = '';
	const i = firebaseGetCollectionSize() - recipesLoaded;

	db.collection("recipes")
	.where("id", "<", i)
	.orderBy("id", "desc").limit(numOfRecipes).get()
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

	recipesLoaded += numOfRecipes;
	if (recipesLoaded == numOfRecipes * 2) {
		document.getElementById("disabled").onclick = function() {loadPrevRecipes()};
		document.getElementById("disabled").id = "back";
	} else if (recipesLoaded >= firebaseGetCollectionSize()) {
		document.getElementById("forv").id = "disabled";
		document.getElementById("disabled").onclick = null;
	}
}


function loadPrevRecipes() {
	const container = document.getElementById("recipes-container");
	container.innerHTML = '';
	const i = firebaseGetCollectionSize() - recipesLoaded + numOfRecipes + numOfRecipes;

	db.collection("recipes")
	.where("id", "<", i)
	.orderBy("id", "desc").limit(numOfRecipes).get()
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

	recipesLoaded -= numOfRecipes;
	if (recipesLoaded == numOfRecipes) {
		document.getElementById("back").id = "disabled";
		document.getElementById("disabled").onclick = null;
	} else if (recipesLoaded < firebaseGetCollectionSize()) {
		document.getElementById("disabled").id = "forv";
		document.getElementById("forv").onclick = function() {loadNextRecipes()};
	}
}
