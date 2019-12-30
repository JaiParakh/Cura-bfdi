# THIS SCRIPT CALCULATES THE ALLERGY CHANCES OF ANY PARTICULAR MEDICINE
# INPUT = MEDICINE NAME
# OUTPUT = PROBABLITY OF THE SAME
import medicine
import firebaseConfig
import sys
# import firebaseConfig
medName = open("input.txt","r").read()
saltNameList = medicine.getMedicineInfo(medName)
print(firebaseConfig.getMedicineAllergyChance(saltNameList,"dummy/medicine"))
#   FLUSH!!!
sys.stdout.flush()