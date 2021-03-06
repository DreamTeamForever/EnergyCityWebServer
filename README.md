# Город Лондон
---

### Объекты стенда

Потребители могут быть подключены к поставщикам только через подстанции. Уличное освещение пока хер знает, как будет работать. Управление погодой происходит по отдельной линии связи, и управляется отдельно. 
Потребители:
- Микрорайон (x6);
- Больница (x2);
- Завод (x2);
- Приборы уличного освещения.

Поставщики:
- Ветрогенератор;
- Солнечная батарея;
- Аккумулятор (х3);
- Дизельный генератор (х3).

Подстанции:
- Главная подстанция (х1);
- Миниподстанция (х1).

Управление погодой:
- Вентилятор (х1);
- Светодиодная лампа (х2).

Описание объектов имеет следующий вид:
```sh
[
	{
	    object_id	= (int)
	    object_name = (string)
		object_type	= (string)
        table_model = (string)
        image_src   = (string)
		position    =   {
		                    x_axis = (int)
		                    y_axis = (int)
		                }
		active      = (bool)
		online      = (bool)
	}
]
```
где:
- object_id: идентификатор объекта;
- object_name: Имя объекта на кириллице;
- object_type: тип объекта;
- table_model: идентификатор или имя модели;
- image_src: путь до иконки объекта;
- position: позиция объекта;
- active: статус логического подключения объекта;
- online: статус подключенного объекта.

---

### Таблица модели

Таблицы хранит в себе 24 значения и может быть нескольких видов:
- Таблица потребления объектов типа потребителя на сутки, выходные дни (СБ,ВС);
- Таблица потребления объектов типа потребителя на сутки, рабочие дни (ПН-ПТ);
- Таблица работы объектов типа "Управление погодой" на сутки;

```sh
[
	{
	    model_id	= (int)
	    model_name  = (string)
		model_type	= (string)
        data        =   [
                            {
                                time_point  = (int)
                                value       = (double)
                            }
                        ]
	}
]
```

где:
- model_id: идентификатор модели;
- model_name: Имя модели на кириллице;
- model_type: тип модели;
- data: массив значений  характеристики, 24 значения.

---

### Карта связей

Карта содержит в себе все связи, которые необходимо отобразить на данный момент.

```sh
{
    parent          = object_id
    child           = object_id
    relations_type  = (string)
    input           =   [
                            {
                                parent          = object_id
                                child           = object_id
                                relations_type  = (string)
                                input           = [{}]
                                output          = [{}]
                            }
                        ]
    output  =           [
                            {
                                parent          = object_id
                                child           = object_id
                                relations_type  = (string)
                                input           = [{}]
                                output          = [{}]
                            }
                        ]
}
```
---

### Цветовая схема города

Отображение объектов представляют собой иконку, вписанную в окружность, цвет обрамления иконки будет сигнализировать состояние объекта.

Состояния объектов: 
- зеленый: объекту достаточно энергии (потребляет и выдает ровно столько сколько надо);
- красный: нехватка мощности на объекте (требуют больше, или потребляет больше нужного);
- серый: Объект логически выключен.

Состояния связей: 
- зеленый: объект подключен к линии;
- красный: неправильное подключение объект;
- фиолетовый: отображение сетвых узлов.  
