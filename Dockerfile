FROM python:3.9.7-slim
COPY app/. .
RUN pip install --no-cache-dir -r requirements.txt
ENTRYPOINT ["./main.py"]
