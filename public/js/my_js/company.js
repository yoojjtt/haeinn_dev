// JavaScript Document

var company = function ()
{

    var test = "test_var";

    return {

        company_load : function(){

            var gubun = "R";
            var iData = ['company_no'];
            iData[0] = '';

            var result = _DB_query.httpService("company_info",gubun, iData);
            var res = result[0].data[0][0];

            $('#company_name').val(res.company_name);
            $('#president_email').val(res.president_email);
            $('#president').val(res.president);

            var phone = res.c_phone.split("-");
            var fax = res.c_fax.split("-");
            $('#c_phone1').val(phone[0]);
            $('#c_phone2').val(phone[1]);
            $('#c_phone3').val(phone[2]);
            $('#c_fax1').val(fax[0]);
            $('#c_fax2').val(fax[1]);
            $('#c_fax3').val(fax[2]);
            $('#c_postnum').val(res.c_postnum);
            $('#c_address1').val(res.c_address1);
            $('#c_address2').val(res.c_address2);
            $('#c_LawNumber').val(res.c_LawNumber);
            $('#c_bank_owner').val(res.c_bank_owner);
            $('#c_bank_name').val(res.c_bank_name);
            $('#c_bank_account').val(res.c_bank_account);





        },
        company_sujung : function() {
            var company_pwd = $('#c_pwd').val();  //대표자의 비밀번호

            var gubun1 = "check";
            var iData1 = ['company_pwd','infoType'];
            iData1[0] = company_pwd;
            iData1[1] = 'company';
            var result1 = _DB_query.httpService("password_info", gubun1, iData1);

            var msg1 = result1[0].data[0][0].msg;
            var return_code1 = result1[0].data[0][0].return_code;


            if (return_code1 == "100") {
                var gubun = "S";
                var iData = ['company_name', 'company_id', 'president', 'c_phone', 'c_fax', 'c_postnum',
                    'c_address1', 'c_address2', 'c_LawNumber', 'c_bank_owner', 'c_bank_name', 'c_bank_account'];
                iData[0] = $('#company_name').val();
                iData[1] = $('#president_email').val();
                iData[2] = $('#president').val();


                var phone = $('#c_fax1').val() + "-" + $('#c_fax2').val() + "-" + $('#c_fax3').val();
                var fax = $('#c_fax1').val() + "-" + $('#c_fax2').val() + "-" + $('#c_fax3').val();
                iData[3] = phone;
                iData[4] = fax;
                iData[5] = $('#c_postnum').val();
                iData[6] = $('#c_address1').val();
                iData[7] = $('#c_address2').val();
                iData[8] = $('#c_LawNumber').val();
                iData[9] = $('#c_bank_owner').val();
                iData[10] = $('#c_bank_name').val();
                iData[11] = $('#c_bank_account').val();


                var result = _DB_query.httpService("company_info", gubun, iData);

                var msg = result[0].data[0][0].msg;
                var return_code = result[0].data[0][0].return_code;

                if (return_code == "100") {
                    alert(msg);
                    location.reload();

                }


                // 신상정보를 수정하면 재로그인 하도록,


            }else if(return_code1 =='200'){
                alert(msg1);
            }
        },



    };

}();



