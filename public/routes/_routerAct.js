var mysql = require("mysql");


var Config = require('../service_config.js');
var Con = new Config();

/** @namespace Con.db_config */
var dbConnection = mysql.createPool(Con.db_config);

var Dashboard = require("./dashboard_info.js");
var Member = require("./member.js");  //서비스 신청, 직원등록
var Auth = require("./auth.js"); //로그인
var Service_info = require("./_service_info.js");  // super user 에 의한 서비스기간 설정
var Employee_info = require("./employee_info.js"); // 직원 정보 수정, 직원정보 로드
var Company_info = require("./company_info.js");  //회사 정보 수정, 회사정보 로드
var Password_info = require("./password_info.js"); //비밀번호 수정, 비밀번호 정보 로드
var Hyunjang_info = require("./hyunjang_info.js");  //현장정보 로드, 수정
var Tax_info = require("./tax_info.js"); //세금정보 로드
var Daily_employee_info = require("./daily_employee_info.js"); //일용직 근로자 정보 로드, 수정
var Kongsu_info = require("./kongsu_info.js");  // 공수 정보 수정, 로드
var Daily_employee_register_info = require("./daily_employee_register_info.js");  //일용직 근로자 현장등록 로드, 수정
var Retire_info = require("./retire_info");
var Test = require("./test.js");  //flex_test
var Sms  = require("./SMS.js"); //SMS


function Mobile_routerAct(router)   //  생성자, 매개변수의 인자값  /m
{
    var self = this;
    self.handleRoutes(router);  //Mobile_routerAct.handleRoutes(/m)
    console.log('router standby~~');

    //sqltest (프로시져 테스트)
    var dashboard = new Dashboard(router, this);
    var member = new Member(router, this);
    var auth = new Auth(router, this);
    var service_info = new Service_info(router, this);
    var employee_info = new Employee_info(router, this);
    var company_info = new Company_info(router, this);
    var password_info = new Password_info(router,this);
    var hyunjang_info = new Hyunjang_info(router, this);
    var tax_info = new Tax_info(router, this);
    var daily_employee_info = new Daily_employee_info(router, this);
    var kongsu_info = new Kongsu_info(router, this);
    var daily_employee_register_info = new Daily_employee_register_info(router, this);
    var retire_info = new Retire_info(router, this);
    var test = new Test(router, this);  //flex_test
    var sms = new Sms(router, this);


}



Mobile_routerAct.prototype.handleRoutes = function(router)
{
    router.get('/ajax.json', function(req, res) {   //m/ajax.json  => 이경로로 가면 json객체 출력된다.
        res.json({"Message" : "Hello Moblie!"});
    });

    //test
    router.post('/ajax.json', function(req, res) {  // 포스트 방식으로 /m/ajax.json
        //필수
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        var msg = req.body.msg;

        msg = [msg, '에코'];
        res.send({result:true, msg:msg});
    });
}


Mobile_routerAct.prototype.mysql_proc_exec = function(query, res, req, router_name, parent, i, repeat_num)
{

    dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

        if (err){
            console.log(err);
        }

        connection.query(query, function(err, result) {  //query를 던짐

            var error = false;  // 에러가 없다면 false
            if(err) {
                error = true;  // 에러가 있다면 true
                console.log(err);  //console창에 error값 출력
                //console.log(result);

            }

            if(router_name=='auth') {
                Auth.prototype.query_after(res, req, result, error);
            }
            /*
            else if(router_name=='MobileUI/Driver_login') {
                MobileUI.prototype.Driver_login_query_after(res, req, result);
            }
            else if(router_name=='admin_login') {
                Admin_login.prototype.query_after(res, req, result);
            }
            else if(router_name=="fileUpload") {
                //응답 보류~(자체해결)
            }
            else if(router_name=="gps/U") {

                //마지막에 응답
                if(i==(repeat_num-1)) {

                    GPS.prototype.gps_update_after_update(result, res, req, parent, repeat_num);
                    //connection.release();

                }

            }
            else if(router_name=="SMS/S") {

                //마지막에 응답
                if(i==(repeat_num-1)) {

                    SMS.prototype.SMS_send_after_update(result, res, req, parent, repeat_num);
                    //connection.release();

                }

            }*/
            else {  // 정상적으로 query가 실행된경우 json을 response해준다. ==>요청한 곳으로
                var return_data = {
                    "error": error,
                    "data": result
                };
                res.json(return_data);
            }
            connection.release();

        });


    });
};

module.exports = Mobile_routerAct;