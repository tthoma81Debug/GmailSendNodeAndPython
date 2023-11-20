import os
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64

def create_service():
    creds = Credentials.from_authorized_user_file('token.json')
    try:
        service = build('gmail', 'v1', credentials=creds)
        return service
    except Exception as error:
        print(f'An error occurred: {error}')

def create_message(sender, to, subject, message_text):
    message = MIMEMultipart()
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    msg = MIMEText(message_text)
    message.attach(msg)

    raw = base64.urlsafe_b64encode(message.as_bytes())
    raw = raw.decode()
    body = {'raw': raw}

    return body

def send_email():
    try:
        service = create_service()
        message = create_message(os.getenv('EMAIL'), 'example@example.com', 'This is coming from Python', 'This is an example email from Python. Putting lots of text here. Not sure if newlines work. going to try that now \n \n typing this into python. should originate from my gmail. setup process is a little different but not too bad. Had to run a special python script from google and generate a token.json file.')
        message = (service.users().messages().send(userId="me", body=message).execute())
        print(f'Message Id: {message["id"]}')
    except Exception as e:
        print("exception")
        print(e)

send_email()