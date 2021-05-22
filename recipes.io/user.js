let db;

/**
 * Функция загрузки данных Личного Кабинета пользователя.
 */
function loadUser() {
	firebase.initializeApp(firebaseConfig);
	db = firebase.firestore();

	const container = document.getElementById("user-fav-recipes");
	container.innerHTML = '';
	const uID = document.location.href.split('=')[1];

	db.collection("users").doc(uID).get()
	.then((doca) => {
		if (!doca.data().secured) {
			alert("Ваш пароль ненадёжен! Смените его в форме ниже.");
		}
		document.getElementById("title").innerHTML = "ЛК - " + doca.data().email;
		document.getElementById("user-email-email").innerHTML = doca.data().email;
		for (const [key, value] of Object.entries(doca.data().favourite)) {
			db.collection("recipes").doc("" + value).get()
			.then((doc) => {
				container.innerHTML += getRecipeCard(value,
													doc.data().title,
													doc.data().pathToImg,
													doc.data().time,
													doc.data().servings,
													doc.data().rating)
			});
		}
		document.getElementById("user-container").style.display = "flex";
	});
}

/**
 * Функция смена пароля пользователя.
 */
function changePassword() {
	const user = firebase.auth().currentUser;
	const email = document.getElementById("user-email-email").innerHTML;
	const oldPassword = document.getElementById("user-password-old").value;
	
	db.collection("users").doc(user.uid).get()
	.then((doc) => {
		const saltOld = doc.data().salt;
		if (hashCode(oldPassword + saltOld) == doc.data().password_salt ||
			firebase.auth().signInWithEmailAndPassword(email, oldPassword)) {
			if (comparePasswords("user-password-new0", "user-password-new1", "user-password-errormsg")) {
				const salt = genSalt();
				const password = document.getElementById("user-password-new1").value;
				const passwordHash = hashCode(password + salt);

				user.updatePassword(passwordHash)
				.then(function() {
					db.collection("users").doc(user.uid).update({
						salt: salt,
						password_salt: passwordHash,
						secured: true
					});
					document.getElementById("user-password-old").value = '';
					document.getElementById("user-password-new0").value = '';
					document.getElementById("user-password-new1").value = '';
					alert("Пароль успешно изменён!");
				})
				.catch(error => {
					console.log(error.message);
				});
			}
		} else {
			document.getElementById("user-password-errormsg").innerHTML = "Неверный пароль.";
		}
	})
	.catch(error => {
		console.log(error.code);
		console.error(error.message);
	});
}

/**
 * Функция завершения текущей сессии.
 */
function logout() {
	firebase.auth().signOut()
	.then(() => {
		document.location.href = "./login.html";
	})
	.catch((error) => {
		console.log(error.message);
	});
}
