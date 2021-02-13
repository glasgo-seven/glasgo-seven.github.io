function Label(nameTag, link=null) {
	this.nameTag = nameTag;
	this.link = link;
}

const LABELS = {
	'IO':	new Label('Input/Output'),
	'VAR':	new Label('Variables'),
	'MATH':	new Label('Arithmetic Operations'),
	'OPS':	new Label('Statements'),
	'COMP':	new Label('Comparison'),
	'STR':	new Label('Strings'),
	'LIB':	new Label('Modules'),
	'DS':	new Label('Data Structures'),
	'PROC':	new Label('Procedural Programming'),
	'FUNC':	new Label('Functions'),
	'REC':	new Label('Recursion'),
	'OOP':	new Label('Object-Oriented Programming'),
	'CLS':	new Label('Classes'),
	'OBJ':	new Label('Objects'),
	'FIL':	new Label('Files'),
	'DAT':	new Label('Dates'),
	'GUI':	new Label('GUI')
};


function Task(title, text, code, task, input, output, hint1, hint2, ans, labels) {
	this.title = title;
	this.text = text;
	this.code = code;
	this.task = task;
	this.input = input;
	this.output = output;
	this.hint1 = hint1;
	this.hint2 = hint2;
	this.ans = ans;
	this.labels = labels;
}

const taskDataBase = {
	"TASKS": {
		1:	new Task(
			"Письмо матери",
"Иван Анатольевич Терентьев пишет письмо своей матери в деревню.\n\
Получается, правда, не слишком душевно:",
			'print("Что с ебалом? Дед живой?")',
			"Помогите Ивану Анатольевичу написать нормальное письмо домой.",
			"-",
			"С лицом всё хорошо. Родился сын.",
			"Требуется изменить выводимое сообщение.",
			"Строка, переданная функции, и строка на выводе должны совпадать.",
			'print("С лицом всё хорошо. Родился сын.")',
			[LABELS['IO'].nameTag]
		),

		2:	new Task(
			"Привет из 2015",
"Oxxxymiron пишет текст для своего предстоящего Versus Battle.\n\n\
<i>Говно, залупа, пенис, хер, давалка, хуй, блядина\n\
Головка, шлюха, жопа, член, еблан, петух… мудила\n\
Рукоблуд, ссанина, очко, блядун, вагина\n\
Сука, ебланище, влагалище, пердун, дрочила\n\
Пидор, пизда, туз, малафья\n\
Гомик, мудила, пилотка, манда\n\
Анус, вагина, путана, педрила\n\
Шалава, хуила, мошонка, елда… раунд!</i>",
'l1 = "Говно, залупа, пенис, хер, давалка, хуй, блядина"\n\
l2 = "Головка, шлюха, жопа, член, еблан, петух… мудила"\n\
l3 = "Рукоблуд, ссанина, очко, блядун, вагина"\n\
l4 = "Сука, ебланище, влагалище, пердун, дрочила"\n\
l5 = "Пидор, пизда, туз, малафья"\n\
l6 = "Гомик, мудила, пилотка, манда"\n\
l7 = "Анус, вагина, путана, педрила"\n\
l8 = "Шалава, хуила, мошонка, елда… раунд!"\n\n\
print(l1, l2, l3, l4, l5, l6, l7, l8)',
			"Мирон написал код и хочет, чтобы каждая строка его произведения была распечатана на новой строке консоли.\nОднако, его решение неверно.\n\nИсправьте ошибку.",
			"-",
"Говно, залупа, пенис, хер, давалка, хуй, блядина\n\
Головка, шлюха, жопа, член, еблан, петух… мудила\n\
Рукоблуд, ссанина, очко, блядун, вагина\n\
Сука, ебланище, влагалище, пердун, дрочила\n\
Пидор, пизда, туз, малафья\n\
Гомик, мудила, пилотка, манда\n\
Анус, вагина, путана, педрила\n\
Шалава, хуила, мошонка, елда… раунд!",
			'Аргумент <b>sep</b> функции <b>print()</b> отвечает за то, чем будут отделены данные друг от друга.',
			"Символ переноса строки - <b>'\\n'</b>.",
			'<b>print(l1, l2, l3, l4, l5, l6, l7, l8, sep="\\n")</b>',
			[LABELS["IO"].nameTag, LABELS["VAR"].nameTag]
		),

		3:	new Task(
			"ggg",
			"Пусть существует абстрактная программа:",
'print("10 + 5")\n\
print("= 15")',
			"Требуется вывести данный пример на одной строке.",
			"-",
			"10 + 5 = 15",
			'Аргумент <b>end</b> функции <b>print()</b> отвечает за то, чем будет закончен вывод строки.',
			"Приравняв <b>end</b> к строке без символа <b>'\\n'</b> вывод не будет перенесён.",
'print("10 + 5", end=" ")\n\
print("= 15")',
			[LABELS["IO"]]
		)
	},




	"PROJECTS": {
		1:	new Task(
			"Калькулятор",
'Требуется написать функцию-калькулятор, с поддержкой всех доступных арифметических операций.\n\n\
Формат входных данных:\n\
В первой строке идёт целое число N - количество примеров.\n\
Затем идут N строк, каждая в формате "A op B", где A, B - числа, op - арифметический оператор.\n\n\
Шаблон проекта:',
'def calculator(string):\n\
	/* Новый код идёт сюда */\n\
	return string\n\n\
def main():\n\
	n = int(input())\n\
	for _ in range(n):\n\
		task = input()\n\
		print(calculator(task))\n\n\
main()',
		"",
"3\n\
5 + 2\n\
1 - 10\n\
4 ** 2",
"7\n\
-9\n\
16",
		"Список арифметических операций: +, -, *, **, /, //, %.",
		'При делении на 0 следует вернуть "Деление на ноль".',
		'<a href="https://pastebin.com/4XLpviF5" target="blank">Решение на PasteBin</a>',
		[LABELS['IO'].nameTag, LABELS['VAR'].nameTag, LABELS['MATH'].nameTag, LABELS['OPS'].nameTag, LABELS['COMP'].nameTag, LABELS['STR'].nameTag, LABELS['PROC'].nameTag, LABELS['FUNC'].nameTag]
		)
	}
};

const taskDataBase_size = Object.keys(taskDataBase["TASKS"]).length;
const projectDataBase_size = Object.keys(taskDataBase["PROJECTS"]).length;
