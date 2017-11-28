// JavaScript Document

var password = function ()
{

    var test = "test_var";

    return {


        password_sujung : function(){

            var user_pwd = $('#pwd').val();

            var gubun1 = "check";
            var iData1 = ['user_pwd','infoType'];
            iData1[0] = user_pwd;
            iData1[1] = 'private';
            var result1 = _DB_query.httpService("password_info",gubun1, iData1);

            var msg1 = result1[0].data[0][0].msg;
            var return_code1 = result1[0].data[0][0].return_code;


            if(return_code1 =="100"){

                var pwd1 = $('#new_pwd1').val();
                var pwd2 = $('#new_pwd2').val();
                if(pwd1 !==pwd2){
                    alert('일치하지 않습니다. 비밀번호를 확인하세요.');
                    return false
                }

                var gubun = "S";
                var iData = ['new_pwd', 'email'];
                iData[0] = $('#new_pwd1').val();
                iData[1] = '';



                var result = _DB_query.httpService("password_info",gubun, iData);

                var msg = result[0].data[0][0].msg;
                var return_code = result[0].data[0][0].return_code;

                if(return_code =="100"){
                    alert(msg);
                    location.reload();

                }


                // 신상정보를 수정하면 재로그인 하도록,

            }else if(return_code1 =='200'){
                alert(msg1);
            }







        }



    };

}();



