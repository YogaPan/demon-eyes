const router = require('koa-router')();
const request = require('request');
var CronJob = require('cron').CronJob;

var options = { method: 'GET',
  url: 'https://3-edge-chat.facebook.com/pull',
  qs: 
   { channel: 'p_100000139310973',
     seq: '2',
     partition: '-2',
     clientid: '2932f926',
     cb: '42us',
     idle: '1',
     qp: 'y',
     cap: '8',
     tur: '1324',
     qpmade: '1471588132339',
     pws: 'fresh',
     isq: '296197',
     msgs_recv: '2',
     uid: '100000139310973',
     viewer_uid: '100000139310973',
     sticky_token: '180',
     sticky_pool: 'ash2c06_chat-proxy',
     state: 'active' },
  headers: 
   { 'postman-token': '7e12e2c9-dc09-f364-14af-ee2b3b8f769d',
     'cache-control': 'no-cache',
     cookie: 'locale=zh_TW; datr=SdgyVwl0sj_h5w-B3hGq-O8V; pl=n; lu=ghtIC-rrQfyxV27U5-lU6E0w; sb=eG53V26t-WDYYedGHsADh7Ef; act=1471585564503%2F33; c_user=100000139310973; xs=103%3ACDtnSOED15v8kQ%3A2%3A1471191726%3A17350; fr=0RxIR50qplC7X8Svp.AWUYoxqBE7MZEfaGzmpzEmkVLDw.BXd252.KE.AAA.1.0.BXtqUq.AWUafYnW; csm=2; s=Aa7T0e9qTqx7QdhF.BXsJqu; p=-2; presence=EDvF3EtimeF1471588091EuserFA21B00139310973A2EstateFDutF1471588091842Et2F_5bDiFA2thread_3a133765889293B6A2EsiFA2133765889293B6A2ErF1CAcDiFA2user_3a1B04034078072A2ErF1C_5dElm2FA2user_3a1B04034078072A2Euct2F1471585299798EtrFA2loadA2EtwF1831004640EatF1471588090587CEchFDp_5f1B00139310973F1CC',
     'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
     'accept-encoding': 'gzip, deflate, sdch, br',
     referer: 'https://www.facebook.com/',
     accept: '*/*',
     'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
     'x-devtools-emulate-network-conditions-client-id': '209ac9fa-3832-401c-ab81-3515989486b5',
     origin: 'https://www.facebook.com' } };


// Main page.
router.get('/', async ctx => {
  await ctx.render('index.ejs');
});

router.get('/test', async ctx => {
  ctx.body = await requestApi(options);
});

router.get('/chart', async ctx => {
  await ctx.render('chart.ejs');
});

// Take an api url and return a promise that resolve response body.
function requestApi(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject();
      }
    });
  });
}

module.exports = router;
