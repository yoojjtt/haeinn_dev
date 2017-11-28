
var router_name = 'daily_employee_info';

function daily_employee_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

daily_employee_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/daily_employee_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);


        if (gubun == "R") {
            var company_no = req.session.sess_company_no;
            var job = data[0];


            var query = "CALL daily_employee_R(" + company_no + ",'" + job + "','')";

            console.log(query + ": 일용직 리스트 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if (gubun == "individual") {
            var id = data[0];

            var query = "CALL daily_employee_R('',''," + id + ")";
            console.log(query + ": 일용직 개별 정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }
        if (gubun == "S") {
            var name = data[0];
            var id = data[1];
            var job = data[2];
            var jumin1 = data[3];
            var jumin2 = data[4];
            var phone = data[5];
            var postnum = data[6];
            var address1 = data[7];
            var address2 = data[8];
            var bank_name = data[9];
            var bank_owner = data[10];
            var bank_account = data[11];
            var company_no = req.session.sess_company_no;

            var query = "CALL daily_employee_S('" + name
                + "','" + id
                + "','" + job
                + "','" + jumin1
                + "','" + jumin2
                + "','" + phone
                + "','" + postnum
                + "','" + address1
                + "','" + address2
                + "','" + bank_name
                + "','" + bank_owner
                + "','" + bank_account
                + "','" + company_no
                + "')";

            console.log(query + ": 일용직 정보 수정/신규 저장");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }
        if(gubun == "account_save"){
            var company_no = req.session.sess_company_no;
            var value_g = data[0];
            var total_num = data[1];
            var month = data[2];
            var hyunjang_id = data[3];

            var query = "CALL daily_employee_account_S('"
                +company_no
                +"','"+hyunjang_id
                +"','"+month
                +"','"+value_g
                +"','"+total_num
                +"')";

            console.log(query+": 급여명세서 account_save");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec



        }





    });

}

daily_employee_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = daily_employee_info;