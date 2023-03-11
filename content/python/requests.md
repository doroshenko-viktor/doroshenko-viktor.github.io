---
title: Python - Requests
date: "2023-02-05"
description: "Python `requests` library"
---

The requests module makes it easy to make `HTTP` requests in Python. Here is an example of how to make a GET request to a 
website using the `requests.get()` function:

Copy code
import requests

response = requests.get('https://www.example.com')

print(response.status_code)
print(response.content)
In this example, the requests.get() function is used to make a GET request to the website 'https://www.example.com'. The response returned by the server is stored in the response variable. The status_code attribute of the response object can be used to check the status of the request. And response.content will give you the response content.

You can also pass query parameters and custom headers to the GET request.

Copy code
import requests

payload = {'key1': 'value1', 'key2': 'value2'}
headers = {'content-type': 'application/json'}

response = requests.get('https://www.example.com', params=payload, headers=headers)

print(response.status_code)
print(response.content)
In this example, the params attribute is used to pass query parameters to the GET request. The headers attribute is used to pass custom headers to the GET request.



The requests module makes it easy to make POST requests in Python. Here is an example of how to make a POST request to a website using the requests.post() function:

Copy code
import requests

payload = {'key1': 'value1', 'key2': 'value2'}
headers = {'content-type': 'application/json'}

response = requests.post('https://www.example.com', data=payload, headers=headers)

print(response.status_code)
print(response.content)
In this example, the requests.post() function is used to make a POST request to the website 'https://www.example.com'. The payload data that needs to be sent is passed as the data attribute. In this example, it's a json payload. The headers attribute is used to pass custom headers to the POST request. The response returned by the server is stored in the response variable. The status_code attribute of the response object can be used to check the status of the request. And response.content will give you the response content.

You can also pass the payload data in the form of json by using json attribute instead of data like this:

Copy code
import requests

payload = {'key1': 'value1', 'key2': 'value2'}

response = requests.post('https://www.example.com', json=payload)

print(response.status_code)
print(response.content)
It will automatically set the content-type header to application/json and also converts python dict to json payload.

Additionally, you can also send files, multipart/form-data, etc. by using different attributes like files, data, json etc.
