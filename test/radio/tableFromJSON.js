function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function CreateTableFromJSON() {
	// var myBooks = log_table;

	// EXTRACT VALUE FOR HTML HEADER. 
	var col = [];
	for (var i = 0; i < log_table.length; i++) {
		for (var key in log_table[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
	var tr = table.insertRow(-1);                   // TABLE ROW.
	for (var i = 1; i < col.length; i++) {
		var th = document.createElement("th");      // TABLE HEADER.
		th.setAttribute("align", "center");
		th.innerHTML = capitalize(col[i]);
		tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < log_table.length; i++) {
		tr = table.insertRow(-1);
		for (var j = 1; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			if (j != 2) {
				tabCell.setAttribute("align", "center");
				tabCell.innerHTML = j == col.length - 1 ? (log_table[i][col[j]] ? "!" : "") : log_table[i][col[j]];
			} else {
				var a = document.createElement("a");
				a.setAttribute("href", log_table[i][col[0]]);
				a.innerHTML = log_table[i][col[j]];
				tabCell.innerHTML = a;
			}
		}
	}

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}