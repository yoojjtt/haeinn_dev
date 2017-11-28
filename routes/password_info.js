
var router_name = 'password_info';

function password_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

password_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/password_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var email = data[0];



            var query = "CALL password_R('"+email+"')";

            console.log(query+": 비밀번호 정보로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="S"){
            var new_pwd = data[0];
            var email = req.session.sess_userEmail;


            var query = "CALL password_S('"+email+ "','"+ new_pwd +"')";

            console.log(query+": 비밀번호 변경");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }
        if(gubun =="check"){


            var email = req.session.sess_userEmail;
            var pwd = data[0];
            var infoType = data[1];
            var company_id = req.session.sess_company_no;



            var query = "CALL password_check('"+email+"','"+pwd+"','"+company_id +"','"+infoType+"')";

            console.log(query+": 비밀번호 정보 CHECK");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }


    });

}

password_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = password_info;