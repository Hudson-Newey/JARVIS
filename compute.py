import os
import urllib.parse

# global static variables
_CURR_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# local imports
exec(open(_CURR_DIR + "/mods/loadModules.py", "r").read())

class JARVIS:
    def compute(self, phrase):
        if ("://" in phrase):
            return phrase
        
        # direct commands should be the first grants executed
        if (self.isDirectCommand(phrase)):
            return say(phrase)

        # we are just going to google questions for now.
        if (self.isQuestion(phrase) and not self.isPersonal(phrase)):
            # encode URL into URI format
            phrase = urllib.parse.quote_plus(phrase)
            return "https://www.google.com/search?q=" + phrase

        phraseEmotion = self.findPhraseEmotion(phrase)

        # all modules must return phrase if no custom response can be given
        phrase = conversationResponse(phrase, phraseEmotion)

        return phrase

    def scanFileForPhrase(self, fileName, phrase):
        # read the question file for keywords
        file1 = open(_CURR_DIR + fileName, 'r')
        Lines = file1.readlines()
            
        # Strips the newline character
        for line in Lines:
            line = line.replace("\n", "")
            if (line in phrase):
                return True
        
        return False

    def findPhraseEmotion(self, phrase):
        toScan = ["anger.txt", "disgust.txt", "fear.txt", "happiness.txt", "sadness.txt", "surprise.txt"]
        emotion = ""
  
        # read keyword files one by one
        for i in range(len(toScan)):
            if (self.scanFileForPhrase("\\database\\" + toScan[i], phrase)):
                emotion = toScan[i][:-4:]

        return emotion
    
    def isQuestion(self, phrase):
        return self.scanFileForPhrase("\\database\\question.txt", phrase)
    
    def isPersonal(self, phrase):
        return self.scanFileForPhrase("\\database\\personal.txt", phrase)
    
    def isDirectCommand(self, phrase):
        if ("say" in phrase): return True
        return False
