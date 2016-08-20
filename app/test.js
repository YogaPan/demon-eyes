var CronJob = require('cron').CronJob;
var request = require('request');
var fs = require('fs');
//
const secrets = {
  uid: '100000139310973',
  client_id: '7490eec7',
  cookie: 'locale=zh_TW; datr=SdgyVwl0sj_h5w-B3hGq-O8V; pl=n; lu=ghtIC-rrQfyxV27U5-lU6E0w; sb=eG53V26t-WDYYedGHsADh7Ef; c_user=100000139310973; xs=103%3ACDtnSOED15v8kQ%3A2%3A1471191726%3A17350; csm=2; s=Aa7T0e9qTqx7QdhF.BXsJqu; fr=0RxIR50qplC7X8Svp.AWXoRqPPFy4A-uCeC4-6OIshdlw.BXd252.KE.AAA.1.0.BXttoj.AWXXzZoG; p=-2; act=1471601898990%2F8; presence=EDvF3EtimeF1471601917EuserFA21B00139310973A2EstateFDt2F_5b_5dElm2FnullEuct2F1471601924716EtrFA2close_5fclickA2EtwF2051380155EatF1471601912830G471601917991CEchFDp_5f1B00139310973F9CC',
};

//
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
var count = 0;
class Fetcher {
  constructor() {
    this.resetOptions();
  }

  resetOptions() {
    this.options = {
      method: 'GET',
      url: 'https://3-edge-chat.facebook.com/pull',
      qs: {
        'cap': '8',
        'cb': '2qfi',
        'channel': 'p_100000139310973',
        'clientid': '7490eec7',
        'format': 'json',
        'idle': '0',
        'isq': '173180',
        'msgs_recv': '0',
        'partition': '-2',
        'qp': 'y',
        'seq': '0',
        'state': 'active',
        'sticky_pool': 'atn2c06_chat-proxy',
        'sticky_token': '0',
        'uid': '100000139310973',
        'viewer_uid': '100000139310973',
        'wtc': '171%2C170%2C0.000%2C171%2C171',
      },
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, sdch, br',
        'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
        'cookie': 'locale=zh_TW; datr=SdgyVwl0sj_h5w-B3hGq-O8V; pl=n; lu=ghtIC-rrQfyxV27U5-lU6E0w; sb=eG53V26t-WDYYedGHsADh7Ef; c_user=100000139310973; xs=103%3ACDtnSOED15v8kQ%3A2%3A1471191726%3A17350; csm=2; s=Aa7T0e9qTqx7QdhF.BXsJqu; fr=0RxIR50qplC7X8Svp.AWXoRqPPFy4A-uCeC4-6OIshdlw.BXd252.KE.AAA.1.0.BXttoj.AWXXzZoG; p=-2; act=1471601898990%2F8; presence=EDvF3EtimeF1471601917EuserFA21B00139310973A2EstateFDt2F_5b_5dElm2FnullEuct2F1471601924716EtrFA2close_5fclickA2EtwF2051380155EatF1471601912830G471601917991CEchFDp_5f1B00139310973F9CC',
        'dnt': '1',
        'origin': 'https://www.facebook.com',
        'referer': 'https://www.facebook.com/',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
      },
      gzip: true,
    };
  }

  makeRequest() {
    return requestApi(this.options);
  }

  startRequest() {
    this.makeRequest()
      .then((resp) => {
        if (!resp) {
          console.log('error');
          this.resetOptions();
        }
        let cutresp = resp.substring(10);
        let jsonObj = JSON.parse(cutresp);
        
        // console.log(cutresp);
        if (jsonObj.hasOwnProperty('lb_info')) {
          // Your Code here
          this.options.qs.sticky_pool = 
            JSON.parse(cutresp.lb_info.pool, function(k, v) {
              return v;  // return v * 2 for numbers
            });

          this.options.qs.sticky_token = 
            JSON.parse(cutresp.lb_info.sticky, function(k, v) {
              return v;  // return v * 2 for numbers
            });
        }

// console.log(jsonObj);
        if (jsonObj.hasOwnProperty('ms')) {
          // check 
          // var arrObj = [jsonObj.ms];
          // console.log(jsonObj);
          // console.log('------');
          // console.log('------');
          // console.log(jsonObj.ms);
          // console.log(jsonObj.ms.length);
          for (var i = 0; i < jsonObj.ms.length; i++){
            var obj = jsonObj.ms[i];
            for (var key in obj){
              var value = obj[key];
            // console.log(obj.overlay);
              for (var uid in obj.overlay){
                console.log(uid); // fb_uid
                // console.log(obj.overlay[uid]);
                console.log(obj.overlay[uid].la); // lastactivetime
    
                if(uid > 0)
                {
                  fs.writeFile(uid + '.txt', obj.overlay[uid].la, function(err) {
                    if(err) {
                      return console.log(err);
                    }
                    console.log('The file was saved!');
                  });
    
                }
    
    
              }
            
            // console.log(key);
            // console.log(value);
            // console.log('------');
            // console.log(ojb);
              if(key == 'type' && value == 'buddylist_overlay'){
                // for()
  
  
                console.log('yesss~~~');
              }
            }
          }
          /* if (jsonObj.ms.type == 'buddylist_overlay'){
            console.log('yes');
          } */
          
/*  
          // 寫入檔案
          // count++;
          fs.writeFile(count + '.txt', cutresp, function(err) {
            if(err) {
              return console.log(err);
            }
            // console.log("The file was saved!");
          });*/
        }

        if (jsonObj.hasOwnProperty('seq')) {
          // Your Code here
          this.options.qs.seq = JSON.parse(cutresp.seq, function(k, v) {
            return v;
          });
        }

      });
  }
}
let fetcher = new Fetcher();

// Cron 包起來
new CronJob('* * * * * *', function() {
  fetcher.startRequest();
}, null, true, null);
