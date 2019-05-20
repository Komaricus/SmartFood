import sys
import requests
import json
import random


def generate_scaner_name():
    name = ""

    for i in range(6):
        name += str(random.randint(0, 9))

    return name


def barcode_reader(name):

    buffer = input('Enter a code: ')

    if buffer == "":
        return True

    url = "https://smart-food-app.herokuapp.com/api/v1/scaner/update/" + name

    headers = {
        'cache-control': "no-cache",
    }

    payload = {'barcodes': buffer}

    response = requests.request("POST", url, headers=headers, data=payload)

    print("Barcode added")
    return False


def create_scaner(name):

    url = "https://smart-food-app.herokuapp.com/api/v1/scaner/" + name

    headers = {
        'cache-control': "no-cache",
    }

    response = requests.request("POST", url, headers=headers)

    if response.status_code == 200:
        print('Scaner successfully created.')


def delete_scaner(name):
    url = "https://smart-food-app.herokuapp.com/scaner/" + name

    headers = {
        'cache-control': "no-cache",
    }

    response = requests.request("DELETE", url, headers=headers)

    if response.status_code == 200:
        print('Scaner deleted.')


if __name__ == '__main__':
    print('Welcome to Raspberry Pi Barcode Scaner')
    scaner_name = generate_scaner_name()
    print("To access scaner from site, enter a code: " + scaner_name)
    create_scaner(scaner_name)
    done = False
    while not done:
        done = barcode_reader(scaner_name)
    delete_scaner(scaner_name)
    print('Goodbye!')
