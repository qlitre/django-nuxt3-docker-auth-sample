FROM amd64/python:3.10-slim
ENV PYTHONUNBUFFERED 1
ENV APP_ROOT /code
WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}
RUN pip install --upgrade pip
RUN pip install -r requirements.txt