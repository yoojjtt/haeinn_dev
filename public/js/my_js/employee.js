// JavaScript Document

var employee = function ()
{

    var test = "test_var";

    return {

        employee_load : function(){  //profile에 개인정보, 직원리스트에서 클릭할 때 개인정보
            var gubun = "R";
            var iData = ['company_no', 'email', 'type'];
            iData[0] = '';
            iData[1] = '';
            iData[2] = '';
            var result = _DB_query.httpService("employee_info",gubun, iData);
            var res = result[0].data[0][0];
            var profile_email = document.getElementById("p_email");  // profile page의 email id값인지 확인

            if(profile_email){  // profile 에서 신상 조회할 때
                $('#p_email').val(res.email);
                $('#p_jumin1').val(res.jumin1);
                $('#p_jumin2').val(res.jumin2);
                $('#p_name').val(res.name);
                var phone = res.phone.split("-");
                $('#p_phone1').val(phone[0]);
                $('#p_phone2').val(phone[1]);
                $('#p_phone3').val(phone[2]);
                $('#p_postnum').val(res.postnum);
                $('#p_address1').val(res.address1);
                $('#p_address2').val(res.address2);
                $('#p_bank_owner').val(res.bank_owner);
                $('#p_bank_name').val(res.bank_name);
                $('#p_account').val(res.bank_account);

            }

        },
        employee_sujung : function(){  // 프로필 페이지에서 개인정보 수정
            //TODO profile 페이지일 경우에는 trim

            var user_pwd = $('#p_pwd').val();

            var gubun1 = "check";
            var iData1 = ['user_pwd','infoType'];
            iData1[0] = user_pwd;
            iData1[1] = 'private';
            var result1 = _DB_query.httpService("password_info",gubun1, iData1);

            var msg1 = result1[0].data[0][0].msg;
            var return_code1 = result1[0].data[0][0].return_code;


            if(return_code1 =="100"){

                var phone = $('#p_phone1').val() + "-" + $('#p_phone2').val() + "-" + $('#p_phone3').val();

                var gubun = "S";
                var iData = ['type', 'email','jumin1','jumin2','name','phone','bank_owner','bank_name','bank_account', 'postnum','address1','address2'];
                iData[0] = '';  //type 은 개인 private에서는 변경불가
                iData[1] = $('#p_email').val();
                iData[2] = $('#p_jumin1').val();
                iData[3] = $('#p_jumin2').val();
                iData[4] = $('#p_name').val();
                iData[5] = phone;
                iData[6] = $('#p_bank_owner').val();
                iData[7] = $('#p_bank_name').val();
                iData[8] = $('#p_account').val();
                iData[9] = $('#p_postnum').val();
                iData[10] = $('#p_address1').val();
                iData[11] = $('#p_address2').val();





                var result = _DB_query.httpService("employee_info",gubun, iData);

                var msg = result[0].data[0][0].msg;
                var return_code = result[0].data[0][0].return_code;

                if(return_code =="100"){
                    alert(msg);
                    location.reload();

                }

            }else if(return_code1 =='200'){
                alert(msg1);
            }









        },
        /***************************    employee_page   *****************************************/


        employees_all_load : function(company_no){  //직원 목록에 직원들 리스트 로드
            var gubun = "employees";
            var iData = ['company_no'];
            iData[0] = '';

            var result = _DB_query.httpService("employee_info",gubun, iData);



            var res = result[0].data[0];
            var res_num = result[0].data[0].length;


            for (var i = 0; i < res_num; i++)
            {
                var str = '';

                str += "<tr>"
                str += "<td style='display:none'>" + res[i].employee_id + "</td>"
                str += "<td>" + res[i].name + "</td>"
                str += "<td>" + res[i].phone + "</td>"
                str += "<td>" + res[i].email + "</td>"
                str += "<td>" + res[i].type + "</td>"



                str += "</tr>"
                $("#employees_list").append(str);
            }






        },
        indiv_load : function(employee_id){  // 직원정보 페이지에서 직원들 개인정보 로드할 때



            var gubun = "indiv_R";
            var iData = ['employee_id'];
            iData[0] = employee_id;

            var result = _DB_query.httpService("employee_info",gubun, iData);
            var res = result[0].data[0][0];


            //TODO 수정 여기서부터
            var phone = res.phone.split('-');

            $('#em_name').val(res.name);
            $('#em_jumin1').val(res.jumin1);
            $('#em_jumin2').val(res.jumin2);
            $('#em_phone1').val(phone[0]);
            $('#em_phone2').val(phone[1]);
            $('#em_phone3').val(phone[2]);
            $('#em_email').val(res.email);
            $('#em_account_owner').val(res.bank_owner);
            $('#em_account_name').val(res.bank_name);
            $('#em_account').val(res.bank_account);
            $('#em_type').val(res.type);
            $('#em_postnum').val(res.postnum);
            $('#em_address1').val(res.address1);
            $('#em_address2').val(res.address2);
        },
        new_employee : function(){  // 직원등록 버튼 클릭할 경우
            $('#employee_title').text('직원 신규등록');
            $('#em_name').val('');
            $('#em_jumin1').attr('disabled', false).val('');
            $('#em_jumin2').attr('disabled', false).val('');
            $('#em_phone').val('');
            $('#em_email').val('');
            $('#em_account_owner').val('');
            $('#em_account_name').val('');
            $('#em_account').val('');
            $('#em_type').val('');
            $('#em_postnum').val('');
            $('#em_address1').val('');
            $('#em_address2').val('');
            //$('#employee_update').hide();
            //$('#employee_delete').hide();
            //$('#employee_enroll').hide();
//TODO button 처리
            $('tr').removeClass('highlight');

        },
        employee_save : function(){  // 직원등록에서 저장할 경우, 직원정보 수정하고 저장할 경우
            var type = $('#em_type').val();
            var email = $('#em_email').val();
            var name = $('#em_name').val();
            var phone1 = $('#em_phone1').val();
            var phone2 = $('#em_phone2').val();
            var phone3 = $('#em_phone3').val();
            var account_owner = $('#em_account_owner').val();
            var account_name = $('#em_account_name').val();
            var account = $('#em_account').val();
            var jumin1 = $('#em_jumin1').val();
            var jumin2 = $('#em_jumin2').val();
            var jumin_num = jumin1.length + jumin2.length;
            var postnum = $('#em_postnum').val();
            var address1 = $('#em_address1').val();
            var address2 = $('#em_address2').val();

            //TODO 배열로 만들고 for문을 쓰면 코드를 줄일 수 있다.
            if(!email){
                alert('이메일은 필수사항입니다.');
                $('#em_email').focus();
                return false
            }
            if(!name){
                alert('이름은 필수사항입니다.');
                $('#em_name').focus();
                return false
            }
            if(!phone1 && !phone2 && !phone3){
                alert('핸드폰은 필수사항입니다.');
                $('#em_phone').focus();
                return false
            }
            if(!jumin1 && !jumin2){
                alert('주민번호는 필수사항입니다.');
                $('#em_jumin').focus();
                return false
            }

            if(jumin_num < 13){
                alert("주민 번호 형식이 잘못되었습니다.");
                return false
            }

            if(!postnum){
                alert('우편번호를 입력하세요');
                $('#em_postnum').focus();
                return false
            }
            if(!address1){
                alert('주소를 입력하세요');
                $('#em_address1').focus();
                return false
            }
            if(!address2){
                alert('상세주소를 입력하세요');
                $('#em_address2').focus();
                return false
            }
            /*else{
                var jumin1 = jumin.substring(0,5);
                var jumin2 = jumin.substring(6, 13);
            }*/

            /*
            if(jumin_num > 13 && jumin_num < 15){
                var juminArray = jumin.split("-");
                var jumin1 = juminArray[0];
                var jumin2 = juminArray[1];
            }
            */


            var phone = $('#em_phone1').val() + "-" + $('#em_phone2').val() + "-" + $('#em_phone3').val();

            var gubun = "S";
            var iData = ['type', 'email','jumin1','jumin2','name','phone','bank_owner','bank_name','bank_account', 'postnum','address1','address2'];
            iData[0] = type;
            iData[1] = email;
            iData[2] = jumin1;
            iData[3] = jumin2;
            iData[4] = name;
            iData[5] = phone;
            iData[6] = account_owner;
            iData[7] = account_name;
            iData[8] = account;
            iData[9] = postnum;
            iData[10] = address1;
            iData[11] = address2;



            var result = _DB_query.httpService("employee_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var return_code = result[0].data[0][0].return_code;

            if(return_code =="200"){
                alert(msg);
                location.reload();

            }
            if(return_code == '100'){
                alert(msg);
                location.reload();
            }
            if(return_code == '300'){
                alert(msg);
                location.reload();
            }

        },




    };

}();



