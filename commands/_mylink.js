/*CMD
  command: /mylink
  help: get my affiliate link
  need_reply: 
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER
  keyboard: 
  aliases: 🔗 my link
CMD*/

let link=Libs.ReferralLib.getLink();
Bot.sendMessage(link);



