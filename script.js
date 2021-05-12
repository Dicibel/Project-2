class toDoList {
    constructor(task) {
            this.list = [task];
            this.countTask = 2;
            this.flag = 0;
        }
        /** 
         * Инициализации методов класса
         */
    init() {
        this.setEventListenerForButton();
        this.setEventListenerForSort();
        this.setEventListenerForRemove(document.querySelector('.task__img'));
    }

    /**
     * Обработчик события при нажатии на кнопку "Добавить"
     */
    setEventListenerForButton() {
        let button = document.querySelector('.button');
        button.addEventListener('click', (event) => {
            let input = document.querySelector('.task__input');

            //Добавление строки в список
            this.addTask(input.value);

            //Очистка введенного значения в поле ввода
            input.value = '';
        });
    }

    /**
     * Обработчик события при наведении или нажатии на кнопку "Сортировки"
     */
    setEventListenerForSort() {
        let sort = document.querySelector('.sort__img');
        //Событие при наведении мыши на сортировку
        sort.addEventListener('mouseover', () => {
            sort.src = this.flag !== -1 ? 'images/4.svg' : 'images/2.svg';
        });
        //Событие при убирании курсора с сортировки
        sort.addEventListener('mouseout', () => {
            sort.src = this.flag !== -1 ? 'images/3.svg' : 'images/1.svg';
        });
        //Событие при нажатии на крестик
        sort.addEventListener('click', () => {
            this.sort();
            this.flag = this.flag === 1 ? -1 : 1;
            sort.src = this.flag === 1 ? 'images/4.svg' : 'images/2.svg';
        });
    }

    /**
     * Обработчик событий при наведении или нажатии на крестик
     */
    setEventListenerForRemove(item) {
        //Событие при наведении мыши на крестик
        item.addEventListener('mouseover', () => {
            item.src = 'images/button-remove-hope.svg';
        });
        //Событие при убирании курсора с крестика
        item.addEventListener('mouseout', () => {
            item.src = 'images/button-remove.svg';
        });
        //Событие при нажатии на крестик
        item.addEventListener('click', (event) => {
            this.removeTask(event.target.previousElementSibling.name);
        });
    }

    /**
     * Добавление задачи в список.
     */
    addTask(valueTask) {
        let div = document.createElement('div');
        div.classList.add('task');

        let input = document.createElement('input');
        input.classList.add('task__input');
        input.value = valueTask;
        input.name = 'task' + this.countTask;
        input.placeholder = 'Введите задачу';
        div.append(input);

        let img = document.createElement('img');
        img.classList.add('task__img');
        img.src = 'images/button-remove.svg';
        this.setEventListenerForRemove(img);
        div.append(img);

        this.list.push(div);
        this.countTask++;

        this.updateList();
    }

    removeTask(element) {
        //Удалить элемент из массива списка задач
        if (this.list.length !== 1) {
            this.list = this.list.filter((item) => {
                return item.firstElementChild.name !== element;
            });
        } else {
            this.list[0].firstElementChild.value = '';
        }

        //Обновить список задач на странице
        this.updateList();
    }

    /**
     * Сортировка
     */
    sort() {
        //Сортировка от меньшего к большему
        this.list = this.list.sort((task1, task2) => {
            let value1 = task1.firstElementChild.value;
            let value2 = task2.firstElementChild.value;

            if (value2 > value1) {
                return -1;
            } else {
                return 1;
            }
        });

        //Реверс массива
        if (this.flag === 1) {
            this.list.reverse();
        }

        //Обновляем список задач на странице
        this.updateList();
    }

    /**
     * Обновление списка задач на странице 
     * */
    updateList() {
        //Удалить текущий список задач со страницы
        let oldInputField = document.querySelector('.input-field');
        oldInputField.remove();

        //Добавить введенные задачи
        this.list.forEach((element) => {
            newInputField.append(element);
        });

        //Создать новую область ввода, если все задачи удалены
        let newInputField = document.createElement('div');
        newInputField.classList.add('input-field');

        //Разместить область ввода на странице
        let button = document.querySelector('.sort');
        button.after(newInputField);

    }
}

let task = document.querySelector('.task')
let list = new toDoList(task);
list.init();