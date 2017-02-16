import urllib.request, urllib.error, urllib.parse, json
import xml.etree.ElementTree as ET
from parse import parseText


"""
Downloads and returns a list of all departments on KTH
"""
def getDepCodes():
    response = urllib.request.urlopen('https://www.kth.se/api/kopps/v2/departments.sv.json')
    str_response = response.read().decode('utf-8')
    d = json.loads(str_response)
    return [x['code'] for x in d]


"""
Downloads all courses associated with the department.
@param department department code, eg "DD", "SF"
@return python list with course codes related to the department or None if that fails
"""
def getCourses(department):
    response = urllib.request.urlopen('https://www.kth.se/api/kopps/v2/courses/{}.json?l=en'.format(department))
    str_response = response.read().decode('utf-8')
    d = json.loads(str_response)['courses']
    return [x['code'] for x in d]


"""
Downloads eligibility text to given course
@param code course code
@return course eligibility text
"""
def getEligibility(code):
    print('\n' + code)
    response = urllib.request.urlopen('http://www.kth.se/api/kopps/v1/course/{}/plan'.format(code))
    str_response = response.read().decode('utf-8')
    tree = ET.fromstring(str_response)
    eligibility_text = tree.findall('eligibility')[-1].text
    print("Deptext:", eligibility_text)
    dependencies = parseText(eligibility_text)
    # print(dependencies)
    return dependencies


"""
Creates a dict with the course code as key and the eligibility text for the course as data.
@return dict with eligibility
"""
def getEligibilityDict():
    elDict = {}
    dept = ['ME'] # <- Only CompSci's courses. For all change to getDepCodes()
    # Competed (functioning) departments; DD, DA, DH, SF, IS, ID
    # Departments to do; ME
    for d in dept:
        codes = getCourses(d)
        for i in codes:
            try:
                elDict[i] = getEligibility(i)
                print(elDict[i])
            except IndexError:
                elDict[i] = "No requirements"
            except:
                print("Couldn't get eligibility for course: {}".format(i))
    return elDict


def testEligibility(d):
    elDict = {}
    codes = getCourses(d)
    print(codes)
    for i in codes:
        try:
            elDict[i] = getEligibility(i)
        except IndexError:
            elDict[i] = "No requirements"
        except:
            print("Couldn't get eligibility for course: {}".format(i))
    return elDict
            
