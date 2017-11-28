
var router_name = 'login';

function login(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

login.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/login_test/ajax.json

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);

        var id = data[0];
        var password = data[1];

        var return_data = {
            "result" : true,
            "recordset" : "hello api~"
        };
        //res.json(return_data);


        if(gubun=="R") {

            //var query = "CALL q('student_all', 'predict')";
            var query = "CALL zetyx_member_table_R('"+gubun+"','"+id+"','"+password+"','','','')";

            console.log(query);   // pm2 monit 의  console창에 프린트된다.

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }

        if(gubun=="S") {

            //var query = "CALL q('student_all', 'predict')";
            var query = "CALL zetyx_member_table_R('"
                +id+"','"
                +password
                +"','','',''"+ ")";

            console.log(query);   // pm2 monit 의  console창에 프린트된다.

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }


    });

}

login.prototype.query_after = function(res, req, result)
{

    console.log(result);



}

module.exports = login;