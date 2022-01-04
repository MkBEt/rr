/*CMD
  command: /myref
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 👨 my info
CMD*/

let friend = Libs.ReferralLib.getAttractedBy();
let msg = "You was attracted by: "

if(friend){
  msg = msg + "user " + Libs.commonLib.getlinkFor(friend);
}else{
  msg = "You was not attracted."
}

Bot.sendMessage(msg);
