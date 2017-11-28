
var router_name = 'daily_employee_register_info';

function daily_employee_register_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

daily_employee_register_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/daily_employee_register_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);
        if(gubun == "R"){
            var company_no = req.session.sess_company_no;
            var hyunjang_id = data[0];
            var month = data[1];

            var query = "CALL monthly_danga_R('"+company_no
            +"','"+hyunjang_id
            +"','"+month
            +"')";

            console.log(query+": 일용직 근로자 현장등록 load");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }


        if(gubun =="S") {
            var company_no = req.session.sess_company_no;
            var hyunjang_id = data[0];
            var value = data[1];
            var month = data[2];
            var ins_id = req.session.sess_userEmail;
            var total_num = data[3];





            var query = "CALL monthly_danga_S('"+company_no
                +"','"+hyunjang_id
                +"','"+value
                +"','"+month
                +"','"+ins_id
                +"','"+total_num
                +"')";

            console.log(query+": 일용직 근로자 현장등록 save");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="D"){


             var hyunjang_no = data[0];
             var month_d = data[1];
             var idGroup_d = data[2];
             var total_num_d = data[3];

             var query = "CALL monthly_danga_D('"+hyunjang_no
                 +"','"+month_d
                 +"','"+ idGroup_d
                 +"','"+ total_num_d
                 +"')";

             console.log(query+": 일용직 근로자 현장등록 delete");

             parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }


    });

}

daily_employee_register_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = daily_employee_register_info;