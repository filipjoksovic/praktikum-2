FROM python:3.9.16-bullseye

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install ffmpeg -y

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
COPY requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install "git+https://github.com/openai/whisper.git"

COPY . .

EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]