
var router_name = 'retire_info';

function retire_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

retire_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/kongsu_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = req.session.sess_company_no;
            var hyun_jang_num = data[0];
            var daily_employee_num = data[1];
            var month = data[2];
            var daily = data[3];
            var infoType = data[4];

            //daily = daily.test_string();  //TODO library


            var query = "CALL retire_R('"+company_no
                +"','"+hyun_jang_num
                +"','"+daily_employee_num
                +"','"+month
                +"','"+daily
                +"','"+infoType
                +"')";

            console.log(query+": 퇴직 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }




    });

}

retire_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = retire_info;