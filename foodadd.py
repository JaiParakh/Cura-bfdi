import firebaseConfig
import json
data = open("input.json","r")
Data = json.load(data)
firebaseConfig.pushToFirebase(Data['med_name'],Data['salt'],"dummy/food")