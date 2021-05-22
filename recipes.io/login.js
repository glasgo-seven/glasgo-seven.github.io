let db;

/**
 * Функция первичной инициализации доступа к Firebase.
 */
function loadLogin() {
	firebase.initializeApp(firebaseConfig);
	db = firebase.firestore();
}

/**
 * Функции авторизации пользователя в Firebase с использованием почты и пароля.
 * @param {*} email - Электронная почта пользователя.
 * @param {*} password - Пароль.
 */
function loginAuth(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((userCredential) => {
		document.location.href = "./user.html?uID=" + userCredential.user.uid;
	})
	.catch((error) => {
		const errCode = error.code;
		console.log(errCode);
		console.error(error.message);
		if (errCode == "auth/wrong-password") {
			document.getElementById("login-enter-errormsg").innerHTML = "Неверный пароль.";
		} else if (errCode == "auth/invalid-email") {
		document.getElementById("login-enter-errormsg").innerHTML = "Неверный email.";
		} else if (errCode == "auth/user-not-found") {
			document.getElementById("login-enter-errormsg").innerHTML = "Пользователя нет.";
		} else {
			alert(error.message);
		}
	});
}

/**
 * Фукция авторизация пользователя
 * (проверка введённых данных и состояния защищённости данных пользователя).
 */
function login() {
	const email = document.getElementById("login-enter-email").value;
	const password = document.getElementById("login-enter-password").value;

	db.collection("users").where("email", "==", email).get()
	.then((snapshot) => {
		if (!snapshot.empty) {
			snapshot.forEach((doc) => {
				if (!doc.data().secured) {
					loginAuth(email, password);
				} else {
					const salt = doc.data().salt;
					loginAuth(email, hashCode(password + salt));
				}
			})
		} else {
			console.log("Snaphot is empty");
			document.getElementById("login-enter-errormsg").innerHTML = "Пользователя нет.";
		}
	})
	.catch((error) => {
		console.erorr(error.message);
		document.getElementById("login-enter-errormsg").innerHTML = "Пользователя нет.";
	});
}

/**
 * Функция сброса пароля.
 */
function resetPassword() {
	const email = document.getElementById("login-reset-email").value;

	firebase.auth().sendPasswordResetEmail(email)
	.then(() => {
		db.collection("users").where("email", "==", email).get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				db.collection("users").doc(doc.id).update({
					secured: false
				});
				alert(`На почту ${email} отправлено письмо с ссылкой на сброс пароля. Ваш прошлый пароль более не надёжен!`);
			});
		});
	})
	.catch(error => {
		console.log(error.code);
		console.log(error.message);
		if (error.code == "auth/invalid-email") {
			document.getElementById("login-reset-errormsg").innerHTML = "Неверный email.";
		} else if (error.code == "auth/user-not-found") {
			document.getElementById("login-reset-errormsg").innerHTML = "Пользователя нет.";
		} else {
			alert(error.message);
		}
	});
}

/**
 * Функция регистрации нового пользователя.
 */
function register() {
	const email = document.getElementById("login-reg-email").value;
	const password = document.getElementById("login-reg-password-1").value;
	if (password.length < 6) {
		document.getElementById("login-reg-errormsg").innerHTML = "Короткий пароль.";
	} else if (comparePasswords("login-reg-password-0", "login-reg-password-1", "login-reg-errormsg")) {
		const salt = genSalt();
		const passwordHash = hashCode(password + salt);

		firebase.auth().createUserWithEmailAndPassword(email, passwordHash)
		.then((userCredential) => {
			console.log(userCredential.user.uid);
			db.collection("users").doc(userCredential.user.uid).set({
				email: email,
				password_salt: passwordHash,
				salt: salt,
				secured: true,
				favourite: []
			})
			.then(() => {
				console.log("Document successfully written!");
				document.location.href = "./user.html?uID=" + userCredential.user.uid;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
		})
		.catch((error) => {
			const errCode = error.code;
			console.log(errCode);
			console.log(error.message);
			if (errCode == "auth/email-already-in-use") {
				document.getElementById("login-reg-errormsg").innerHTML = "Пользователь есть.";
			} else if (errCode == "auth/invalid-email") {
				document.getElementById("login-reg-errormsg").innerHTML = "Неверный email.";
			} else {
				alert(error.message);
			}
		});
	}
}
