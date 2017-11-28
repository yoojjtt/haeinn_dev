
var router_name = 'auth';

function auth(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

auth.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/auth/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="login") {

            var email = data[0];
            var pwd = data[1];


            var query = "CALL _auth('"+email+"','"+pwd+"')";

            console.log(query+": 접속");

           parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="logout"){



            var company_no = req.session.sess_company_no;
            var email = req.session.sess_userEmail;


            if(company_no){
                //session 없으면 cookies 있으면
                var company_no = data[0];
                var email = datap[1];
            }




            
            var query = "CALL _auth_logout('"+company_no+"','"+email+"')";

            console.log(query+": 로그아웃");

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }


    });

}

auth.prototype.query_after = function(res, req, result, error)
{
    var return_data = {
        "error": error, //error 가 안날경우 false;
        "data": result
    };
    var rd = return_data.data[0][0];
    //var res = result[0].data[0][0].msg;
    //console.log("where is name??"+ rd.name);   //name of undefined error!!
    //console.log(rd);
if(rd){


    req.session.sess_userEmail = rd.userEmail;  //session id 에 sess_name 값으로 저장
    req.session.sess_company_no = rd.companyNo;
    req.session.sess_type = rd.type;



    console.log('session_user'+':'+req.session.sess_userEmail
        +", "+'session_type'+':'+req.session.sess_type
        +", "+'session_companyNo'+':'+req.session.sess_company_no);



    //var return_result = req.session.sess_name;
   // console.log(return_result);
    res.json(return_data);

}else{

    delete req.session.sess_userEmail;
    delete req.session.sess_company_no;
    delete req.session.sess_type;



    console.log('session_delete'+':'+req.session.sess_userEmail+","+req.session.sess_type+","+req.session.sess_company_no);
    res.json(return_data);
}




}

module.exports = auth;