# TakidaFront

Пользовательский UI

## Установка зависимостей

Необходимо установить Node.js 14.2.0 (+ npm 6.14.5).
Запустить `npm ci` для установки зафиксированных зависимостей.

## Запуск SSR

Запустить `npm run build:ssr && npm run serve:ssr`.
Таким образом приложение скомпилируется, и будет запущен
Node Express server для раздачи приложения на http://localhost:4000

## Запуск SSR development server (only development)

Запустить `npm run dev:ssr`.
Будет запущен тестовый Node Express server
для раздачи приложения на http://localhost:4200

## Настройка environments

В `src/environments/` лежат 2 файла. `environment.ts` используется при разработке в режиме dev server.
`environment.prod.ts` используется в продакшн-сборке.
Устанавливаются основной путь до api-сервиса (`url`) и до хранилища изображений (`imageStore`).

## Local development server

Запустить `ng serve` для старта dev server'а.
Перейти в браузере на `http://localhost:4200/`.

## Local build

Запустить `ng build --prod` для продакшн-сборки приложения.
Готовый билд будет лежать в директории `dist/`.

## Апдейт локализации

Команда `npm run update-locale` парсит все строки в файлах шаблонов компонентов,
требующие локализации (| translate), и помещает их в файлы `src/assets/locale/<language_name>.json`,
добавляя новые строки к уже имеющимся.
