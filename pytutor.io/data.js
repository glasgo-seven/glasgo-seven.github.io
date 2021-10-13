function Label(id, nameTag) {
	this.id = id;
	this.nameTag = nameTag;
	this.link = './filter.html?' + id + '=' + nameTag;
}

const LABELS = {
	'BASE':	new Label('BASE', 'Basics'),
	'PROC':	new Label('PROC', 'Procedural_Programming'),
	'OOP':	new Label('OOP', 'Object_Oriented_Programming'),
	'EXT':	new Label('EXT', 'Extra'),

	'IO':	new Label('IO', 'Input/Output'),
	'VAR':	new Label('VAR', 'Variables'),
	'MATH':	new Label('MATH', 'Arithmetic_Operations'),
	'STR':	new Label('STR', 'Strings'),
	'OPS':	new Label('OPS', 'Statements'),
	'COMP':	new Label('COMP', 'Comparison'),
	'LIB':	new Label('LIB', 'Modules'),

	'DS':	new Label('DS', 'Data_Structures'),
	'FUNC':	new Label('FUNC', 'Functions'),
	'REC':	new Label('REC', 'Recursion'),

	'CLS':	new Label('CLS', 'Classes'),
	'OBJ':	new Label('OBJ', 'Objects'),

	'FIL':	new Label('FIL', 'Files'),
	'DAT':	new Label('DAT', 'Dates'),
	'GUI':	new Label('GUI', 'GUI')
};

function Task(title, text, code, task, input, output, hint1, hint2, ans, labels, sourse=null) {
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
	this.sourse = sourse;
}


const taskDataBase = {
	"TASKS": {
		1:	new Task(
			"Письмо матери",
			"Иван Анатольевич Терентьев пишет письмо своей матери в деревню.\n\
Получается, правда, не слишком душевно:",
			'print("Что с ебалом? Дед живой?")',
			"Помогите Ивану Анатольевичу написать нормальное письмо домой.",
			null,
			"С лицом всё хорошо. Родился сын.",
			"Требуется изменить выводимое сообщение.",
			"Строка, переданная функции, и строка на выводе должны совпадать.",
			'print("С лицом всё хорошо. Родился сын.")',
			[LABELS['BASE'], LABELS['IO']]
		),

		2:	new Task(
			"Зодиакальный юмор",
			"Даны две части анекдота:",
'part1 = "Ты Рыба,"\n\
part2 = "а я Пиво!"\n\n\
print()',
			"Требуется вывести анекдот одной строкой.",
			null,
			"Ты Рыба, а я Пиво!",
			"Нужно передать обе переменные в фукнцию <b>print()</b>.",
			"Просто передав любое количество переменных через запятую, они будет выведены через пробел.",
			"<b>print(part1, part2)</b>",
			[LABELS['BASE'], LABELS['IO'], LABELS['VAR']]
		),

		3:	new Task(
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
			null,
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
			[LABELS['BASE'], LABELS['IO'], LABELS['VAR']]
		),

		4:	new Task(
			"По всем признакам ты бармен...",
			"Дан рецепт коктейля:",
'print("ПИВО + СИДР")\n\
print("= ПИДР")',
			"Требуется вывести рецепт одной строкой.",
			null,
			"ПИВО + СИДР = ПИДР",
			'Аргумент <b>end</b> функции <b>print()</b> отвечает за то, чем будет закончен вывод строки.',
			"Приравняв <b>end</b> к строке без символа <b>'\\n'</b> вывод не будет перенесён.",
'print("ПИВО + СИДР", end=" ")\n\
print("= ПИДР")',
			[LABELS['BASE'], LABELS['IO']]
		),

		5:	new Task(
			"Квадратное уравнение",
			"Дано квадратное уравнение вида ax<sup>2</sup> + bx + c = 0.\nАргументы a, b и с определены:",
'a = 4\n\
b = 10\n\
c = 25\n\n\
print()',
			"Выведите уравнение.",
			null,
			"4x^2 + 10x + 25 = 0",
			"Лучше всего для вывода использовать f-Строку.",
			"Для вывода переменной <b>P</b> нужно использовать формат <b>{P}</b>.",
			'print(f"{a}x^2 + {b}x + {c} = 0")',
			[LABELS['BASE'], LABELS['IO'], LABELS['VAR']]
		),

		6:	new Task(
			"Не разговаривай с незнакомцами.",
			'Это видео задание. <a href="https://www.youtube.com/watch?v=KT2rOoPTa2U" target="blank">Источник.</a>',
			null,
"Воспроизведите диалог с чтением вводных данных.\n\
Примечание: знак <b>></b> в выводе показывает строку, на которой считываются данные.",
			"Тони",
			"> Тебя как звать? Тони\nИди нахуй, Тони!",
			"Для чтения входных данных используется функция <b>input()</b>.",
			"Передав функции <b>input()</b> строку, она будет распечатана перед чтением данных.",
'name = input("Тебя как звать?")\n\
print(f"Иди нахуй, {name}!")',
			[LABELS['BASE'], LABELS['IO'], LABELS['VAR']]
		),

		7:	new Task(
			"Хочу пиво.",
			"Даня Милохин хочет купить пиво, но ему ещё нет 18 лет.",
			null,
			"Даня вводит свой возраст, программа должна вернуть удвоенное введённое значение.",
			"14",
			"28",
			"Функция <b>input()</b> считывает <b>строку</b> с ввода. Требуется привести данные к нужному типу.",
			"Функция <b>int()</b> приводит полученную строку к типу <b>int</b>.",
'age = int(input()) * 2\nprint(age)',
			[LABELS['BASE'], LABELS['IO'], LABELS['VAR'], LABELS['MATH']]
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
		[LABELS['IO'], LABELS['VAR'], LABELS['MATH'], LABELS['OPS'], LABELS['COMP'], LABELS['STR'], LABELS['PROC'], LABELS['FUNC']]
		)
	}
};

const taskDataBase_size = Object.keys(taskDataBase["TASKS"]).length;
const projectDataBase_size = Object.keys(taskDataBase["PROJECTS"]).length;
