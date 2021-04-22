const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const lineReader = require('line-reader');



client.on('ready', () =>{
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("!Quiz to play"); //whatever you want the activity to be
});




//things to hold

// questions
// answers
// game titles

//functions

// end games 
// wipe data

let TheTitles = [];

let Questions = [];

let Answers = [];

var indexArray = [];
indexArray[0] = 0;
var indexForIndexArray = 1;

let titlesIndex = 0;
let questionsIndex = 0;
let answersIndex = 0;


//reads data from the Quiz.txt file and puts them into the arrays above
lineReader.eachLine('Quiz.txt', function(line) {

    var something = line.toString();

    if(line.includes("Title:"))
    {
        TheTitles[titlesIndex] = something.substring(6).trim();
    }
    else if(line.includes("Question:"))
    {
        Questions[questionsIndex] = something.substring(9).trim();
        questionsIndex++;
    }
    else if(line.includes("Answer:")){
        Answers[answersIndex] = something.substring(8).toLowerCase().trim(); 
        answersIndex++;
    }
    else if(line.includes("End;"))
    {
        titlesIndex++;
        indexArray[indexForIndexArray] = questionsIndex;
        indexForIndexArray++;
    }
});




//used to hold the temporary score of whoever is playing
var TempScore = 0;

var gameBeingPlayed = false;

//java game variables
let JavaPlayer = 0;
let JavaQIndex = 0;


let index;

client.on("message", (message) => {


    if(message.content == "!Quiz" && gameBeingPlayed == true)
    {
        message.reply("The quiz is currently being taken in another channel, please check back later");
    }
    //if author decides to try to start a new game while in one
    if(message.content == "!Quiz" && gameBeingPlayed == true && message.author == JavaPlayer){
        message.reply("Please finish your game before starting a new one.");
    }

    //Java check correct
    else if(message.channel.id == '652639737311526922' && message.author == JavaPlayer){//checks if the message is in the Java Channel & the messages author is the player
       index = TheTitles.indexOf("Java"); //finds the index for the title: Java so that it can use that index to get the how many questions and answers there are
        if(message.content.toLowerCase() == Answers[indexArray[index]+ JavaQIndex]){ //checks if users answer is correct
            message.reply("Correct!"); 
            TempScore++; //if it is correct is increases there score
            if(indexArray[index] + JavaQIndex + 1 < indexArray[index + 1]) //checks if we still have questions that are able to be sent
            {
                message.reply("\nQuestion:" +Questions[indexArray[index] + JavaQIndex + 1]); //reads off next question to the user
            }
            JavaQIndex++;//increase Question index after each round
        }
        else{
            message.reply("Incorrect!\nAnswer was: " + Answers[indexArray[index] + JavaQIndex]);
            if(indexArray[index] + JavaQIndex + 1 < indexArray[index + 1]) //checks if we still have questions that are able to be sent
            {
                message.reply(Questions[indexArray[index] + JavaQIndex + 1]); //reads off next question to user
            }
            JavaQIndex++;//increase Question index after each round
        }
        //Java end game
        if(JavaQIndex == indexArray[index + 1] - indexArray[index]){ //checks if its the end of game
            if(TempScore == (indexArray[index + 1] - indexArray[index])){ //checks if they got all answers correct
                message.reply("You have beat the quiz with a perfect score! Adding you to the list of winners..");
                TempScore = 0; //resetting variables after the game
                JavaQIndex = 0; //resetting variables after the game
                JavaPlayer = 0;//resetting variables after the game
                gameBeingPlayed = false;
                fs.appendFile('JavaWinners.txt', message.member.displayName + "\n", function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            } 
            else{ //if they get an answer wrong
                message.reply("You got the score: " + TempScore + "/" +  (indexArray[index + 1] - indexArray[index]) ) ;
                TempScore = 0; //resetting variables after the game
                JavaQIndex = 0; //resetting variables after the game
                JavaPlayer = 0; //resetting variables after the game
                gameBeingPlayed = false;
            }
        }
    }
    //Java start game
    else if(message.channel.id == '652639737311526922' && message.content == "!Quiz" && JavaPlayer == 0 && gameBeingPlayed == false) //checks
    {
        gameBeingPlayed = true;
        index = TheTitles.indexOf("Java");//finds the index for the title: Java so that it can use that index to get the how many questions and answers there are
        message.reply("Starting Quiz : Java \n Goodluck!");
        if(indexArray[index] + JavaQIndex < indexArray[index + 1]){ //checks if we still have questions that are able to be sent
            message.reply("\nQuestion:" +Questions[indexArray[index] + JavaQIndex].toString());//reads off next question to the user
        }     
        JavaPlayer = message.author;  //sets the JavaPlayer variable equal to the author id so that 
    }








    else if(message.channel.id == '329427031240474626' && message.author == JavaPlayer){//checks if the message is in the Java Channel & the messages author is the player
        index = TheTitles.indexOf("c#"); //finds the index for the title: Java so that it can use that index to get the how many questions and answers there are
         if(message.content.toLowerCase() == Answers[indexArray[index]+ JavaQIndex]){ //checks if users answer is correct
             message.reply("Correct!"); 
             TempScore++; //if it is correct is increases there score
             if(indexArray[index] + JavaQIndex + 1 < indexArray[index + 1]) //checks if we still have questions that are able to be sent
             {
                 message.reply("\nQuestion:" +Questions[indexArray[index] + JavaQIndex + 1]); //reads off next question to the user
             }
             JavaQIndex++;//increase Question index after each round
         }
         else{
             message.reply("Incorrect!\nAnswer was: " + Answers[indexArray[index] + JavaQIndex]);
             if(indexArray[index] + JavaQIndex + 1 < indexArray[index + 1]) //checks if we still have questions that are able to be sent
             {
                 message.reply(Questions[indexArray[index] + JavaQIndex + 1]); //reads off next question to user
             }
             JavaQIndex++;//increase Question index after each round
         }
         //Java end game
         if(JavaQIndex == indexArray[index + 1] - indexArray[index]){ //checks if its the end of game
             if(TempScore == (indexArray[index + 1] - indexArray[index])){ //checks if they got all answers correct
                 message.reply("You have beat the quiz with a perfect score! Adding you to the list of winners..");
                 TempScore = 0; //resetting variables after the game
                 JavaQIndex = 0; //resetting variables after the game
                 JavaPlayer = 0;//resetting variables after the game
                 gameBeingPlayed = false;
                 fs.appendFile('c#Winners.txt', message.member.displayName + "\n", function (err) {
                     if (err) throw err;
                     console.log('Saved!');
                   });
             } 
             else{ //if they get an answer wrong
                 message.reply("You got the score: " + TempScore + "/" +  (indexArray[index + 1] - indexArray[index]) ) ;
                 TempScore = 0; //resetting variables after the game
                 JavaQIndex = 0; //resetting variables after the game
                 JavaPlayer = 0; //resetting variables after the game
                 gameBeingPlayed = false;
             }
         }
     }
     //Java start game
     else if(message.channel.id == '329427031240474626' && message.content == "!Quiz" && JavaPlayer == 0 && gameBeingPlayed == false) //checks
     {
         gameBeingPlayed = true;
         index = TheTitles.indexOf("c#");//finds the index for the title: Java so that it can use that index to get the how many questions and answers there are
         message.reply("Starting Quiz : c#   Goodluck!");
         if(indexArray[index] + JavaQIndex < indexArray[index + 1]){ //checks if we still have questions that are able to be sent
             message.reply("\nQuestion:" +Questions[indexArray[index] + JavaQIndex].toString());//reads off next question to the user
         }     
         JavaPlayer = message.author;  //sets the JavaPlayer variable equal to the author id so that 
     }

    

    

});



















client.login("NjQyNTEzMjk0OTM0MDE2MDI1.XopcmA._r0onkpJjtwwytB_IjlsONq1ns8");