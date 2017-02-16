from DependencyClass import DependencyObject
from pyparsing import *
# A parsing package not included in python default library
# Avaliable at: http://pyparsing.wikispaces.com/

"""
Extract dependencies in text to dependency object
@param course eligibility text
@return DependencyObject with dependent courses etc. as attributes
"""

def parseText(text):
    Dependency = DependencyObject()
    Dependency.courses = getDepCourses(text)
    Dependency.setCredits(getDepCredits(text))
    Dependency.setRecCourses(getRecomendCourses(text))
    # print(Dependency)
    return Dependency
    
"""
Parse for courses in text
@param course eligibility text
@return a list of lists. E.g. [[X,Y][Z]] should be interpreted as courses
        (X or Y) and Z.
"""

def getDepCourses(text):    
    course = Regex('([A-Z]{2}|\d[A-Z])(\d{4}|\d{3}[A-Z])')
    orWord = oneOf('or eller /', caseless=True)
    andWord = oneOf('and + och also', caseless=True)
    signs = oneOf('- , . ')
    parseC= OneOrMore(\
                Suppress(Optional(orWord)) + course + \
                Suppress(Optional(OneOrMore(~orWord + (Word(alphas)^signs)))) +\
                OneOrMore(Suppress(orWord) + course) + \
                Suppress(Optional(OneOrMore(\
                    (Word(alphas) ^ signs) + ~(andWord + course) + \
                    ~(Optional(OneOrMore(alphas)) + andWord + \
                    (Optional(OneOrMore(alphas)))))) + \
                    Optional(Suppress(orWord) + course))) \
                ^ OneOrMore(course)
    return parseC.searchString(text).asList()

"""

"""

def getDepCredits(text):    
    eduLevel = Regex('[P|p]h[d|.\s[D|d].??') ^ oneOf('Bachelor Master', caseless = True)
    amount = CaselessLiteral('At least') ^ CaselessLiteral('Completed')
    notOfInterest = CaselessLiteral('single course students:') ^ CaselessLiteral('Non-program students,')
    specCase1 = CaselessLiteral('All courses that are required for issuing the Degree of')
    # TODO: Credits can be represented with commas (e.g. 7,5 hp)    
    credits =       MatchFirst(Suppress( notOfInterest + SkipTo('.'))) \
                    ^ (Optional(amount) + Word(nums, max=3) + Optional('of the') + \
                    (oneOf('university credits ects hp', caseless=True) ^
                    CaselessLiteral('higher education credits')) + \
                    SkipTo('.', include=False)) ^ \
                    (Optional(specCase1) + eduLevel + SkipTo('.'))
    return credits.searchString(text)
    
def getRecomendCourses (text):
    startWord = Regex('[A-Z][a-z]+') ^ Suppress(oneOf('. ,'))    
    recommended =   (MatchFirst(startWord) \
                    ^ OneOrMore(~CaselessLiteral('Recommended') + \
                    Word(alphas))) + \
                    CaselessLiteral('Recommended') + \
                    SkipTo('.')
    return recommended.searchString(text)

