# LightWorld — сайт сервера Minecraft

**Тема КР №2:** адаптивный многостраничный сайт-витрина на CSS-фреймворке Bootstrap.

**Автор:** Соколов Г. А., группа ЭФБО-12-25

**Сайт на GitHub Pages:** https://kreker1.github.io/kr2-bootstrap-shop/

## Описание

Сайт сервера LightWorld: главная страница, новости, лавка доната с фильтрами, страница товара, корзина с оформлением заявки, лаунчер и контакты. Сайт из КР №1 переписан на Bootstrap.

## Фреймворк и подключение

Bootstrap 5.3.8, подключён локально из папки `vendor/bootstrap/`:

```html
<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="css/custom.css">
...
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
```

`css/custom.css` подключён после Bootstrap, чтобы его правила имели приоритет. Тёмная тема включена атрибутом `data-bs-theme="dark"` у тега `html`.

## Структура проекта

```
index.html       главная
news.html        новости
catalog.html     лавка с фильтрами
product.html     страница товара
order.html       корзина и форма заявки
contacts.html    лаунчер и контакты
css/custom.css   собственные стили
js/main.js       корзина, фильтры, формы, копирование IP
vendor/bootstrap/ файлы Bootstrap
fonts/           шрифт Minecraft Rus
images/          изображения и иконки
```

## Компоненты Bootstrap

- Сетка: `container`, `row`, `col-*`
- Navbar с меню-бургером (Collapse)
- Card
- Button
- Badge
- Modal
- Accordion
- Nav Tabs и Nav Pills
- Breadcrumb
- Toast
- Alert
- List Group
- Table
- Формы: `form-control`, `form-select`, `input-group`, `form-check`, валидация

## Доработки

- Корзина на `localStorage`: сохраняется между страницами, есть счётчик на кнопке, сумма и удаление товаров.
- Поиск, фильтр по категориям и сортировка в лавке.
- Фильтр новостей по типу.
- Заявка в модальном окне с подстановкой выбранного товара.
- Проверка форм с выводом ошибок под полями.
- Копирование IP сервера по кнопке.
- Бирюзовый акцент через переопределение CSS-переменных Bootstrap.
