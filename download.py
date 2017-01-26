import urllib.request, urllib.error, urllib.parse, json

"""
Downloads and returns a list of all departments on KTH
"""
def getDepCodes():
    response = urllib.request.urlopen('https://www.kth.se/api/kopps/v2/departments.sv.json')
    str_response = response.readall().decode('utf-8')
    d = json.loads(str_response)
    return [x['code'] for x in d]

"""
Downloads all courses associated with the department.
@param department department code, eg "DD", "SF"
@return python list with course codes related to the department or None if that fails
"""
def getCourses(department):
    response = urllib.request.urlopen('https://www.kth.se/api/kopps/v2/courses/{}.json?l=en'.format(department))
    str_response = response.readall().decode('utf-8')
    d = json.loads(str_response)['courses']
    return [x['code'] for x in d]




"""
Downloads eligibility text to given course
@param code course code
@return couse eligibility text
"""
def getEligibility(code):
    # TODO: write function
    return ""
