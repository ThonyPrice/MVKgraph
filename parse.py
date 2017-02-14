from DependencyClass import DependencyObject
from pyparsing import *
# A parsing package not included in python default library
# Avaliable at: http://pyparsing.wikispaces.com/

"""
Parse text for dependent courses and credits
@param course eligibility text
@return DependencyObject containing dependent courses and credits
"""

def parseText(text):
    Dependency = DependencyObject()
    Dependency.courses = getDepCourses(text)
    depCredits = getDepCredits(text)
    Dependency.setCredits(depCredits)
    recCourses = getRecomendCourses(text)
    Dependency.getRecommended(recCourses)
    print(Dependency)
    return Dependency
    
def getDepCourses(text):    
    course = Regex('([A-Z]{2}|\d[A-Z])(\d{4}|\d{3}[A-Z])')
    orWord = oneOf('or eller /', caseless=True)
    signs = oneOf('- , . ')
    andWord = oneOf('and + och also', caseless=True)
    keywords =  OneOrMore(\
                    Suppress(Optional(orWord)) + course + \
                    Suppress(Optional(OneOrMore(~orWord + \
                        (Word(alphas)^signs)))) + \
                    OneOrMore(Suppress(orWord) + course) + \
                    Suppress(Optional(OneOrMore((Word(alphas) ^ \
                        signs) + ~(andWord + course) + \
                        ~(Optional(OneOrMore(alphas)) + andWord + \
                        (Optional(OneOrMore(alphas)))))) + \
                    Optional(Suppress(orWord) + course))) \
                ^ OneOrMore(course)
    return keywords.searchString(text).asList()
    
def getDepCredits(text):    
    eduLevel = Regex('[P|p]h[d|.\s[D|d].?') ^ CaselessLiteral('Bacherlor')        
    # TODO: Credits can be represented with commas (e.g. 7,5 hp)    
    credits =       (~(CaselessLiteral('single course students:')) + \
                    Word(nums, max=3) + Optional('of the') + \
                    (oneOf('university credits ects hp', caseless=True) ^
                    CaselessLiteral('higher education credits')) + \
                    SkipTo('.', include=False)) ^ \
                    (eduLevel + SkipTo('.'))
    return credits.searchString(text)
    
def getRecomendCourses (text):
    startWord = Regex('[A-Z][a-z]+') ^ Suppress(oneOf('. ,'))    
    recommended =   (MatchFirst(startWord) \
                    ^ OneOrMore(~CaselessLiteral('Recommended') + \
                    Word(alphas))) + \
                    CaselessLiteral('Recommended') + \
                    SkipTo('.')
    return recommended.searchString(text)

