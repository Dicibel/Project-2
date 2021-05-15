class toDoList {
    constructor(task) {
            this.list = [task];
            this.countTask = 2;
            this.flag = 0;
        }
        // Инициализации методов класса

    init() {
        this.setEventListenerForButton();
        this.setEventListenerForSort();
        this.setEventListenerForRemove(document.querySelector('.task__img'));
        // console.log(this.list);
    }

    //Обработчик события при нажатии на кнопку Добавить

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

    //Обработчик события при наведении или нажатии на сортировку
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

    // Обработчик событий при наведении или нажатии на крестик
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

    //Добавление задачи в список.
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

    // Удаление элемента из списка задач

    removeTask(element) {
        //Удаляем элемент из массива списка задач
        if (this.list.length !== 1) {
            this.list = this.list.filter((item) => {
                return item.querySelector('.task__input').name !== element;
            });
        } else {
            this.list[0].querySelector('.task__input').value = '';
        }

        //Обновляем список задач на странице
        this.updateList();
    }

    //Сортировка
    sort() {
        //Сортируем массив от меньшего к большему
        this.list = this.list.sort((task1, task2) => {
            let value1 = task1.querySelector('.task__input').value.toLowerCase();
            let value2 = task2.querySelector('.task__input').value.toLowerCase();

            if (value2 > value1) {
                return -1;
            } else {
                return 1;
            }
        });

        //Разворчаиваем массив, если нужно от большего к меньшему
        if (this.flag === 1) {
            this.list.reverse();
        }

        //Обновляем список задач на странице
        this.updateList();
    }

    //Обновление списка задач на странице 
    updateList() {
        //Удаляем текущий список задач со страницы
        let inputField = document.querySelector('.input-field');
        inputField.innerHTML = '';

        //Добавляем введенные задачи
        this.list.forEach((element) => {
            inputField.append(element);
        });
    }
}

let task = document.querySelector('.task')
let list = new toDoList(task);
list.init();