"use strict";

function login() {
	if (document.getElementById('login').value == "admin" && document.getElementById('password').value == "admin")
		return (window.location.href = "../menu/menu.html");
	else
		alert("Wrong login or password!");
}