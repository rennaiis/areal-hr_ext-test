# HR-система 
### Стэк технологий: 
- Frontend: Vue, CSS
- Backend: NestJS, TypeORM для связи с БД, argon2 для хэширования паролей, passport-session для авторизации.
- Связь: Rest API
- Контейнеризация: Docker / docker compose
- БД: PostgreSQL
### Функции приложения 
- **Авторизация**: для доступа к приложению пользователь должен ввести логин и пароль (для тестов: логин -  init_admin, пароль - 12345678). Есть разграничение прав: пользователям с ролью "admin" разрешено работать со всеми таблицами, а пользователям с ролью "hr-manager" недоступно редактирование/просмотр таблицы "пользователи".
Права пользователей разграничены и на бэкенде, и на фронтенде, что обеспечивает полную защиту
- **CRUD** (просмотр/редактирование/удаление/добавление) для должностей, организаций, отделов (отделы имеют древовидную структуру)
- **Работа с сотрудниками**. Есть функция найма сотрудника (администратор заполняет данные о человеке, паспорте, адресе. Данные об адресе и паспорте сразу летят в свои таблицы и привязываются к создаваемому сотруднику. Кроме того, можно загружать сканы паспортов).
- Все данные о сотруднике редактируются. Кроме того, при увольнении / найме / изменении отдела или зп появляется соответствующая запись в таблице** "HR-операции"**
- Все изменения в таблицах сохраняются в таблице "история изменений". Записывается, какое поле было изменено, когда, старое и новое значение
### Скриншоты
Вход в приложение

<img width="1908" height="858" alt="Screenshot 2026-06-24 133127" src="https://github.com/user-attachments/assets/70e1c124-d0d1-4814-b061-cc5086451c76" />

Редактирование списка профессий
<img width="1895" height="848" alt="Screenshot 2026-06-24 131316" src="https://github.com/user-attachments/assets/79807718-efd0-4797-8032-3a7b4c2b3a98" />

Список организаций 
<img width="1901" height="824" alt="image" src="https://github.com/user-attachments/assets/d7c047b9-b8b9-4723-8a83-c0e932f7331a" />

Организация с развёрнутым списком отделов (один из которых в режиме редактирования) 
<img width="1900" height="814" alt="image" src="https://github.com/user-attachments/assets/467077df-1407-41db-91c4-13172ea8e22c" />
<img width="1863" height="684" alt="image" src="https://github.com/user-attachments/assets/939f2012-606b-4a0c-bb48-26649de91dc3" />

Найм нового сотрудника. Заполнение данных, паспортных данных и адреса 
<img width="1894" height="833" alt="image" src="https://github.com/user-attachments/assets/776d2666-012d-4e9c-ab32-fe5fcb3f5e1a" />
<img width="1877" height="853" alt="image" src="https://github.com/user-attachments/assets/7945dcbb-591d-4adb-81cc-35089e395392" />

После нажатия на кнопку "далее" нужно выбрать организацию, должность и отдел из выпадающих списков, а также ввести ЗП
<img width="1908" height="636" alt="image" src="https://github.com/user-attachments/assets/490bf538-26b0-46c0-8046-19f6bf640f5b" />
<img width="1897" height="479" alt="image" src="https://github.com/user-attachments/assets/816772c5-7b2c-4e88-8646-0386f83e055f" />

Список сотрудников. 
<img width="1905" height="455" alt="image" src="https://github.com/user-attachments/assets/899616e6-ad95-4b0a-8f50-17dfc9233498" />

Есть фильтрация по организации/отделу/должности. Удобно для работы с большими списками сотрудников
<img width="1897" height="252" alt="image" src="https://github.com/user-attachments/assets/6148ac81-fb3d-445b-9593-3d9fcdf9beb2" />
<img width="1894" height="187" alt="image" src="https://github.com/user-attachments/assets/4780520f-5d0a-47e9-8166-7956d44ef101" />

Можно изменить зп/отдел/должность. Для смены организации стоит уволить сотрудника и нанять заново
<img width="1903" height="491" alt="image" src="https://github.com/user-attachments/assets/7477c0a5-5e79-487b-8c78-c5ce701ae72d" />
<img width="1893" height="253" alt="image" src="https://github.com/user-attachments/assets/4d9d7c94-1dbc-44b6-bc1c-b313211745eb" />

Найм, увольнение, изменение ЗП, отдела и должности фиксируются в таблице "кадровые операции" 
<img width="1906" height="565" alt="image" src="https://github.com/user-attachments/assets/a42dba67-8881-4e2b-afa2-77de69236af7" />

Можно посмотреть и отредактировать информацию о каждом сотруднике (в том числе про паспорт и адрес)
<img width="1902" height="856" alt="image" src="https://github.com/user-attachments/assets/299aac29-dec5-419f-bd6f-22537bd9229d" />
<img width="1893" height="792" alt="image" src="https://github.com/user-attachments/assets/1f89351c-1f88-4b1c-b320-8425bd738d1b" />

 Можно просматриривать, загружать и удалять файлы сканов паспорта.
<img width="1888" height="846" alt="image" src="https://github.com/user-attachments/assets/75b96cb0-2c2b-4223-b1ec-fddf635c13bc" />

Все изменения сохраняются в таблице "история изменений" 
<img width="1893" height="851" alt="image" src="https://github.com/user-attachments/assets/8e1601d3-bed6-4fbe-8d39-d26c4127409f" />

Таблица пользователей (доступна только пользователю с ролью "админимтратор") 
<img width="1913" height="484" alt="image" src="https://github.com/user-attachments/assets/23974dd9-282c-4ad1-a899-b5ab7019faa0" />


### Cхема базы данных 
<img width="1569" height="690" alt="image" src="https://github.com/user-attachments/assets/68ccda86-3d0b-4932-b638-503519c264aa" />

> файл draw.io загрузила в папку docs

### Как запустить приложение локально на компьютере
1. Если у вас Windows и/или не установлен **Docker**, то установите его.
2. Клонируйте репозиторий (создайте папку и введите в командной строке `git clone https://github.com/rennaiis/areal-hr_ext-test`
3. Создайте файл `.env` и заполните его по примеру `.env.exapmle`
4. Введите в командной строке в корне проекта `docker compose up`. Дождитесь запуска приложения и откройте его в браузере на указанном вами порту (обычно http//:localhost:5173)
5. Введите логин и пароль для тестирования (логин: init_admin, пароль: 12345678)

 Основные команды Git в консоли

- `git init` - инициализация репризитория
- `git clone <url>` - клонирование удалённого репризитория
- `git add .` - обозгначение файлов, которые будут добавлены в следующий коммит (. - все файлы)
- `git commit -m "описание"` -  коммит и комментарий 
- `git push` - отправка изменений в удалённый репризиторий
- `git pull` - получение изменений с удалённого репризитория
- `git log` - вывод списка коммитов
- `git branch <branch_name>` - создание новой ветки
- `git checkout <branch_name>` - переключение на ветку
- `git merge <branch_name>` - слияние текущей ветки с названной
