function setAudioID(id) {
	audioID.id = id;
	return true;
}

let audioID = { id: 0 };

function CreateRecPageFromJSON() {
	// EXTRACT VALUE FOR HTML HEADER.
	console.log(audioID);
	var col = [];
	for (var i = 0; i < rec_data.length; i++) {
		for (var key in rec_data[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}
	
	var title = document.getElementById("title");
	title.innerText = rec_data[audioID.id][col[0]] + " " + rec_data[audioID.id][col[1]] + " [" + rec_data[audioID.id][col[2]] + "]";

	var header = document.getElementById("header");
	header.innerText = rec_data[audioID.id][col[0]] + " " + rec_data[audioID.id][col[1]] + " [" + rec_data[audioID.id][col[2]] + "]";

	var description = document.getElementById("description");
	description.innerText = rec_data[audioID.id][col[3]];

	var transcription = document.getElementById("transcription");
	transcription.innerText = rec_data[audioID.id][col[4]];

	var player = document.getElementById("player");
	player.setAttribute("src", rec_data[audioID.id][col[5]]);

	var source = document.getElementById("source");
	var linkText = document.createTextNode(rec_data[audioID.id][col[5]]);
	source.appendChild(linkText);
	source.href = rec_data[audioID.id][col[5]];
}