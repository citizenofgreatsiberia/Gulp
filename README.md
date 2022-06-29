# Gulp assembly
___
## В сборке используются следующие плагины
* [browser-sync] (https://www.npmjs.com/package/browser-sync)
(автоматически отображает в браузере изменения исходных файлов)
* [gulp-autoprefixer] (https://www.npmjs.com/package/gulp-autoprefixer)
(добавляет вендорные префиксы CSS)
* [gulp-babel] (https://www.npmjs.com/package/gulp-babel)
(обеспечивает выполнение js-кода старыми версиями браузеров)
* [gulp-clean-css] (https://www.npmjs.com/package/gulp-clean-css)
(минифицирует CSS)
* [gulp-file-include] (https://www.npmjs.com/package/gulp-file-include)
(позволяет использовать подключать модули к HTML-файлу)
* [gulp-group-css-media-queries] (https://www.npmjs.com/package/gulp-group-css-media-queries)
(группирует медиазапросы в CSS и размещает их в конце файла стилей)
* [gulp-uglify-es] (https://www.npmjs.com/package/gulp-uglify-es)
(минифицирует JS)
* [gulp-sass] (https://www.npmjs.com/package/gulp-sass)
(позволяет использовать синтаксис SASS/SCSS при работе с проектом) 

___
## Перед стартом проекта
Скачать все необходимые пакеты:
```
npm i
```
---
## Как использовать
Все исходные файлы проекта размещаются в папке src. <br>
Сборка проекта осуществляется в папку dist.

Для инициализации сборки используется команда:
```
gulp
```

Для очистки проекта:
```
gulp clean
```
