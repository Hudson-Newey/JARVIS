from gtts import gTTS
import playsound


class speechEngine():
    def sayText(self, textToProcess):
        tts = gTTS(textToProcess)

        tts.save("processed.mp3")
        self.playMP3("processed.mp3")

        # delete old file before creating a new one
        os.remove("processed.mp3")
    
    def playMP3(self, fileName):
        playsound.playsound(fileName, True)
