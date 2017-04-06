from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch()

"""
Add information about courses to database
@param dictionary of following format:
    courses = {
        "DD1234": {
            "name_en": "Course name",
            "name_sv": "Course name",
            "hp": 0,
            "href": "http://kth.se...",
            "eligibility": {
                "courses": [[]],
                "credits": "Credits for course",
                "recommend": "Recommended prerequisites"
@return Update instances of database
"""

def addToDatabase(courses):
    for courseID, course in courses.items():
        course["courseID"] = courseID
        cID = convertToKey(courseID)
        res = es.index(index="courses", doc_type="course", id=int(cID), body=course)

"""
Convert course code to a unique key of digits by convert letters to ASCII
@param str Course code. E.g. DD1327
@return str Key. E.g. 68681327
"""

def convertToKey(code):
    cID = ""
    for s in code:
        if s.isalpha():
            cID += str(ord(s))
        else:
            cID += s
    return cID

"""
Return instances of the database (default view 5 instances)
@param None
@return None
"""

def match_all():
    res = es.search(index="courses", body={"query": {"match_all": {}}})
    print(res)

"""
Search for a course, by it's course code.
@param str Course code
@return None
"""

def getCourse(code):
    try:
        res = es.get(index="courses", doc_type='course', id=convertToKey(code))
        return res['_source']    
    except:
        return "Not found"


"""
Search for a course with non exact string
"""
def search(s, results = 5):
    res = es.search(index="courses", body={"query":{
        "bool" : {
            "should" : [
                {"match":{"name_sv": s}},
                {"match":{"name_en": s}}
            ]
    }}})
    top = filterRes(res, results)
    return top

def filterRes(res, results):
    hits = res["hits"]["hits"]
    if len(hits) < results:
        return hits
    return hits[0:results]

"""
For test purposes (format of courses in database)
"""

courses = {
    "DD1234": {
        "name": "programmering",
        "hp": 0,
        "eligibility": {
            "courses": [[]],
            "credits": "",
            "recommend": ""
        }
    },
    "DD1122": {
        "name": "databas",
        "hp": 0,
        "eligibility": {
            "courses": [[]],
            "credits": "",
            "recommend": ""
        }
    }
}


def addCoursesToDatabase(courses, es=None):
    if not es:
        es = Elasticsearch()
    for courseID, course in courses.items():
        course["courseID"] = courseID
        cID = ""
        for s in courseID:
            if s.isalpha():
                cID += str(ord(s))
            else:
                cID += s
        res = es.index(index="courses", doc_type="course", id=int(cID), body=course)


# 
# doc = {
#     'author': 'kimchy',
#     'text': 'Elasticsearch: cool. bonsai cool.',
#     'timestamp': datetime.now(),
# }
# res = es.index(index="courses", doc_type='course', id="DD1234", body=doc)
# print(res['created'])
# 
# res = es.get(index="test-index", doc_type='tweet', id=1)
# print(res['_source'])
# 
# es.indices.refresh(index="test-index")
# 
# res = es.search(index="test-index", body={"query": {"match_all": {}}})
# print("Got %d Hits:" % res['hits']['total'])
# for hit in res['hits']['hits']:
#     print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])
