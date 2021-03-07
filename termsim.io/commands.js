function Command(envocation, description, optionsNumber, execute) {
	this.envocation = envocation;
	this.description = description;
	this.optionsNumber = optionsNumber;
	this.execute = execute;
}

var LOCATION = "localhost";

var ERROR_MESSAGE_LIST = {
	"Command.Unknown": function (command) {
		return "\n" + command + " не является внутренней или внешней командой, исполняемой программой или пакетным файлом." + "\n";
	},
	"Command.Option.Unknown": function (command, commandOptions) {
		return "\n" + command + ": неизвестные агрументы '" + commandOptions + "'." + "\n";
	},
	"Command.Option.Insufficient": function (command, optionsNumberExpected, optionsNumberRecieved) {
		return "\n" + command + ": недостаточно аргументов. Ожидалось (" + optionsNumberExpected + "), получено (" + optionsNumberRecieved + ")." + "\n";
	}
};

var COMMAND_LIST = {
	"HELP":		new Command(
		"HELP",
		"Вывод справочных сведений о командах терминала.",
		0,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}

			var ret = "";
			for (var key in COMMAND_LIST) {
				ret += "\n" + COMMAND_LIST[key].envocation + "\t";
				if (COMMAND_LIST[key].envocation.length <= 8) {
					ret += "\t";
				}
				ret += COMMAND_LIST[key].description + "\n";
			}
			return ret;
		}
	),
	"CLEAR":	new Command(
		"CLEAR",
		"Очищает содержимое экрана.",
		0,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}

			document.getElementById('scroll-text').innerHTML = '';
			return "";
		}
	),
	"LS":		new Command(
		"LS todo",
		"Вывод списка файлов и подкаталогов в указаном каталоге.",
		0,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}

			return "\nLS\n";
		}
	),
	"OPEN":		new Command(
		"OPEN todo",
		"Открывает файл в окне просмотра.\n\t\t(Пример: open filename.extension)",
		1,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}
			if (commandOptions.length < this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Insufficient"](this.envocation, this.optionsNumber, commandOptions.length);
			}

			return "\nOPEN\n";
		}
	),
	"CLOSE":	new Command(
		"CLOSE todo",
		"Закрывает текущий открытый файл в окне просмотра.",
		0,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}

			return "\nCLOSE\n";
		}
	),
	"NETSCAN":	new Command(
		"NETSCAN",
		"Сканирует сеть в поисках доступных компьютеров для подключения.",
		0,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}
			
			var ret = "";
			for (key in CONNECTION_LIST) {
				if (CONNECTION_LIST[key].parent == LOCATION) {
					ret += "\n\t" + CONNECTION_LIST[key].domain;
				}
			}
			if (ret == "") {
				return "\nДоступные компьютеры отсутствуют.\n";
			}
			return "\nДоступные компьютеры для подключения:" + ret + "\n";
		}
	),
	"WEBVIEW":		new Command(
		"WEBVIEW todo",
		"Открывает веб-сайт для просмотра.\n\t\t(Пример: webview domain.com)",
		1,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}
			if (commandOptions.length < this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Insufficient"](this.envocation, this.optionsNumber, commandOptions.length);
			}

			return "\nWEBVIEW\n";
		}
	),
	"PING":		new Command(
		"PING",
		"Проверяет подключение на уровне IP к другому компьютеру.\n\t\t(Пример: ping domain.com)",
		1,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}
			if (commandOptions.length < this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Insufficient"](this.envocation, this.optionsNumber, commandOptions.length);
			}

			if (commandOptions[0] in CONNECTION_LIST) {
				var ret = "\nОбмен пакетами с " + CONNECTION_LIST[commandOptions[0]].domain + " [" + CONNECTION_LIST[commandOptions[0]].ip + "] с 32 байтами данных:\n";
				for (var i = 0; i < 4; i++) {
					ret += "Ответ от " + CONNECTION_LIST[commandOptions[0]].ip + ": число байт=32 время=" + (Math.floor(Math.random() * 150) + 20) + "мс TTL=99\n";
				}
				return ret;
			}
			return "\nНе удалось обнаружить узел " + commandOptions[0] + ".\n";
		}
	),
	"PROBE":	new Command(
		"PROBE",
		"Проверяет уровень защиты удалённого компьютера.\n\t\t(Пример: probe 128.0.0.0)",
		1,
		function (commandOptions) {
			if (commandOptions.length > this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Unknown"](this.envocation, commandOptions);
			}
			if (commandOptions.length < this.optionsNumber) {
				return ERROR_MESSAGE_LIST["Command.Option.Insufficient"](this.envocation, this.optionsNumber, commandOptions.length);
			}

			if (commandOptions[0] in ITOC_LIST) {
				return CONNECTION_LIST[ITOC_LIST[commandOptions[0]].toUpperCase()].security.show(commandOptions[0]);
			}
			return "\nНе удалось обнаружить узел " + commandOptions[0] + ".\n";
		}
	)
};

function Connection(domain, ip, parent, security) {
	this.domain = domain;
	this.ip = ip;
	this.parent = parent;
	this.security = security;
}

function Security(isProxyOn, isFirewallOn, portsStatus, access) {
	this.proxy = isProxyOn;
	this.firewall = isFirewallOn;
	this.ports = portsStatus;
	this.access = access;
	this.show = function(connectionIP) {
		var ret = "\n[" + connectionIP + "] DEFENCE INFO\n\n";
		ret += "■■■■ PROXY ■■■■■■■■■■■■■■■■■■" + (this.proxy ? "   ACTIVE ■" : " BYPASSED ■") + "\n";
		ret += "■■■■ FIREWALL ■■■■■■■■■■■■■■■" + (this.firewall ? "   ACTIVE ■" : " BYPASSED ■") + "\n";
		if (this.ports.length != 0) {
			for (key in this.ports) {
				ret += "PORT " + this.ports[key].number + " " + (this.ports[key].status ? "[ON] " : "[OFF]") + " " + this.ports[key].name + "\n";
			}
		}
		ret += "■■■■ ACCESS ■■■■■■■■■■■■■■■■■" + (this.access ? "  GRANTED ■" : "   DENIED ■") + "\n";
		return ret;
	}
}

function Port(number, name, isClosed) {
	this.number = number;
	this.name = name;
	this.isClosed = isClosed;
}

var ITOC_LIST = {
	"0.0.0.0": "test.self",
	"100.200.300.400": "greenfarma.com"
};

var CONNECTION_LIST = {
	"TEST.SELF": new Connection(
		"test.self",
		"0.0.0.0",
		"localhost",
		new Security(
			false,
			true,
			{
				21: new Port(21, "FTP Server", false),
				22: new Port(22, "SSH", false),
				25: new Port(25, "SMTP MailServer", false),
				80: new Port(80, "HTTP WebServer", false)
			},
			true
		)
	),
	"GREENFARMA.COM": new Connection(
		"greenfarma.com",
		"100.200.300.400",
		"localhost",
		new Security(
			true,
			true,
			{},
			false
		)
	)
};
