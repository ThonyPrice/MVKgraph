import re

# TODO: Special characters to replace while adding data;
# &#64257; == fi
# &#160; = (non-breaking space) 
# &#180; = ´ 
# &#183; = ·
# &#229; = å 
# &#228; = ä  
# &#246; = ö
# &#8217; = ’
# &#8226; = •

class DependencyObject():
    
    def __init__(self):
        self.courses = []
        self.credits = ""
        self.recommend = ""
    
    def setCredits(self, credits):
        # TODO: Correct special characters (e.g. &#160)
        if len(credits) > 0:
            self.credits = self.rmBadEncoding(" ".join(credits[0]))
        
    def setRecCourses(self, rec):
        # TODO: Correct special characters (e.g. &#160)
        if len(rec):
            tmp = ""
            for x in rec:
                tmp += " ".join(x) + ". "
            self.recommend = self.rmBadEncoding(tmp)
    
    def rmBadEncoding(self, string):
        string = re.sub('\s&#8217;', "'", string)
        string = re.sub('&#160;', "", string)
        string = re.sub('&#246;', "o", string)
        string = re.sub('&#229;', "a", string)
        string = re.sub('&#195;&#182;', "o", string)
        string = re.sub('</li><li>|<p>|</p>', ' ', string)
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
