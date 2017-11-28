
// JavaScript Document

var dashboard = function ()
{

    var test = "test_var";

    return {

        monthly_closing_load : function(){


            var month = $('#toMonth').val();
            //alert(month);


            var gubun = "R";
            var iData = ['month',];

            iData[0] = month;

            var result = _DB_query.httpService("dashboard_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            var j = 0;

            $('#dashboard_table_body').empty();



            for (var i = 0; i < res_num; i++)
            {

                j ++;
                var str = '';
                //var kongsu = res[i].kongsu;
                str += "<tr>"
                str += "<td>" + j +"</td>";
                str += "<td style='display:none;'>" + res[i].id + "</td>";
                str += "<td>" + res[i].hyun_jang_name + "</td>";
                str += "<td>" + res[i].bogoja + "</td>";
                str += "<td>" + res[i].balju_company + "</td>";
                str += "<td>" + res[i].hyunjang_start+ "</td>";
                str += "<td>" + res[i].hyunjang_end+ "</td>";

                str += "<td>" + res[i].num_manager+"명" + "</td>";
                str += "<td>" + res[i].num_worker+"명" + "</td>";


                if(res[i].average_danga  == null){
                    res[i].average_danga = 0;
                }
                //console.log(res[i].average_danga);
                var average_danga = parseInt(res[i].average_danga).toLocaleString();

                // var average_danga = parseInt(res[i].average_danga).toLocaleString();
                // if(average_danga == NaN){
                //     average_danga = '미등록';
                // }
                str += "<td>" + average_danga + "</td>";  //평균 단가

                 var average_pay = 0;
                // if(res[i].num_worker == 0){
                //     average_pay = 0;
                if(res[i].total_pay == null){
                         res[i].total_pay = 0;
                         average_pay = 0;
                }else{ // total_pay 값이 있다면...
                     average_pay = parseInt(parseInt(res[i].total_pay)/parseInt(res[i].num_worker));
                }


                //console.log(res[i].num_worker);
                //console.log(res[i].total_pay);

                str += "<td>" + average_pay.toLocaleString() + "</td>";  //평균 인건비
                str += "<td>" + parseInt(res[i].total_pay).toLocaleString() + "</td>"; //인건비 합계
                str += "<td>" + "얼마" + "</td>";
                str += "<td>" + "얼마" + "</td>";
                str += "<td>"+"</td>";
                str += "</tr>"
                $('#dashboard_table_body').append(str);
            }


            $('#total_num').empty().append(res_num);
        },
        closing_data_load : function(){
            var hyunjang_state = '';
            //TODO 나중에 현장이 종료이냐 진행이냐 구분해서 불러와야한다

            var gubun = "ALL";
            var iData = ['state'];

            iData[0] = hyunjang_state;

            var result = _DB_query.httpService("dashboard_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            var str = '';

            for (var i = 0; i < res_num; i++){
                str +="<table>";

                str += "<td>"+ res[i].company_id + "</td>";
                str += "<td>"+ res[i].hyunjang_id + "</td>";
                str += "<td>"+ res[i].monthly_date + "</td>";
                str += "<td>"+ res[i].total_num + "</td>";
                str += "<td>"+ res[i].total_money + "</td>";
                str += "<td>"+ res[i].avg_danga + "</td>";
                str += "<td>"+ res[i].avg_monthly_salary + "</td>";




    //               "<td>"+ res[i].avg_monthly_salary + "</td>";
                str +="</table>";

            }
            $('#contents').empty().append(str);

        }


    };

}();



