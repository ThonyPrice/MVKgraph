from DependencyClass import DependencyObject
from pyparsing import *
# A parsing package not included in python default library
# Avaliable at: http://pyparsing.wikispaces.com/

"""
Parse text for dependent courses and credits
@param course eligibility text
@return DependencyObject containing dependent courses and credits
"""

def parseText (text):
    Dependency = DependencyObject()
    course = Regex('([A-Z]{2}|\d[A-Z])(\d{4}|\d{3}[A-Z])')
    or_words = oneOf('or /', caseless=True)
    and_words = oneOf('and +', caseless=True)
    signs = oneOf('- , . ')
    keywords = OneOrMore(   \
                    Suppress(Optional(or_words)) + course + \
                    Suppress(Optional(OneOrMore(~or_words + \
                        (Word(alphas)^signs)))) + \
                    OneOrMore(Suppress(or_words) + course) + \
                    Suppress(Optional(OneOrMore((Word(alphas) ^ \
                        signs) + ~(and_words + course) + \
                        ~(Optional(OneOrMore(alphas)) + and_words + \
                        (Optional(OneOrMore(alphas)))))) + \
                    Optional(Suppress(or_words) + course))) \
                    ^ OneOrMore(course)
                        
    credits =       (~(CaselessLiteral('single course students:')) + \
                    Word(nums, max=3) + Optional('of the') + \
                    oneOf('university credits ects hp', caseless=True) + \
                    SkipTo('.', include=False)) ^ \
                    (CaselessLiteral('phd') + SkipTo('.'))

    Dependency.courses = keywords.searchString(text).asList()
    Dependency.setCredits(credits.searchString(text))
    # print(dependency)
    return Dependency
