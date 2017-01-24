import urllib2, json

"""
Downloads and returns a list of all departments on KTH
"""
def getDepCodes():
    response = urllib2.urlopen('https://www.kth.se/api/kopps/v2/departments.sv.json')
    html = response.read()
    d = json.loads(html)
    return [x['code'] for x in d]

"""
Downloads all courses associated with the department.
@param department department code, eg "DD", "SF"
@return python list with course codes related to the department or None if that fails
"""
def getCourses(department):
    response = urllib2.urlopen('https://www.kth.se/api/kopps/v2/courses/{}.json?l=en'.format(department))
    try:
        d = json.loads(response.read())['courses']
        return [x['code'] for x in d]
    except e:
        print("Department {} does not exist".format(department))
        print(e)
        return None



"""
Downloads eligibility text to given course
@param code course code
@return couse eligibility text
"""
def getEligibility(code):
    # TODO: write function
    return ""
