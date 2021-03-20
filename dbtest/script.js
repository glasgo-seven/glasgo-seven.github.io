function initFirebase() {
			const firebase = require("firebase");
			require("firebase/firestore");
			var firebaseConfig = {
				apiKey: "AIzaSyAeD7-_Z9xiFl_b2heY6eCCG249yM2t_04",
				authDomain: "pytutor-5a171.firebaseapp.com",
				projectId: "pytutor-5a171",
				storageBucket: "pytutor-5a171.appspot.com",
				messagingSenderId: "251731517003",
				appId: "1:251731517003:web:1378683e9f1120a84777ce"
			};
			firebase.initializeApp(firebaseConfig);
			var db = firebase.firestore();
		}