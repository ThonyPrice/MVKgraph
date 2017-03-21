from datetime import datetime
from elasticsearch import Elasticsearch
#es = Elasticsearch()


## Testcourses
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
