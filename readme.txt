How to setup bot
line 176 needs discord bots secret code
install fs using npm install fs
install discordjs using npm install discord.js 
run using node.js (f5 then nodejs)
create .txt files for winners to write too ex: JavaWinners.txt and c#Winners.txt

insert data into Quiz.txt file in this format
Title: the title of the class ex: java
Question: a Question
Answer: the answer to the question
End; ends the quiz for that game

Title:
Question:
Answer:
End; 
Title:
Question:
Answer:
End;

How to add a new game

*leave javaPlayer, and JavaQIndex. It is able to be used by the new channels quiz*
1. copy paste line 99-151 into the onmessage function
2. message.channel.id needs to be changed to the desired channel in all else if statements
3. index = TheTitles.indexOf(x) needs to be changed to the title of the game
4. lines 141-151 that you copied contains the start game message, if you wish to change this 
to the new quiz name, you may.
5.fs.appendFile needs to be changed to the text file that you want the winners wrote too. it
appends the file so please create a blank file.
6. Have fun!

