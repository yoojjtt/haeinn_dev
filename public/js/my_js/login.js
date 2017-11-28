// JavaScript Document

var login = function ()
{

    var test = "test_var";

    return {

        login_process : function(){
            var gubun = "R";
            var iData = ['id','password'];
            iData[0] = $('#user_id').val();
            iData[1] = $('#user_pwd').val();

            var result = _DB_query.httpService("session",gubun, iData);

            var res = result[0].data[0][0];
            var name = res.name;
            var id = res.user_id;
            var companyName = res.companyName;
            if(res){
                set_Cookie('sess_name',name,1);
                set_Cookie('sess_user_id',id,1);
                set_Cookie('sess_companyName',companyName,1);
                //alert(get_Cookie('session'));


                if(get_Cookie('sess_name')){
                    location.href='/';
                }
            }


        },
        logout_process : function(){
            var gubun = "D";
            var iData = ['id','password'];
            iData[0] = '';
            iData[1] = '';


            var result = _DB_query.httpService("session",gubun,iData);
            var res = result[0].data[0][0];
            if(res){
                return false;
            }else{ // res 없어야 정상;
                return true;
            }



        }


    };

}();



