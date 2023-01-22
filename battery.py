#!/usr/bin/python3
from pijuice import PiJuice
import json

pijuice = PiJuice(1, 0x14)

status = pijuice.status.GetStatus()
charge = pijuice.status.GetChargeLevel()

response = {
    "status":status,
    "charge":charge
}


output = json.dumps(response)

print(output)