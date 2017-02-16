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
    print(Dependency)
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
Parse for "credits" in text. E.g. "At least 30 credits" or "PhD students only"
@param course eligibility text
@return string with necessary credits
"""

<<<<<<< HEAD
def getDepCredits(text):    
    text += '.'
    points = Regex('[1-9](\.|,)?\d+')
    eduLevel = Regex('[P|p]h\.?\s?[Dd]\.?') ^ oneOf('Bachelor Doctoral', caseless=True) ^ Regex('[M|m]aster((\')?s)?') 
=======
def getDepCredits(text):
    points = Regex('[1-9](\.|,)?\d+')
    eduLevel = Regex('[P|p]h\.?\s?[Dd]\.?') ^ CaselessLiteral('Bachelor') ^ Regex('[M|m]aster((\')?s)?') ^ CaselessLiteral('Doctoral')
>>>>>>> 6290569c548955aa7267c33e283b932eb179b6e6
    amount = CaselessLiteral('At least') ^ CaselessLiteral('Completed')
    notOfInterest = CaselessLiteral('single course students:') ^ CaselessLiteral('Non-program students,')
    participation = CaselessLiteral('Admitted to') ^ CaselessLiteral('Enrolled at')
    specCase1 = CaselessLiteral('All courses that are required for issuing the Degree of')
<<<<<<< HEAD
    specCase2 = CaselessLiteral('Accepted to')
=======
    # TODO: Credits can be represented with commas (e.g. 7,5 hp)
>>>>>>> 6290569c548955aa7267c33e283b932eb179b6e6
    credits =       MatchFirst(Suppress( notOfInterest + SkipTo('.'))) \
                    ^ (Optional(amount) + points + Optional('of the') + \
                    (oneOf('university credits ects hp', caseless=True) ^
                    CaselessLiteral('higher education credits')) + \
                    SkipTo('.')) \
                    ^ (Optional(specCase1 ^ specCase2) + eduLevel + \
                        (MatchFirst(SkipTo('.')) ^ SkipTo(','))) \
                    ^ (CaselessLiteral('Only available to') + (SkipTo('.'))) \
                    ^ (participation + SkipTo('.'))
    return credits.searchString(text)

"""
Parse for recommended courses in text.
@param course eligibility text
@return string with recommended courses
"""

def getRecomendCourses (text):
<<<<<<< HEAD
    text += '.'
    startWord = Regex('[A-Z][a-z]+') ^ Suppress(oneOf('. ,'))    
=======
    startWord = Regex('[A-Z][a-z]+') ^ Suppress(oneOf('. ,'))
>>>>>>> 6290569c548955aa7267c33e283b932eb179b6e6
    recommended =   (MatchFirst(startWord) \
                    ^ OneOrMore(~CaselessLiteral('Recommended') + \
                    Word(alphanums))) + \
                    CaselessLiteral('Recommended') + \
                    SkipTo('.')
    return recommended.searchString(text)
