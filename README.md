# NodeSendGmail
Example for sending email through node.js and python through gmail.

For both examples:
You will need to replace the necessary info in the .env file.
You will need to replace the email in the necessary places with your gmail email address and desired destination email

For node.js
You will need to go to the google console and create credentials for a web application. Should be for oAuth 2. Will need to go to oAuth 2 playground and give permission to those credentials to use it. I followed this tutorial and it worked, which is where the script comes from:
https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a


For python:
Please follow google quickstart guide here:
https://developers.google.com/gmail/api/quickstart/python

However, you must have a terminal with administrative permissions open when installing python packages or installation will fail.

Also, the default example only gives read only permission for email, so you will need to change that. See the top of the quickstart.py included in this repository, which has the "send" permission.

If something fails with the quickstart script, please delete token.json and rerun it.


