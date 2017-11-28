// JavaScript Document

var auth = function ()
{

    var test = "test_var";

    return {

        login_process : function(){
            var gubun = "login";
            var iData = ['user_phone','user_pwd'];

            iData[0] = $('#user_email').val();
            iData[1] = $('#user_pwd').val();

            var result = _DB_query.httpService("auth",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var res = result[0].data[0][0];
            var last_time = result[0].data[0][0].last_time;
            var return_code = result[0].data[0][0].return_code;

                console.log(res);
            if(return_code =='100'){
                var email = res.userEmail;
                var company_no = res.companyNo;
                var type = res.type;
                set_Cookie('sess_userEmail',email,1);
                set_Cookie('sess_company_no',company_no,1);
                set_Cookie('sess_type',type,1);
                //alert(msg);
                alert("안녕하세요."+ last_time);


                if(get_Cookie('sess_company_no')){

                    location.href="/";

                }

            }else if(return_code == '600'){  //유효기간이 지난 경우
                alert(msg);

            }else if(return_code == '500'){  // 일치하는 회사계정이 없는 경우
                alert(msg);
                $('#company_id').val('');
            }
            else if(return_code =='200'){  //아이디 비번 틀림
                alert(msg);

                $('#user_email').val('');
                $('#user_pwd').val('');
            }






        },
        logout_process : function(){
            var gubun = "logout";
            var iData = ['company_no','email'];

            iData[0] = get_Cookie('sess_company_no');
            iData[1] = get_Cookie('sess_userEmail');
            // alert(iData[0]);
            // alert(iData[1]);
            var result = _DB_query.httpService("auth",gubun,iData);
            console.log(result);
            var msg = result[0].data[0][0].msg;
            alert(msg);
            if(msg){  // msg있을 경우 false
                deleteCookie('sess_userEmail');
                deleteCookie('sess_company_no');
                deleteCookie('sess_type');
                location.href='/';
                return true;
            }else{
                return false;
            }



        }


    };

}();



