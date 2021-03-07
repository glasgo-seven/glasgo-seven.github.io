// Onload message:
// 		Microsoft Windows [Version 10.0.19041.685]
// 		(c) Корпорация Майкрософт (Microsoft Corporation), 2020. Все права защищены.
// 		C:\Users\Дмитрий>
// Error message:
// 		"%command%" не является внутренней или внешней
// 		командой, исполняемой программой или пакетным файлом.

var VERSION = "0.02a"

function commandHandler(command) {
	for (i = 0; i < COMMAND_LIST.length; i++) {
		if (COMMAND_LIST[i][0] == command.toUpperCase) {
			return COMMAND_LIST[i][2];
		}
	}
	return false;
}

var input = document.getElementById("input-text");
input.addEventListener("keyup", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();

		// Copy input to scroll-text
		$("#scroll-text").append($("#adress").text() + " " + $("#input-text").val() + "\n");

		// Get command ret
		var commandLine = $("#input-text").val().toUpperCase().split(" ");
		var ret = ""
		if (commandLine[0] in COMMAND_LIST) {
			ret = COMMAND_LIST[commandLine[0]].execute(commandLine.slice(1));
		} else {
			ret = ERROR_MESSAGE_LIST["Command.Unknown"](commandLine[0]);
		}

		// Add ret to scroll-text
		$("#scroll-text").append(ret);

		// Send ret to console
		// console.log(ret);

		// Add newline to scroll-text
		$("#scroll-text").append("\n>");

		// Clear input
		document.getElementById('input-text').value = '';
	}
});