function Task(title, text, code, task, input, output, hint1, hint2, ans) {
	this.title = title;
	this.text = text;
	this.code = code;
	this.task = task;
	this.input = input;
	this.output = output;
	this.hint1 = hint1;
	this.hint2 = hint2;
	this.ans = ans;
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
			'print("С лицом всё хорошо. Родился сын.")'
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
		'<a href="https://pastebin.com/4XLpviF5" target="blank">Решение на PasteBin</a>'
		)
	}
};

const taskDataBase_size = Object.keys(taskDataBase["TASKS"]).length;
const projectDataBase_size = Object.keys(taskDataBase["PROJECTS"]).length;
