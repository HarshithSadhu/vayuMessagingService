from twilio.rest import Client

sankarsh = "3464102111"
harshith = "2817054499"
#Account Credentials

account_sid = "AC1f155d1478d9e42d72db395fbcf5d315"
auth_token = "fddf2e5a12ff444e6f83d1cdf2515dfc"
client = Client(account_sid, auth_token)

def sendMessage(number, message):
  client.messages.create(
     to=number,
     from_="+1 402 736 6839",
     body=message
  )

messageStandard = "Congratulations! You have been selected to attend the University of Texas at Austin for Computer Science in the College of Natural Sciences"
sendMessage(sankarsh, messageStandard)
sendMessage(harshith, messageStandard)