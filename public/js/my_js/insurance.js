// JavaScript Document

var insurance = function ()
{

    var test = "test_var";

    return {

        monthly_closing_load : function(){
            /*세금 정보를 먼저 불러온다. 혹시 오류 있을 수 있으니 변수뒤에 1을 붙여줌*/
            //alert('fh');
            alert('조회시작');
            var gubun1 = "R";
            var iData1 = ['company_id'];
            iData1[0] = '';

            var result1 = _DB_query.httpService("tax_info",gubun1, iData1);
            var res1 = result1[0].data[0][0];
            var exception = res1.exception; //면세 범위
            var income = res1.income; // 갑근세::  (월급여 - exception) * 갑근세 * 근무일 수
            var jumin = res1.jumin; // 주민세
            var p_employee = res1.p_employee/100; // 개인 고용 보험
            var c_employee = res1.c_employee; // 법인 고용 보험
            var p_med = res1.p_med/100; // 개인 건강보험
            var c_med = res1.c_med; // 법인 건강보험
            var p_old = res1.p_old/100; // 개인 노인고용보험
            var c_old = res1.c_old; // 법인 노인고용보험
            var p_pension = res1.p_pension/100; // 개인 국민연금
            var c_pension = res1.c_pension; // 법인 국민연금
            var startDay = res1.startDay;  // 세금 적용기간 시작일
            var endDay = res1.endDay;  //세금 적용기간 종료일


            //alert(exception);


            if(result1){
                var gubun = "R";
                var iData = ['hyunjang_no','daily_employee_num','month','daily','infoType'];
                /* 임시 데이터 베이스*/


                iData[0] = $('#hyunjang_select').val();
                iData[1] = '';
                iData[2] = $('#toMonth').val();  // 날짜  2017-08  (월까지만 자른다.)
                iData[3] = '';
                iData[4] = 'insurance';  //'daily'


                var result = _DB_query.httpService("kongsu_info",gubun, iData);
                var res = result[0].data[0];
                var res_num = result[0].data[0].length;
                var total_money = 0;
                var total_danga = 0;
                var hyunjang_sort = res[0].hyunjang_sort;

                if(res[0]){
                    alert('조회완료');

                }else{
                    alert('조회 결과 없음');
                    $('#nomu_table_body').empty();
                    return false
                }


                var exception_money = parseInt(exception);
                var income_rate = parseInt(income)/100;
                var jumin_tax = parseInt(jumin)/100;




                $('#nomu_table_body').empty();
                for (var i = 0; i < res_num; i++)
                {

                    var str = '';
                    if(res[i].attendance == null){
                        var kongsu = '';  //1@3@1@12@1@1@... 형식의 공수

                        var attendace_info = '';  // //기준으로 자른 공수,  입사일   kongsu_daily
                        var startWork = '';
                        var kongsu_daily = '';
                        //console.log(startWork);
                    }else{
                        var kongsu = res[i].attendance;  //1@3@1@12@1@1@... 형식의 공수

                        var attendace_info = kongsu.split('//');  // //기준으로 자른 공수,  입사일   kongsu_daily
                        var startWork = attendace_info[1];
                        var kongsu_daily = attendace_info[0].split('@@');
                        //console.log(startWork);
                    }






                    var tot_num = kongsu_daily.length; // 총 명개 인지 31/30/29/28 이올 수 있다.

                    if(res[i].before_attendance == null){
                        var before_kongsu_row = '';  // 전 달 공수
                        var before_attendance = '';
                        var before_kongsu_daily = '';
                        var before_startWork = '';
                        var before_daily_salary = 0;
                        var before_tot_num = 0;

                        //console.log(before_startWork);
                    }else{
                        var before_kongsu_row = res[i].before_attendance;  // 전 달 공수
                        var before_attendance = before_kongsu_row.split('//');
                        var before_kongsu_daily =before_attendance[0].split('@@');
                        var before_startWork = before_attendance[1];
                        var before_daily_salary = res[i].before_daily_salary;
                        var before_tot_num = before_kongsu_daily.length;

                        //console.log(before_startWork);
                    }


                    //alert(bank_name+bank_owner+bank_account);

                    if(res[i].attendance == null){
                        kongsu = '미입력';
                        // TODO 결석 배열 만들어서 결석 토탈에 넣어준다.
                    }
                    var k = i+1;

                    str += "<tr>"
                    str += "<td style='display:none;'>" + res[i].daily_employee_num + "</td>";  // 일용직 근로자의 id
                    str += "<td>" + k + "</td>";  //index
                    str += "<td>" + res[i].name + "</td>";  //일용직 근로자의 성명
                    str += "<td>" + res[i].job+ "</td>";   //일용직 근로자의 직종
                    str += "<td>" + res[i].jumin1 +"-"+ res[i].jumin2 + "</td>"; //일용직 근로자의 주민등록번호



                    /*  전월 값 계산*/

                    var before_daily_salary = parseInt(res[i].before_daily_salary);  //전달 단가를 int 형으로
                    var before_total_salary = 0;  // 전달 노무비 합
                    var before_kongsu_total = 0; // 전달 공수 합
                    var before_work_day = 0; //전달 근무일 수

                    for(var k = 0; k < before_tot_num; k++){  //전월 공수 계산하기위한 for문

                        var before_kongsu = before_kongsu_daily[k]; // 전달의 공수를 @로 자른 배열
                       if(before_kongsu_daily[k]>0){
                            before_kongsu_total += parseInt(before_kongsu);
                            before_work_day += 1;

                       }
                    }

                    str += "<td>" + before_work_day + "</td>";
                    str += "<td>" + before_kongsu_total+ "</td>";





                    // str += "<td>" + (before_kongsu_total*before_daily_salary).toLocaleString() + "</td>";  //전월 노무비 총합
                    
                    //console.log(before_startWork)
                    if(before_startWork == ''){
                        before_startWork ='입사 기록 없음';
                    }
                    
                    
                    
                    str += "<td>" + before_startWork + "</td>";

                    /* 현재월에 대한 금액 공수 게산 */
                    var daily_salary_total = res[i].daily_salary;
                    var total_salary = 0;  // 금액을 더할 때는 int 로 초기값 설정해야 한다.
                    var gab_tax = 0;  // 갑근세계산을 위한 float 변수;
                    var daily_salary = parseInt(res[i].daily_salary);  // 단가를 String 형에서 계산하기위해 FLOAT 으로 바꿈
                    var kongsu_total = 0;

                    for(var j = 0; j < tot_num; j++){

                        //str += "<div class='label_week_date'>"+kongsu_daily[j] + "</div>";
                        total_salary += daily_salary_total * kongsu_daily[j];
                        var kongsu = parseInt(kongsu_daily[j]);
                        //alert(kongsu);
                        if(kongsu_daily[j]>0){
                            kongsu_total += kongsu


                        }

                        if(daily_salary > 100000){  // 단가가 면세액 기준 보다 높은 경우 갑근세 해당
                            if(kongsu_daily[j]>0){  // 공수가 1 이상인 것 한에서 적용 //TODO 공수가 있는 것 한해서 계산해야한다.
                                gab_tax += (daily_salary*kongsu-exception_money) * income_rate;  // 갑근세 계산식!!

                            }
                        }
                    }

                    str += "<td>"+ kongsu_total.toFixed(1)+"</td>";
                    str += "<td>"+ res[i].daily_salary.toLocaleString() +"</td>";  //단가(String)
                    str += "<td>"+  total_salary.toLocaleString() +"</td>";   // 노무비 총액(String)



                    var gab_tax_c = gab_tax.toFixed(0); // data 형이 string이 아닌 float 을 위해서
                    var gab_tax_val = Number(gab_tax.toFixed(0));  // , string 돈 액수로 표현하기 위해서
                    var jumin_tax_c = (gab_tax_c*jumin_tax).toFixed(0); // 계산할 떄 float 값으로 들어와야된다.
                    var jumin_tax_val = Number(jumin_tax_c);
                    var employee_tax = Math.floor((total_salary*p_employee)/10)*10 ;  //  노무비 총액 * 개인 고용보험율 (0.065)






                    /*국민 건강에 대해서 */
                    if(hyunjang_sort == '건설') {
                        //alert(hyunjang_sort);
                        //alert(kongsu_total);
                        if(kongsu_total >= 20){


                            /*국민연금 && 의료보험*/
                            if(total_salary > 4490000){

                                var pension_tax = Math.floor((4490000*p_pension)/10)*10;  //노무비 총액  * 개인 국민연금(0.045)
                                var med_tax = Math.floor((total_salary*p_med)/10)*10; // 노무비 총액 * 개인 의료보험율 (0.036)
                                var old_tax = Math.floor((med_tax*p_old)/10)*10; // 개인의료보험 * 노인장기보험율(0.0655)
                                var med_old_tax = med_tax+old_tax; // 의료보험 + 노인장기용양  = 건강보험

                            }else if(total_salary>280000 && total_salary < 4490000){
                                var pension_tax = Math.floor((total_salary*p_pension)/10)*10;  //노무비 총액  * 개인 국민연금(0.045)
                                var med_tax = Math.floor((total_salary*p_med)/10)*10;
                                var old_tax = Math.floor((med_tax*p_old)/10)*10;
                                var med_old_tax = med_tax+old_tax;
                            }else{
                                var pension_tax = 12600;
                                var med_tax = 8560; //
                                var old_tax = 560; //
                                var med_old_tax = med_tax+old_tax;
                            }

                        }else{
                            var med_old_tax = 0;
                            var pension_tax = 0;
                        }
                    }else{// 일반 공사인경우
                        //alert(hyunjang_sort);
                        if(kongsu_total >= 7){
                            /*국민연금 && 의료보험*/
                            if(total_salary > 4490000){

                                var pension_tax = Math.floor((4490000*p_pension)/10)*10;  //노무비 총액  * 개인 국민연금(0.045)
                                var med_tax = Math.floor((total_salary*p_med)/10)*10; // 노무비 총액 * 개인 의료보험율 (0.036)
                                var old_tax = Math.floor((med_tax*p_old)/10)*10; // 개인의료보험 * 노인장기보험율(0.0655)
                                var med_old_tax = med_tax+old_tax; // 의료보험 + 노인장기용양  = 건강보험

                            }else if(total_salary>280000 && total_salary < 4490000){
                                var pension_tax = Math.floor((total_salary*p_pension)/10)*10;  //노무비 총액  * 개인 국민연금(0.045)
                                var med_tax = Math.floor((total_salary*p_med)/10)*10;
                                var old_tax = Math.floor((med_tax*p_old)/10)*10;
                                var med_old_tax = med_tax+old_tax;
                            }else{
                                var pension_tax = 12600;
                                var med_tax = 8560; //
                                var old_tax = 560; //
                                var med_old_tax = med_tax+old_tax;
                            }
                        }else{
                            var med_old_tax = 0;
                            var pension_tax = 0;
                        }
                    }




                    // var med_tax = total_salary*p_med;  // 노무비 총액 * 개인 의료보험율 (0.036)
                    // var pension_tax = total_salary*p_pension;  //노무비 총액  * 개인 국민연금(0.045)


                    console.log(gab_tax_c +"//"+ jumin_tax_c +"//"+ employee_tax +"//"+ med_old_tax+"//"+ pension_tax);



                    var total_tax_sum = Number(parseInt(gab_tax_c) + parseInt(jumin_tax_c)+parseInt(employee_tax)+parseInt(med_old_tax)+parseInt(pension_tax));

                    if(gab_tax_val == '0'){  // 면제기준이면 치환
                        gab_tax_val = '-';
                    }
                    if(jumin_tax_val == '0'){  //갑근이 면제이면 주민도 면제 치환
                        jumin_tax_val = '-';
                    }
                    if(employee_tax =='0'){
                        employee_tax ='-';
                    }
                    if(med_old_tax == '0'){
                        med_old_tax ='-';
                    }
                    if(pension_tax == '0'){
                        pension_tax ='-';
                    }

                    var real_income = (total_salary - total_tax_sum);

                    str += "<td>"+ gab_tax_val.toLocaleString() +"</td>";   //갑근세
                    str += "<td>"+ jumin_tax_val.toLocaleString()+"</td>";  //주민세
                    str += "<td>"+  employee_tax.toLocaleString() +"</td>";//고용보험
                    str += "<td>"+  med_old_tax.toLocaleString() +"</td>";//의료보험
                    str += "<td>"+  pension_tax.toLocaleString() +"</td>";//국민연금
                    str += "<td>"+  total_tax_sum.toLocaleString() +"</td>"; // 공제 합계
                    str += "<td>"+  real_income.toLocaleString() +"</td>";  //차감된 지급액


                    /*신고 유형 계산 */
                    var before_date = before_startWork.split('-');
                    console.log(startWork)
                    var present_date = startWork.split('-');
                    var report_tax_type = '';


                   
                    before_total_salary = before_kongsu_total*before_daily_salary;  //전달 임금


                    console.log("total_salary, before"+total_salary+","+before_total_salary);
                    console.log("present_date[2]"+present_date[2]);


                    if(kongsu_total >= 20){  // 20일 이상 근무자 무조건 취득신고
                        report_tax_type = "<span style='color:blue;'>"+'취득신고';
                        
                        if(total_salary = before_total_salary ){  //전달 급여랑 이번달 급여가 같다면 아님
                            report_tax_type += ''
                        }else if(before_kongsu_total >= 20){  //다르다면 급여변동신고 추가
                            report_tax_type += ',급여변동신고'
                        }
                        if(present_date[2] == '01'){  //1일 입사자
                            report_tax_type += '(납입)'+"</span>";
                        }else{
                            report_tax_type += '(미납입)'+"</span>";
                        }
                    }else{

                        if(before_kongsu_total >= 20){ //전달에 일했음
                            report_tax_type = "<span style='color:red;'>"+'상실 신고';
                        }

                    }


                    str += "<td>"+report_tax_type+"</td>";  //신고유형


                    str += "</tr>"
                    $('#nomu_table_body').append(str);


                    total_money += total_salary;
                    total_danga += res[i].daily_salary;
                }



                /*상단 결산 값 */
                var money = total_money.toLocaleString();
                //alert(money);
                //alert(res_num);
                var average_money = (total_salary/res_num).toLocaleString();
                var average_danga = (total_danga/res_num).toLocaleString();
                $('#total_num').text(res_num + " 명");
                $('#total_money').text(money+ " 원");
                $('#average_monthly_salary').text(average_money+ " 원");
                $('#average_danga').text(average_danga+ " 원");
            }






        },


    };

}();



