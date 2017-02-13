import re

"""
@param course eligibility text
@return course dependency, eg [DD1393, 180 Credits, Bachelor in DOP]
"""
def getDependencies(text):
    tokens = mkTokens(text)
    dep_list = parseTokens(Tokens)
    return dep_list

"""
Make tokens of keywords from eligibility text
@param course eligibility text
@return list of tokens
"""

def mkTokens(text):
    return Tokens

#Courses:   "\w{2}\d{4}\w?"  , alternatives to \w? Since it takes numbers aswell. Should genereally not be a problem though.
#One: "(one|One)"
#Or: (or|Or|\/) , I dont think that normal slash is a special character. Could possibly be just /.
#And: (and|And|)

    
"""
Parse tokens to find reqiered corses / credits / etc.
@param tokens from eligibility text
@return list of dependencies
"""
    
def parse(Tokens):
    return list_of_dependencies