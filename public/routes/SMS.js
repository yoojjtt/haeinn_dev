
var router_name = 'sms';

function sms(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

sms.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/member/ajax.json

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);


        var type ='대표';
        var email = data[0];
        var phone = data[1];
        var pwd = data[2];
        // var query2 = "CALL ";







    });

}

sms.prototype.query_after = function(res, req, result)
{

    console.log(result);



}

module.exports = sms;