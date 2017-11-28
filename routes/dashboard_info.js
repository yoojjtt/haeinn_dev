
var router_name = 'dashboard_info';

function dashboard_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

dashboard_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/dashboard_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = req.session.sess_company_no;
            var month = data[0];
            var infoType = 'dashboard';


            var query = "CALL dashboard_R('"+company_no+"','"+month+"','"+ infoType +"')";

            console.log(query+": DASHBOARD 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun == "closing"){
            var company_no = req.session.sess_company_no;
            var hyunjang_num = data[0];
            var monthly_date = data[1];
            var total_num = data[2];
            var total_money = data[3];
            var average_monthly_salary = data[4];
            var average_danga = data[5];
            var groups = data[6];


            var query = "CALL closing_data_S('"+company_no
                +"','"+hyunjang_num
                +"','"+monthly_date
                +"','"+total_num
                +"','"+total_money
                +"','"+average_monthly_salary
                +"','"+average_danga
                +"','"+groups
                +"');";
            console.log(query+": closing_data 갱신");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }
        if(gubun == "ALL"){
            var company_no = req.session.sess_company_no;
            var hyunjang_state = data[0];

            var query = "CALL closing_data_R('"+
                +company_no
                +"','"+hyunjang_state
                +"');";
            console.log(company_no);
            console.log(query+": closing_data 불러옴");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }
    });

}

dashboard_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = dashboard_info;