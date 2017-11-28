// JavaScript Document

var closing = function ()
{

    var test = "test_var";

    return {

        monthly_closing_load : function(){
            $('#kongsu_table_body').empty();
            var gubun = "R";
            var iData = ['hyunjang_no','daily_employee_num','month','daily','infoType'];
            /* 임시 데이터 베이스*/


            iData[0] = $('#hyunjang_select').val();
            iData[1] = '';
            iData[2] = $('#toMonth').val();  // 날짜  2017-08  (월까지만 자른다.)
            iData[3] = '';
            iData[4] = 'monthly';  //'daily'


            var result = _DB_query.httpService("kongsu_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            var total_money = 0;
            var total_danga = 0;
            if(res  == false) {
                //alert('db없음');
                var month = $('#toMonth').val();
                //alert(month + ' 입력값이 없습니다.');
                var empty = '';
                empty += "<div style='text-align:center; padding-top:100px;'>"+month+" 등록된 리스트가 없습니다"+"</div>"
                $('#kongsu_table_body').append(empty);
            }

            for (var i = 0; i < res_num; i++)
            {

                var str = '';




                if(res[i].attendance == null){
                    kongsu = '미입력';
                    // TODO 결석 배열 만들어서 결석 토탈에 넣어준다.
                }else{
                    var attendance_info = res[i].attendance;
                    var attendance =  attendance_info.split('//');


                    //console.log(attendance);
                    var kongsu_daily = attendance[0].split('@@');
                    var tot_num = kongsu_daily.length;
                }
                var k = i+1;

                str += "<tr>"
                str += "<td style='display:none;'>" + res[i].daily_employee_num + "</td>";
                str += "<td>" + k + "</td>";
                str += "<td>" + res[i].name + "</td>";
                str += "<td>" + res[i].job+ "</td>";
                str += "<td>" + res[i].jumin1 +"-"+ res[i].jumin2 + "</td>";

                var daily_salary_total = res[i].daily_salary;
                var total_salary = 0;  // 금액을 더할 때는 in 로 초기값 설정해야 한다.
                str += "<td>"
                var kongsu_total = 0; // 공수합계를 구하는 변수
                    for(var j = 0; j < tot_num; j++){

                        if(j>31){
                            break;
                        }

                        str += "<div class='label_week_date'>"+kongsu_daily[j] + "</div>";
                        total_salary += daily_salary_total * kongsu_daily[j];

                        var kongsu = parseFloat(kongsu_daily[j]);

                        if(kongsu_daily[j]>0){
                            kongsu_total += kongsu
                        }

                    }
                str += "</td>";
                str += "<td>"+ kongsu_total.toFixed(1)+"</td>";
                str += "<td>"+ res[i].daily_salary.toLocaleString() +"</td>";
                str += "<td>"+  total_salary.toLocaleString() +"</td>";
                str += "<td>"+"</td>"
                str += "</tr>"
                $('#kongsu_table_body').append(str);


                total_money += total_salary;
                total_danga += res[i].daily_salary;
            }

            var money = total_money.toLocaleString();
            //alert(money);
            //alert(res_num);
            var average_money = (total_salary/res_num).toLocaleString();
            var average_danga = (total_danga/res_num).toLocaleString();
            $('#total_num').text(res_num + " 명");
            $('#total_money').text(money+ " 원");
            $('#average_monthly_salary').text(average_money+ " 원");
            $('#average_danga').text(average_danga+ " 원");

        },


    };

}();



