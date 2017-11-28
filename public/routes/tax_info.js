
var router_name = 'tax_info';

function tax_info(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

tax_info.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/tax_info/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var company_no = req.session.sess_company_no;



            var query = "CALL tax_R('"+company_no+"')";

            console.log(query+": 세금정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="S"){
            //TODO ONLY super_user....
            var company_no = data[0];



            var query = "CALL tax_S('"+company_no+"')";

            console.log(query+": 세금정보 로드");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }

    });

}

tax_info.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = tax_info;