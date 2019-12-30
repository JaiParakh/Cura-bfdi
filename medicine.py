# THIS SCRIPT ADDS THE LIST OF SALT OF ANY PARTICULAR MEDICINE
# AND PRINT THE LIST AS WELL
# ALSO UPDATES THE SAME TO FIREBASE
import requests
import sys
import firebaseConfig
from bs4 import BeautifulSoup
# import pandas as pd
# import numpy as np
html = requests.get("https://www.1mg.com/drugs/pan-d-capsule-343042")
salt_class = "saltInfo DrugHeader__meta-value___vqYM0"
drug_name_class = "DrugHeader__title___1NKLq"
best_price_class = "DrugPriceBox__best-price___32JXw"
prod_class = "style__horizontal-card___1Zwmt"
search = "https://www.1mg.com/search/all?name="
base = "https://www.1mg.com"
salt_class_new = "FactBox__rowContent__JHFU7 FactBox__flexCenter__zYkHn col-3"

def getMedicineInfo(med_name):
    med_name = med_name.strip().split(" ")
    medname =""
    for j in med_name:
        medname = medname+j+"+"
    medname = medname[:-1]
    #print(medname)
    html = requests.get(search+medname)
    data = BeautifulSoup(html.text,"html.parser")
    a = data.find(class_=prod_class)
    if a == None:
        return ["NOT FOUND"]
    add = a.a['href']
    html1 = requests.get(base+add)
#     print(html1)
    data1 = BeautifulSoup(html1.text,"html.parser")
    #         drug = data1.find(class_ =drug_name_class)
    #         price = data1.find(class_ =best_price_class)
    salt = data1.find(class_ = salt_class_new)
    if salt == None:
        return ["NOT FOUND"]
    salt = salt.text
    salts = salt.split("+")
    ans = []
    for component in salts:
        index = component.find("(")
        if index == -1:
            ans.append(component)
        else:
            ans.append(component[:index].strip())
    return ans

if __name__ == "__main__":
    medName = open("input.txt","r").read()
    saltNameList = getMedicineInfo(medName)

    if saltNameList != ["NOT FOUND"]:
        firebaseConfig.pushToFirebase(medName,saltNameList,"dummy/medicine")

    print(saltNameList)
    #FLUSH!!!!
    sys.stdout.flush()
    # print(firebaseConfig.getMedicineAllergyChance(["salt1"]))
    # saltList, saltfreq = firebaseConfig.getDataFromFirebase("dummy/medicine")
    # print(saltList)
    # print(saltfreq)