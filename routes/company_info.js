
var router_name = 'company_info';

function company_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

company_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/company_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = req.session.sess_company_no;

            var query = "CALL company_list_R('"+company_no+"')";

            console.log(query+": 회사정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="S"){
            var company_name = data[0];
            var president_email = data[1];
            var president = data[2];
            var c_phone = data[3];
            var c_fax = data[4];
            var c_postnum = data[5];
            var c_address1 = data[6];
            var c_address2 = data[7];
            var c_LawNumber = data[8];
            var c_bank_owner = data[9];
            var c_bank_name = data[10];
            var c_bank_account = data[11];

            var query = "CALL company_list_S('"+company_name+"','','"+president+"','"+c_phone+"','"+c_fax+"','"+c_postnum+"','"+c_address1+"','"
                +c_address2 +"','"+c_LawNumber+"','"+c_bank_owner+"','"+c_bank_name+"','"+c_bank_account+"','','','"+president_email+"')";

            console.log(query+ ": 회사정보 수정");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }


    });

}

company_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = company_info;