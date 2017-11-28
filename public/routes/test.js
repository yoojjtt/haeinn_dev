
var router_name = 'flex_test';

function flex_test(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

flex_test.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/flex_test/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = data[0];
            var info_type = "all";



            var query = "CALL test_flex_R("+company_no+",'"+info_type+"')";

            console.log(query+": 일용직 리스트 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="member"){
            var type ='대표';
            var email = data[0];
            var phone = data[1];
            var pwd = data[2];


            var query = "CALL _member_register('"+type +"','" +email + "','" + phone +"','" +pwd +"');";   //대표가 서비스를 처음 신청할 때
            console.log(query+": 회원가입");
            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }


    });

}

flex_test.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = flex_test;