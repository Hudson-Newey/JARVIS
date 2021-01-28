# a simple routing script to make sure all modules get loaded correctly

# the reason for this file is:
# 1. some modules may need furter effort beyond importing
# 2. as the program gets bigger, there are expected to be A LOT of modules

# local imports
exec(open(_CURR_DIR + "\\mods\\conversational\\main.py", "r").read())
