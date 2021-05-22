let db;

/**
 * Загружает описание рецепта на странице.
 */
function loadOneRecipe() {
	firebase.initializeApp(firebaseConfig);
	db = firebase.firestore();

	const rID = document.location.href.split('=')[1];
	db.collection("recipes").doc(rID).get()
	.then((doc) => {
		document.getElementById("title").innerHTML = "Рецепты - " + doc.data().title;
		document.getElementById("recipe-card-img").src = doc.data().pathToImg;
		document.getElementById("recipe-card-time").innerHTML += doc.data().time;
		document.getElementById("recipe-card-servings").innerHTML += doc.data().servings;
		document.getElementById("recipe-card-rating").innerHTML += doc.data().rating;

		for (const [key, value] of Object.entries(doc.data().nutritions)) {
			document.getElementById("recipe-card-nutrition").innerHTML += `<li>${key} - ${value}</li>`;
		}

		document.getElementById("recipe-card-title").innerHTML = doc.data().title;

		for (const [key, value] of Object.entries(doc.data().ingredients)) {
			document.getElementById("recipe-card-ingredients").innerHTML += `<li>${key} - ${value}</li>`;
		}
		
		for (const [key, value] of Object.entries(doc.data().directions)) {
			document.getElementById("recipe-card-directions").innerHTML += `<li>${value}</li>`;
		}

		const uID = firebase.auth().currentUser;
		if (uID != null) {
			db.collection("users").doc(uID.uid).get()
			.then((doc) => {
				for (const [key, value] of Object.entries(doc.data().favourite)) {
					if (rID == value) {
						document.getElementById("recipe-card-fav-0").innerHTML = "В избранном!";
						document.getElementById("recipe-card-fav-0").id = "recipe-card-fav-1";
						break;
					}
				}
			});
		}

		document.getElementById("recipe-card-full").style.display = "flex";
	});
}

/**
 * Добавляет данный рецепт в избранные рецепты пользователя.
 */
function addToFav() {
	const uID = firebase.auth().currentUser;
	if (uID != null) {
		const rID = document.location.href.split('=')[1];
		db.collection("users").doc(uID.uid).get()
		.then((doc) => {
			let isIn = false;
			let i = -1;
			for (const [key, value] of Object.entries(doc.data().favourite)) {
				if (rID == value) {
					isIn = true;
					i = key;
					document.getElementById("recipe-card-fav-1").innerHTML = "Добавить в избранное";
					document.getElementById("recipe-card-fav-1").id = "recipe-card-fav-0";
					break;
				}
			}
			if (!isIn) {
				document.getElementById("recipe-card-fav-0").innerHTML = "В избранном!";
				document.getElementById("recipe-card-fav-0").id = "recipe-card-fav-1";

				db.collection("users").doc(uID.uid).get()
				.then(doc => {
					db.collection("users").doc(uID.uid).update({
						"favourite": firebase.firestore.FieldValue.arrayUnion(parseInt(rID))
					});
					db.collection("recipes").doc(rID).update({
						"rating": firebase.firestore.FieldValue.increment(1)
					});

				})
				.catch(error => {
					console.error(error.message);
				});
			} else {
				db.collection("users").doc(uID.uid).get()
				.then(doc => {
					db.collection("users").doc(uID.uid).update({
						"favourite": firebase.firestore.FieldValue.arrayRemove(doc.data().favourite[i])
					});
					db.collection("recipes").doc(rID).update({
						"rating": firebase.firestore.FieldValue.increment(-1)
					});
				})
				.catch(error => {
					console.error(error.message);
				});
			}
		});
	} else {
		alert("Войдите в Личный Кабинет, чтобы добавить рецепт в избранное!");
	}
}
