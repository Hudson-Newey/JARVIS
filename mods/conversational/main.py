import random

def scanFileForPhrase(fileName, phrase):
        # read the question file for keywords
        file1 = open(_CURR_DIR + fileName, 'r')
        Lines = file1.readlines()
            
        # Strips the newline character
        for line in Lines:
            line = line.replace("\n", "")
            if (line in phrase):
                return True
        
        return False

def getRandomLine(fileName):
    s=open(_CURR_DIR + fileName,"r")
    m=s.readlines()
    l=[]
    for i in range(0,len(m)-1):
        x=m[i]
        z=len(x)
        a=x[:z-1]
        l.append(a)
    l.append(m[i+1])
    o=random.choice(l)
    s.close()

    return o

# logical sub-functions
def say(phrase):
    return phrase[phrase.index("say") + 4::]

def hey(phrase):
    return getRandomLine("/database/greetings.txt")

def goodbye(phrase):
    return phrase

# main calling function
def conversationResponse(phrase, phraseEmotion):
    if (scanFileForPhrase("/database/greetings.txt", phrase)):
        print("file contains a greeting")
        return hey(phrase)

    return phrase
