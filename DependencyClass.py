
class DependencyObject():
    
    def __init__ (self):
        self.courses = []
        self.credits = "No other requirements"
    
    def setCredits (self, credits):
        if len(credits) > 0:
            self.credits = " ".join(credits[0])

    # Debug representation
    def __str__ (self):
        return "DepObj; \nCourses: {courses}\
                        \nCredits: {credits}".format(
            courses = self.courses, 
            credits = self.credits
        )
        
    def __repr__(self):
        return self.__str__()