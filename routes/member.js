
var router_name = 'member';

function member(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

member.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
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



        if(gubun == 'president_register'){
            var query = "CALL _member_register('"+type +"','" +email + "','" + phone +"','" +pwd +"');";   //대표가 서비스를 처음 신청할 때
            console.log(query+": 회원가입");
            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }




    });

}

member.prototype.query_after = function(res, req, result)
{

    console.log(result);



}

module.exports = member;