// JavaScript Document

var daily_employee = function ()
{

    var test = "test_var";

    return {

        daily_employee_load : function(job){
            //alert(job)
            var gubun = "R";
            var iData = ['job'];
            iData[0] = job;

            var result = _DB_query.httpService("daily_employee_info",gubun, iData);
            var res = result[0].data[0];

            var res_num = result[0].data[0].length;
            $('#total_daily_employee_no').empty().append(res_num);
            $("#daily_employee_list").empty();
            for (var i = 0; i < res_num; i++)
            {
                var str = '';
                var j = i+1;

                str += "<tr>";
                //str += "<td>" + j + "</td>";
                str += "<td>" + res[i].job + "</td>";
                str += "<td>" + res[i].name + "</td>";
                str += "<td>" + res[i].jumin1 + "</td>";
                str += "<td style='display:none;'>" + res[i].id + "</td>";

                str += "</tr>";
                $("#daily_employee_list").append(str);
            }


        },
        daily_employee_indv_load : function(employee_id) {

         var gubun = "individual";
         var iData = ['employee_id'];
         iData[0] = employee_id;

        var result = _DB_query.httpService("daily_employee_info",gubun, iData);
        var msg = result[0].data[0][0].msg;
        var res = result[0].data[0][0];
        var return_code = result[0].data[0][0].return_code;

            $('#daily_employee_name').val(res.name);
            $('#daily_employee_id').val(res.id);

            $('#daily_employee_jumin1').val(res.jumin1);
            $('#daily_employee_jumin2').val(res.jumin2);


            //var str = "<option>"+res.job+"</option>";
            //$('#daily_employee_job').empty().append(str);
            $('#daily_employee_job').val(res.job);
            var phone = res.phone.split("-");

            $('#daily_employee_phone1').val(phone[0]);
            $('#daily_employee_phone2').val(phone[1]);
            $('#daily_employee_phone3').val(phone[2]);

            $('#daily_employee_postnum').val(res.postnum);
            $('#daily_employee_address1').val(res.address1);
            $('#daily_employee_address2').val(res.address2);

            $('#daily_employee_bank_owner').val(res.bank_owner);

            //var str2 = "<option>"+res.bank_name+"</option>";
            //$('#daily_employee_bank_name').empty().append(str2);
            $('#daily_employee_bank_name').val(res.bank_name);
            $('#daily_employee_bank_account').val(res.bank_account);

        },
        new_daily_employee : function(){
            $('#daily_employee_name').val('');
            $('#daily_employee_job').val('0');
            $('#daily_employee_id').val('');
            $('#daily_employee_jumin1').val('');
            $('#daily_employee_jumin2').val('');
            $('#daily_employee_phone1').val('');
            $('#daily_employee_phone2').val('');
            $('#daily_employee_phone3').val('');
            $('#daily_employee_postnum').val('');
            $('#daily_employee_address1').val('');
            $('#daily_employee_address2').val('');
            $('#daily_employee_bank_name').val('0');
            $('#daily_employee_bank_owner').val('');
            $('#daily_employee_bank_account').val('');

        },
        daily_employee_save : function(){


            var phone1 = $('#daily_employee_phone1').val();
            var phone2 = $('#daily_employee_phone2').val();
            var phone3 = $('#daily_employee_phone3').val();
            var phone = phone1 + "-" + phone2 + "-" + phone3;


            var gubun = "S";
            var iData = ['name','id','job','jumin1','jumin2','phone','postnum', 'address1', 'address2', 'bank_name','bank_owner', 'bank_account'];


            iData[0] = $('#daily_employee_name').val();
            iData[1] = $('#daily_employee_id').val();
            iData[2] = $('#daily_employee_job').val();
            iData[3] = $('#daily_employee_jumin1').val();
            iData[4] = $('#daily_employee_jumin2').val();
            iData[5] = phone;
            iData[6] = $('#daily_employee_postnum').val();
            iData[7] = $('#daily_employee_address1').val();
            iData[8] = $('#daily_employee_address2').val();
            iData[9] = $('#daily_employee_bank_name').val();
            iData[10] = $('#daily_employee_bank_owner').val();
            iData[11] = $('#daily_employee_bank_account').val();


            var result = _DB_query.httpService("daily_employee_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var return_code = result[0].data[0][0].return_code;

            if(return_code =="100"){
                alert(msg);
                location.reload();

            }

        }



    };

}();



