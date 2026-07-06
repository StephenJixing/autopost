async function sendReserve(planDate, startTime, endTime, siteId, siteName, objectId, cardContractId, subscriberPhone, wxAppChatId, Url) {
  const url = Url; // 同上
  const body = {
    planDate: planDate,
    sites: [{
      startTime: startTime,
      endTime: endTime,
      price: 300,
      planDate: planDate,
      sitesId: siteId,
      siteName: siteName,
      idx: 11,
      siteType: "1"
    }],
    "total": 300,
    "payType": 3,
    "cardType": 3,
    "objectId": objectId,
    "cardContractId": cardContractId,
    "discountType": 2,
    "discountRatio": 0,
    "realAmount": 0,
    "groundName": "员工会员（周末）",
    "subscriberPhone": subscriberPhone,
    "subscriberName": "微信用户",
    "rentType": "1",
    "channel": 0,
    "couponInstanceId": null,
    "deductionAmount": 300,
    "payMethod": 5
  };

  const req = new Request(url);
  req.method = "POST";
  req.headers = { 
    "Host": "www.forzadata.cn",
  "xweb_xhr": "1",
  "WXAPPCHATID": wxAppChatId,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  "Referer": "https://servicewechat.com/wx1a322211606f019f/12/page-frame.html",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9",
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Cache-Control": "no-cache",
  "Cookie": "JSESSIONID=cwqqen1084j9gkw893qlqhvu"
  };
  req.body = JSON.stringify(body);
  return await req.loadString();
}
const YudaWX = "eyJuYW1lIjoi5b6u5L+h55So5oi3IiwicGhvbmUiOiIxMzQ4NjExOTYwOCIsImFjY291bnRJZCI6MTI3MTA2ODgsImltcGVyc29uYXRlZCI6ZmFsc2UsImNoYW5uZWwiOm51bGwsImlwIjpudWxsLCJ0cyI6MTc2MDc3MTI4MDA3M30=.LL3EM/GhSJKpTHlHKcDxVIv1BbKS8/j7stnuF7lizyk=";
const NiejinWX = "eyJuYW1lIjoi5b6u5L+h55So5oi3IiwicGhvbmUiOiIxODE3MTMxOTA5MCIsImFjY291bnRJZCI6MjA0ODgzNDcsImltcGVyc29uYXRlZCI6ZmFsc2UsImNoYW5uZWwiOm51bGwsImlwIjpudWxsLCJ0cyI6MTc2MDYwODA0NzMzNH0=.Ej8vCOSt2cN3HHnPebFnou7UPFiQ1JWetaWSOQSiaG8=";
const CjxWx = "eyJuYW1lIjoiU3RlcGhlbiIsInBob25lIjoiMTc2ODM4OTEzMDYiLCJhY2NvdW50SWQiOjIxNTY4NTM5LCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJjaGFubmVsIjpudWxsLCJpcCI6bnVsbCwidHMiOjE3Nzk4Nzc0MzkyODF9.Xb+RVzdTMZcuUBzGdc9mlYA7THEVaIr+TSvHFG2zmcs=";
const WorkDay1Url = "https://www.forzadata.cn/api/wxApp/athleticGround/3667/createGroundReservePay/3589?thirdParty=3667&openId=oUhoo5CC4jcfqCUGg9790kbLlyhA";
const WorkDay2Url = "https://www.forzadata.cn/api/wxApp/athleticGround/3667/createGroundReservePay/3591?thirdParty=3667&openId=oUhoo5CC4jcfqCUGg9790kbLlyhA";
const Weekend1Url = "https://www.forzadata.cn/api/wxApp/athleticGround/3667/createGroundReservePay/3592?thirdParty=3667&openId=oUhoo5CC4jcfqCUGg9790kbLlyhA"
const Weekend2Url = "https://www.forzadata.cn/api/wxApp/athleticGround/3667/createGroundReservePay/3593?thirdParty=3667&openId=oUhoo5CC4jcfqCUGg9790kbLlyhA"

const today = new Date();
const planDate = today.toISOString().slice(0,10).replace(/-/g,""); // 格式 20260702
// 同时发送
const tasks = [
  //workday
  sendReserve(planDate, "19:00", "20:00", 12094, "1号场", 173706, 39539612, 13486119608, YudaWX, WorkDay1Url),
  sendReserve(planDate, "20:00", "21:00", 12094, "1号场", 173706, 39539612, 13486119608, YudaWX, WorkDay1Url),
  sendReserve(planDate, "20:00", "21:00", 12110, "2号场", 173708, 40716982, 17683891306, CjxWx, WorkDay2Url),
  sendReserve(planDate, "21:00", "22:00", 12110, "2号场", 173708, 33531802, 18171319090, NiejinWX, WorkDay2Url),
  
  //weekend
  //sendReserve(planDate, "10:00", "11:00", 12111, "1号场", 173706, 39539612, 13486119608, YudaWX, Weekend1Url),
  //sendReserve(planDate, "11:00", "12:00", 12111, "1号场", 173706, 39539612, 13486119608, YudaWX, Weekend1Url),
  //sendReserve(planDate, "21:00", "22:00", 12112, "2号场", 173708, 33531802, 18171319090, NiejinWX, Weekend2Url),
  //sendReserve(planDate, "10:00", "11:00", 12112, "2号场", 173708, 40716982, 17683891306, CjxWx, Weekend2Url),
  //sendReserve(planDate, "11:00", "12:00", 12112, "2号场", 173708, 40716982, 17683891306, CjxWx, Weekend2Url),
];

try {
  const results = await Promise.all(tasks);
  console.log(results);
  
  // 写入 iCloud 日志文件
const fm = FileManager.iCloud();
const logPath = fm.joinPath(fm.documentsDirectory(), "预订日志.txt");
let existing = "";
if (fm.fileExists(logPath)) {
  existing = fm.readString(logPath);
}
fm.writeString(logPath, existing + '\n' + today  + '\n' + results);
  Script.setShortcutOutput(JSON.stringify(results));
} catch (e) {
  console.error(e);
}

