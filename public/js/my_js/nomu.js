// JavaScript Document

var nomu = function ()
{

    var test = "test_var";

    return {

        monthly_closing_load : function(){

        alert('조회 시작');


            $('#kongsu_table_body').empty();



            var gubun1 = "R";
            var iData1 = ['company_id'];
            iData1[0] = '';

            var result1 = _DB_query.httpService("tax_info",gubun1, iData1);
            /*세금 정보를 먼저 불러온다. 혹시 오류 있을 수 있으니 변수뒤에 1을 붙여줌*/


            var res1 = result1[0].data[0][0];
            var exception = res1.exception; //면세 범위
            var income = res1.income; // 갑근세::  (월급여 - exception) * 갑근세 * 근무일 수
            var jumin = res1.jumin; // 주민세
            var p_employee = res1.p_employee/100; // 개인 고용 보험
            var c_employee = res1.c_employee; // 법인 고용 보험
            var p_med = res1.p_med/100; // 개인 건강보험
            var c_med = res1.c_med; // 법인 건강보험
            var p_old = res1.p_old/100; // 개인 노인요양보험
            var c_old = res1.c_old; // 법인 노인요양보험
            var p_pension = res1.p_pension/100; // 개인 국민연금
            var c_pension = res1.c_pension; // 법인 국민연금
            var startDay = res1.startDay;  // 세금 적용기간 시작일
            var endDay = res1.endDay;  //세금 적용기간 종료일


            //alert(exception);

            //alert(result1);
            //alert($('#hyunjang_select').val());
           // alert($('#toMonth').val());
            if(result1){

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

                if(res[0]){
                    alert('조회완료');
                    //p._hidePage();
                    //loaderE
                    $('#conclusion_update').css('display', 'block');


                }else{
                    alert('조회 결과 없음');
                   // p._hidePage();

                    $('#kongsu_table_body').empty();
                    //$('#loading').css('display','none');

                    //TODO loaderE 추후에 다시 할 것
                    //loaderE
                    var empty = '';
                    empty += "<div style='text-align:center; padding-top:100px;'>"+"데이터가 없습니다"+"</div>"


                    $('#kongsu_table_body').append(empty);
                    return false
                }

                //console.log(result);
                var bogoja = res[0].bogoja;
                var hyun_jang_name = res[0].hyun_jang_name;
                var hyun_jang_number = res[0].hyun_jang_number;
                var company_name = res[0].company_name;
                var company_address = res[0].company_address;
                var company_phone = res[0].company_phone;
                var president = res[0].president;
                var hyunjang_sort = res[0].hyunjang_sort;
                var balju_company = res[0].balju_company;

                //alert(balju_company);
                $('#balju_company').empty().append(balju_company);
                $('#bogoja').empty().append(bogoja);
                /* 현장명, 사업장관리번호, 사업자명, 소재지, 공사명, 회사 전화번호,
                    고용관리 책임자, 책임자의 주민등록번호, 대표이름
                 */
                $('#hyun_jang_name').empty().append(hyun_jang_name);


                //$('#hyun_jang_number').empty().append(hyun_jang_number);
                $('#company_name').empty().append(company_name);
                $('#company_address').empty().append(company_address);
                $('#company_phone').empty().append(company_phone);
                $('#president').empty().append(president);
                //$('#acc_name').empty().append(acc_name);
                //$('#acc-jumin').empty().append(acc_jumin);




                var exception_money = parseInt(exception);
                var income_rate = parseInt(income)/100;
                var jumin_tax = parseInt(jumin)/100;












                $('#kongsu_table_body').empty();



                /*공수를 구하는 로직*/
                for (var i = 0; i < res_num; i++)
                {

                    var str = '';
                    if(res[i].attendance == null){
                        var kongsu = '';  //1@3@1@12@1@1@... 형식의 공수

                        var attendace_info = '';  // //기준으로 자른 공수,  입사일   kongsu_daily
                        var startWork = '';
                        var nullV = "0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@0@@";
                        var kongsu_daily = nullV.split('@@');
                        //console.log(startWork);
                    }else{
                        var kongsu = res[i].attendance;  //1@3@1@12@1@1@... 형식의 공수

                        var attendace_info = kongsu.split('//');  // //기준으로 자른 공수,  입사일   kongsu_daily
                        var startWork = attendace_info[1];
                        var kongsu_daily = attendace_info[0].split('@@');
                        //console.log(startWork);
                    }
                    var tot_num = kongsu_daily.length; // 자른 배열의 길이를 구한다.
                    //alert(tot_num);
                    if(res[i].attendance == null){  // 공수입력값이 없으면 미입력
                        kongsu = '미입력';
                        // TODO 결석 배열 만들어서 결석 토탈에 넣어준다.
                    }
                    var k = i+1;

                    str += "<tr>"
                    str += "<td style='display:none;'>" + res[i].daily_employee_num + "</td>";  //첫번쨰 칸:: (안보임) 근로자 id
                    str += "<td>" + k + "</td>";  //두번째 칸:: index
                    str += "<td>" + res[i].name + "</td>";//세번째 칸:: 이름
                    str += "<td>" + res[i].job+ "</td>";//네번째 칸:: 직종


                   var address1 =  res[i].address1;  //주소 편집
                   var address1_leng = address1.length;  // 주소가 길어지는 경우 잘라준다.
                   if(address1_leng >11 ){  // 11자보다 커지면 자른다.
                       //alert(address1_leng);
                       address1 = address1.substring(-10, 10);  // s_index, e_index
                       //alert(address1)
                   }

                    str += "<td>" 
                        +"<div class='label_week_date_jumin'>"+res[i].jumin1 +"-"+ res[i].jumin2 + "</div>"  //다섯번째 칸윗 부분:: 주민등록번호
                        +"<div class='label_week_date_jumin'>"+address1 + "</div>" // 다섯번째 칸 아래부분:: 주소
                        +"</td>";

                    var daily_salary_total = res[i].daily_salary;
                    var total_salary = 0;  // 금액을 더할 때는 in 로 초기값 설정해야 한다.
                    var gab_tax = 0;  // 갑근세계산을 위한 float 변수;

                    str += "<td>"  //출결현황을 찍는다.

                        var daily_salary = parseInt(res[i].daily_salary);  // 단가를 String 형에서 계산하기위해 Int 로 바꿈
                        var kongsu_total = 0;

                        for(var j = 0; j < tot_num; j++){
                            //if(kongsu_daily[j] == 0){
                            //str += "<div class='label_week_date'>"+"" + "</div>"
                            //}else{
                            str += "<div class='label_week_date'>"+kongsu_daily[j] + "</div>"  //여섯번째 칸:: 공수
                            total_salary += daily_salary_total * kongsu_daily[j];
                            var kongsu = parseInt(kongsu_daily[j]);

                            if(kongsu_daily[j]>0){
                                kongsu_total += kongsu
                            }

                            if(daily_salary > 100000){  // 단가가 면세액 기준 보다 높은 경우 갑근세 해당
                                if(kongsu_daily[j]>0){  // 공수가 1 이상인 것 한에서 적용 //TODO 공수가 있는 것 한해서 계산해야한다.
                                    gab_tax += (daily_salary*kongsu-exception_money) * income_rate;  // 갑근세 계산식!!



                                }
                            }

                            //}

                        }
                    str += "</td>";
                    str += "<td>"+ kongsu_total.toFixed(1)+"</td>";  //일곱번째 칸:: 공수합계
                    str += "<td>"+ res[i].daily_salary.toLocaleString() +"</td>";  //여덟번째 칸:: 단가(String)
                    str += "<td>"+  total_salary.toLocaleString() +"</td>";   //아홉번째 칸:: 노무비 총액(String)



                    var gab_tax_c = gab_tax.toFixed(0); // data 형이 string이 아닌 float 을 위해서
                    var gab_tax_val = Number(gab_tax.toFixed(0));  // , string 돈 액수로 표현하기 위해서
                    var jumin_tax_c = (gab_tax_c*jumin_tax).toFixed(0); // 계산할 떄 float 값으로 들어와야된다.
                    var jumin_tax_val = Number(jumin_tax_c);
                    //console.log(total_salary*p_med);
                    //console.log(total_salary*p_old);
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






                    //console.log(gab_tax_c +"//"+ jumin_tax_c +"//"+ employee_tax +"//"+ med_old_tax+"//"+ pension_tax);
                    var total_tax_sum = Number(parseInt(gab_tax_c) + parseInt(jumin_tax_c)+parseInt(employee_tax)+parseInt(med_old_tax)+parseInt(pension_tax));

                    if(gab_tax_val == '0'){  // 면제기준이면 치환
                        gab_tax_val = '-';
                    }
                    if(jumin_tax_val == '0'){  //갑근이 면제이면 주민도 면제 치환
                        jumin_tax_val = '-';
                    }

                    var real_income = (total_salary - total_tax_sum);

                    str += "<td>"+ gab_tax_val.toLocaleString() +"</td>";   //갑근세
                    str += "<td>"+ jumin_tax_val.toLocaleString()+"</td>";  //주민세
                    str += "<td>"+  employee_tax.toLocaleString() +"</td>"; //고용보험
                    str += "<td>"+  med_old_tax.toLocaleString() +"</td>"; //건강보험
                    str += "<td>"+  pension_tax.toLocaleString() +"</td>"; //국민연금
                    str += "<td>"+  total_tax_sum.toLocaleString() +"</td>"; //세금합산
                    str += "<td>"+  real_income.toLocaleString() +"</td>"; // 정산금액

                    str += "</tr>"
                    $('#kongsu_table_body').append(str);


                    total_money += real_income;
                    total_danga += res[i].daily_salary;
                    //console.log(total_salary);
                } // 개인별 row계산 끝 for문 끝

                var money = total_money.toLocaleString();
                var average_money = parseInt(total_money/res_num).toLocaleString();
                var average_danga = parseInt(total_danga/res_num).toLocaleString();
                $('#total_num').text(res_num + " 명");
                $('#total_money').text(money+ " 원");
                $('#average_monthly_salary').text(average_money+ " 원");
                $('#average_danga').text(average_danga+ " 원");
            }






        },
        conclusion_save : function(){
            var total_row = $('#kongsu_table_body tr').length;
            var individual = [];
            var groups = '';
            for(var i=0; i<total_row; i++){

                var tr = $('#kongsu_table_body tr').eq(i);
                var id = tr.children().eq(0).text();
                var name = tr.children().eq(2).text();
                var job = tr.children().eq(3).text();
                var danga = tr.children().eq(6).text();
                var kongsu = tr.children().eq(7).text();
                var final_income = tr.children().eq(15).text();

                var person = "//"+id+"//"+name+"//"+job+"//"+danga+"//"+kongsu+"//"+final_income;

                groups += "@@"+person;


            }
            // //id//name//job//danga//공수/차감된지급


            var total_num = $('#total_num').text();
            var total_money = lib.uncomma($('#total_money').text());
            var average_monthly_salary = lib.uncomma($('#average_monthly_salary').text());
            var average_danga = lib.uncomma($('#average_danga').text());

            console.log(total_num);
            console.log(total_money);
            console.log(average_monthly_salary);
            console.log(average_danga);
            console.log(groups);


            var gubun = "closing";
            var iData = ['hyunjang_no',
                'monthly_date',
                'total_num',
                'total_money',
                'average_monthly_salary',
                'average_danga',
                'groups'
            ];
            /* 임시 데이터 베이스*/

            console.log($('#hyunjang_select').val() + $('#toMonth').val());

            iData[0] = $('#hyunjang_select').val();
            iData[1] = $('#toMonth').val();
            iData[2] = total_num;
            iData[3] = total_money;
            iData[4] = average_monthly_salary;
            iData[5] = average_danga;
            iData[6] = groups;




            var result = _DB_query.httpService("dashboard_info",gubun, iData);
            var res = result[0].data[0][0].msg;
            //var res_num = result[0].data[0].length;
            alert(res);
            //console.log(result);



        }


    };

}();



