/*CMD
  command: /reflist
  help: view my Referrals List
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 📜 my refs
CMD*/

let refList = Libs.ReferralLib.getRefList()

if (!refList.exist) {
  Bot.sendMessage("No any affiliated users")
  return
}

let msg = ""
// only 100 first users here
// for other users you need use pagination:
// https://help.bots.business/bjs/lists#paginating
let users = refList.getUsers()

for (var ind in users) {
  user = users[ind]
  msg = msg + "\n👤 " + Libs.commonLib.getLinkFor(user)
}

if (users.length < 9) {
  var count = users.length
} else {
  var count = refList.count
}

let last_updated_time = (new Date() - new Date(refList.updated_at)) / 1000
last_updated_time = last_updated_time.toFixed(4)

msg =
  "*Total users:* " +
  refList.count +
  "\n _the first user was tracked:_ \n" +
  "   _" +
  refList.created_at +
  "_" +
  "\n----" +
  msg +
  "\n----" +
  "\n*Last recount*" +
  "\n  sec ago: " +
  last_updated_time +
  "\n  time, sec: " +
  refList.last_calc_time.toFixed(4)

if (needRecount(refList)) {
  msg = msg + "\n recount started..."
  refList.recount({
    // this command will be runned after recount
    // onComplete: 'onCompleteListRecount'
  })
} else {
  msg =
    msg +
    "\n  next recount after, sec: " +
    needToWaitForNextRecount(refList).toFixed(4)
}

Bot.sendMessage(msg)

// you need to recount list sometimes
// such recount can be very slowly so we need to perform it not very often
// https://help.bots.business/bjs/lists#recount-list
function delayForNextRecount(list) {
  // Recount list not more often then 100 sec per each 0.1 last calc time
  // so if last calc time is 10 secs we need to wait 24 hours for new calc
  return (100 * list.last_calc_time) / 0.1
}

function needToWaitForNextRecount(list){
  return delayForNextRecount(list) - lastUpdatedSecAgo(list)
}

function needRecount(list) {
  return needToWaitForNextRecount(list) < 0
}

function lastUpdatedSecAgo(list) {
  return (new Date() - new Date(list.updated_at)) / 1000
}

