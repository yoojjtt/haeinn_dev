// JavaScript Document

var retire = function ()
{

    var test = "test_var";

    return {

        monthly_closing_load : function(){
            alert('조회 시작');


                var gubun = "R";
                var iData = ['hyunjang_no','daily_employee_num','month','daily','infoType'];
                /* 임시 데이터 베이스*/


                iData[0] = $('#hyunjang_select').val();
                iData[1] = '';
                iData[2] = $('#toMonth').val();  // 날짜  2017-08  (월까지만 자른다.)
                iData[3] = '';
                iData[4] = 'retire';  //'daily'


                var result = _DB_query.httpService("retire_info",gubun, iData);
                var res = result[0].data[0];
                var res_num = result[0].data[0].length;
                var total_money = 0;
                var total_danga = 0;

                 var present_kongsu = 0;


                if(res[0]){
                    alert('조회완료');
                }else{
                    alert('조회 결과 없음');
                    $('#retire_table_body').empty();
                    return false
                }
                $('#retire_table_body').empty();


                for (var i = 0; i < res_num; i++)
                {

                    var str = '';
                    var k = i+1;

                    var work_month = res[i].retire_work_month
                console.log(work_month)



                        //alert(present[1]);



                    str += "<tr>"
                        str += "<td style='display:none;'>" + res[i].daily_employee_num + "</td>";
                        str += "<td>" + k + "</td>";
                        str += "<td>" + res[i].name + "</td>";
                        str += "<td>" + res[i].job+ "</td>";
                        str += "<td>" + res[i].jumin1 +"-"+ res[i].jumin2 + "</td>";
                        str += "<td>" + res[i].start_work + "</td>";

                        if(res[i].retire_work_month == ''){
                            work_month = '0';
                        }
                        str += "<td>" + work_month +"</td>";

                    str += "</tr>"
                    $('#retire_table_body').append(str);


                    //total_money += total_salary;
                    //otal_danga += res[i].daily_salary;


                }









        },


    };

}();



