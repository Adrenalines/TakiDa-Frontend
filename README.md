# TakidaFront

Пользовательский UI

## Установка зависимостей

Необходимо установить Node.js 12.18.0 (+ npm 6.14.4) или выше.
Запустить `npm ci` для установки зафиксированных зависимостей.

## Сборка приложения с SSR

Запустить `npm run build:ssr`.
Готовый билд приложения будет лежать в директории `dist/`.

## Конфиг nginx

Необходимо добавить:
```
location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

## Запуск сервера для раздачи приложения с SSR

Готовый билд из /dist поместить на сервер.
Внутри запустить `node ./dist/takida-front/server/main.js`.
Существует зависимость от рабочей директории в которой выполняется команда (см. WorkingDir Systemd Unit'а  в примере ниже).

## Пример Unit-файла для systemd

```
[Unit]
Description=Taki-Da Web Site Server Side Rendering server
Documentation=https://gitlab.com/takida/takida-front
After=network-online.target
Wants=network-online.target

[Service]
User=root
ExecStart=node /var/www/html/ssr/dist/takida-front/server/main.js

TimeoutStopSec=5s
KillSignal=SIGINT

[Install]
WantedBy=multi-user.target
```

## Локальный запуск SSR production server

Запустить `npm run build:ssr && npm run serve:ssr`.
Таким образом приложение скомпилируется, и будет запущен
Node Express server для раздачи приложения на http://localhost:4000

## Локальный запуск SSR development server (only development)

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
