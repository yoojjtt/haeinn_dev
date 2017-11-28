
var router_name = 'hyunjang_info';

function hyunjang_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

hyunjang_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/hyunjang_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = req.session.sess_company_no;
            var proc = data[0];



            var query = "CALL hyunjang_R('"+company_no+"','','"+proc+"')";

            console.log(query+": 현장리스트 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="individual"){
            var company_no = req.session.sess_company_no;
            var hyunjang_id = data[0];


            var query = "CALL hyunjang_R('"+ company_no +"','"+ hyunjang_id+"','')";

            console.log(query+": 개별 현장정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }
        if(gubun == "S"){
            var hyunjang_id = data[0];
            var hyun_jang_name = data[1];
            var proc = data[2];
            var hyunjang_sort = data[3]
            var bogoja = data[4];
            var balju_company = data[5];
            var hyun_jang_number = data[6];
            var manageNumber = data[7];
            var hyunjang_start = data[8];
            var hyunjang_end = data[9];
            var hyun_jang_content = data[10];
            var remark = data[11];
            var company_no = req.session.sess_company_no;
            var email = req.session.sess_userEmail;


            var query = "CALL hyunjang_S("+hyunjang_id
                +",'"+ hyun_jang_name
                +"','"+ proc
                +"','"+ hyunjang_sort
                +"','"+bogoja
                +"','"+balju_company
                +"','"+hyun_jang_number
                +"','"+manageNumber
                +"','"+hyunjang_start
                +"','"+hyunjang_end
                +"','"+hyun_jang_content
                +"','"+remark
                +"','"+company_no
                +"','"+ email
                +"')";

            console.log(query+": 개별 현장정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }


    });

}

hyunjang_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = hyunjang_info;