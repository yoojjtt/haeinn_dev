// JavaScript Document

var member = function ()
{

    var test = "test_var";

    return {

        member_register : function(){
            var email = $('#email').val();
            var phone = $('#phone').val();
            var pwd1 = $('#pwd1').val();
            var pwd2 = $('#pwd2').val();
            if(!email || !phone || !pwd1 || !pwd2){
                alert('입력값을 전부 입력하세요');
                if (!email){
                    alert('이메일을 입력하세요');
                    $('#email').focus();
                    return false
                };
                if(!phone){
                    alert('핸드폰 번호를 입력하세요');
                    $('#phone').focus();
                    return false
                }
                if(!pwd1){
                    alert('비밀번호를 입력하세요');
                    $('#pwd1').focus();
                    return false
                }
                if(!pwd2){
                    alert('비밀번호를 확인하세요');
                    $('#pwd2').focus();
                    return false
                }

            }else if(pwd1 !== pwd2){
                alert('비밀번호가 일치하지 않습니다.');
                $('#pwd1').focus();
                return false
            }else{
                var gubun = "president_register";
                var iData = ['email','phone','pwd'];
                iData[0] = email;
                iData[1] = phone;
                iData[2] = pwd1;


                //alert(iData[5]);
                var result = _DB_query.httpService("member",gubun, iData);

                var msg = result[0].data[0][0].msg;
                var return_code = result[0].data[0][0].return_code;
                if(return_code == '200'){
                    alert(msg);
                }else if(return_code == '100'){
                    alert(msg+ '7일간 서비스를 무료로 체험하세요!!');
                    location.href='/';
                }
            }









        },
        employee_register : function(){




        }


    };

}();



