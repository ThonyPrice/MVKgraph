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
    
"""
Parse tokens to find reqiered corses / credits / etc.
@param tokens from eligibility text
@return list of dependencies
"""
    
def parse(Tokens):
    return list_of_dependencies