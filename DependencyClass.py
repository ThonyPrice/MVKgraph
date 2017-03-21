import re

class DependencyObject():

    def __init__(self):
        self.courses = []
        self.credits = ""
        self.recommend = ""
        
    def toDict(self):
        return {    "courses"   : self.courses,     \
                    "credits"   : self.credits,     \
                    "recommend" : self.recommend    }

    def toDict(self):
        return {
            "courses": self.courses,
            "credits": self.credits,
            "recommend": self.recommend
        }
        
    def setCredits(self, credits):
        if len(credits):
            self.credits = self.rmBadEncoding(credits)

    def setRecCourses(self, rec):
        if len(rec):
            self.recommend = self.rmBadEncoding(rec)

    def rmBadEncoding(self, raw_string):
        string = ""
        for x in raw_string:
            string += " ".join(x) + ". "
        string = re.sub('\s&#8217;', "'", string)        
        string = re.sub('&#160;', "", string)
        string = re.sub('&#180;', "´", string)
        string = re.sub('&#229;', "a", string)        
        string = re.sub('&#228;', "a", string)
        string = re.sub('&#246;', "o", string)
        string = re.sub('&#195;&#182;', "o", string)
        string = re.sub('&#64257;', "fi", string)
        string = re.sub('</?li>|</?p>|</?strong>|</?ul>|</?ol>', '', string)
        return string

    # Debug representation
    def __str__ (self):
        return "DepObj; \nCourses: {courses}\
                        \nCredits: {credits}\
                        \nRecomen: {recommend}".format(
            courses = self.courses,
            credits = self.credits,
            recommend = self.recommend)

    def __repr__(self):
        return self.__str__()
