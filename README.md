yarn
yarn dev

python -m venv environment_name
environment_name/Scripts/activate

pip install -r requirements.txt

[//]: # (pip install django django-environ django-crispy-forms crispy-bootstrap5 django-debug-toolbar django-extensions)
[//]: # (python -m pip install django-allauth argon2-cffi)

python manage.py makemigrations
python manage.py migrate

python manage.py runserver