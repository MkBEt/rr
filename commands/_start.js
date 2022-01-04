/*CMD
  command: /start
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 

  <<ANSWER
How to use this bot? /howtouse

Get personal affiliate link: /mylink
You was attracted by: /myref

*Referral List*
Get yours Referral List: /reflist



  ANSWER
  keyboard: 🔗 My Link, 📜 My Refs, \n👨 My info, 📈 Top List
  aliases: 
CMD*/

function doTouchOwnLink(){
  Bot.sendMessage("You click on yours own link!");
}

function doAttracted(refUser){
  Bot.sendMessage(
    "Hello" + 
    "\n\n" +
    "You attracted by user: " + Libs.commonLib.getLinkFor(refUser));
  
  Bot.sendMessageToChatWithId(
    refUser.telegramid,
    "You just attract new user: " + Libs.commonLib.getLinkFor(user)
  );
}

function doAlreadyAttracted(){
  Bot.sendMessage("You was already attracted");
}

let trackOptions = {
  onTouchOwnLink: doTouchOwnLink,
  onAttracted: doAttracted,
  onAlreadyAttracted: doAlreadyAttracted
}

Libs.ReferralLib.track(trackOptions);



