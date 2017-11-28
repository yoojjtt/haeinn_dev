

// JavaScript Document

var print = function ()
{

    var test = "test_var";

    return {

        nomu_pdf : function(){

            var p = window.parent.parent;

            alert('노무비 내역서');
            p._showPage();
            var img = new Image();
            img.addEventListener('load', function() {
                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                //doc.setPage(2);
                //doc.addPage(500, 270);  //w,h

                //doc.internal.getNumberOfPages(2);
                doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,


                //console.log("처음 " + pages)

                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');
                doc.addFont('gothic.ttf', 'LiLing', 'normal', 'Identity-H');
                doc.addFont('HARLOWSI.TTF', 'WMLWQI+HarlowSolid', 'normal', 'WinAnsiEncoding');
                doc.addFont('ITCBLKAD.TTF','a','normal','WinAnsiEncoding');
                doc.addFont('BOD_PSTC.TTF','b','normal','WinAnsiEncoding');
                doc.addFont('GADUGI.TTF', 'GADUGI', 'normal', 'WinAnsiEncoding');

                //doc.setDefaultFonts(0, 'Times');    //English default
                //doc.setDefaultFonts(1, 'normal');    //Korean default
                //doc.setDefaultFonts(3, 'LiLing');         //Chinese default
               // doc.setDefaultFonts(2, 'MsGothic');        //Japanese default

                //var name = $('#kongsu_table_body').children().children().eq(2).text();
                //var job = $('#kongsu_table_body').children().children().eq(3).text();

                var total_row = $('#kongsu_table_body tr').length;  //table의 총 row 수

                //var hyunjang = $('#hyunjang_select').text();
                var balju_company = $('#balju_company').text().toString();  //발주회사
                var bogoja = $('#bogoja').text();  // 보고자
                var hyun_jang_name = ($('#hyun_jang_name').text()).toString(); //현장이름
                var date = $('#toMonth').val(); // 날짜 input value




                //console.log(balju_company);
                doc.setFont('HeadlineR');        // set font
                doc.setTextColor(0,0,0);
                doc.setCharSpace(1);
                doc.setFontSize(6);
                doc.drawText(33,11,[balju_company]);
                doc.drawText(33,15,[hyun_jang_name]);
                doc.drawText(33,20,[hyun_jang_name]);
                doc.drawText(95,16,[date]);


                /*sum 을 구하는 배열*/
                var sum_total_kongsu =[];  // 모든 인원의 공수 합  배열
                var sum_danga = [];  // 단가 합 배열
                var sum_total_income = []; //노무비 총액 합
                var sum_gab_tax = []; // 갑 근세 합
                var sum_jumin_tax = [];  // 주민세 합
                var sum_employ_tax = [];  // 고용보험
                var sum_med_tax = []; // 건강보험
                var sum_pension = [];  //연금 합
                var sum_tax_total = [];  //공제 합계
                var sum_closing_money = [];  //차감된 지급액 합계

                var pages = 0; // 페이지 수를 계산하기 위해서,  페이지 수를 for문 밖에서 해야 초기화안됨



                for(var i=0; i<total_row; i++){  //개별 정보를 찍는 for 문!!!!!!

                    /*15칸이니까 15칸 씩 높이값 초기화, 15칸 다채워지면 addPage한다. */
                    if(i % 15 == 0){ h = 0;}  //첫번째 줄 i = 0 15로 나누면 나머지가 0 즉 첫줄의 높이는 0
                    if(i % 15 == 1){ h = 1;}
                    if(i % 15 == 2){ h = 2;}
                    if(i % 15 == 3){ h = 3;}
                    if(i % 15 == 4){ h = 4;}
                    if(i % 15 == 5){ h = 5;}
                    if(i % 15 == 6){ h = 6;}
                    if(i % 15 == 7){ h = 7;}
                    if(i % 15 == 8){ h = 8;}
                    if(i % 15 == 9){ h = 9;}
                    if(i % 15 == 10){ h = 10;}
                    if(i % 15 == 11){ h = 11;}
                    if(i % 15 == 12){ h = 12;}
                    if(i % 15 == 13){ h = 13;}
                    if(i % 15 == 14){ h = 14;pages +=1;}



                    // 페이지가 늘어나면,
                    if(i>0){
                        if(i % 15 == 0)
                        {  //i= 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14


                            /*페이지가 추가된다*/
                            doc.addPage(); //페이지 추가

                            //console.log("페이지 숫자:" +  pages);
                            doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                            doc.setFont('HeadlineR');        // set font
                            doc.setTextColor(0,0,0);
                            doc.setCharSpace(1);
                            doc.setFontSize(6);
                            doc.drawText(33,11,[balju_company]);
                            doc.drawText(33,15,[hyun_jang_name]);
                            doc.drawText(33,20,[hyun_jang_name]);
                            doc.drawText(95,16,[date]);

                        }
                    }

                    var tr = $('#kongsu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text().toString();
                    var name = tr.children().eq(2).text().toString();
                    var job = tr.children().eq(3).text().toString();
                    var jumin = tr.children().eq(4).find('div').eq(0).text().toString();
                    var address = tr.children().eq(4).find('div').eq(1).text().toString();



                    var kongsu = tr.children().eq(5).find('div');
                    //alert(kongsu.length);
                    var kongsuLeg = kongsu.length;

                    var total_kongsu = tr.children().eq(6).text();
                    var danga = tr.children().eq(7).text();
                    var total_income = tr.children().eq(8).text(); //노무비 총액
                    var gab_tax = tr.children().eq(9).text(); //갑근세
                    var jumin_tax = tr.children().eq(10).text(); //주민세
                    var employ_tax = tr.children().eq(11).text(); //고용보험
                    var med_tax = tr.children().eq(12).text(); //의료보험
                    var pension = tr.children().eq(13).text(); //국민연금
                    var tax_total = tr.children().eq(14).text(); // 공제합계
                    var closing_money = tr.children().eq(15).text();  //차감된 지급액




                    /* document에 출력 */
                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);

                    doc.setFontSize(6);
                    doc.drawText(7,(39+(11*h))-(1.4*h),[index]);
                    doc.drawText(13,(39+(11*h))-(1.4*h),[job]);

                    doc.setFontSize(7);
                    doc.drawText(20,(39+(11*h))-(1.4*h),[name]);

                    doc.setFontSize(6);
                    doc.setCharSpace(0);
                    doc.drawText(31,(41+(11*h))-(1.4*h),[address]);

                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.setCharSpace(0);

                    doc.drawText(32,(37+(11*h))-(1.4*h),[jumin]);


                    /* 31 kongsu 를 찍는  로직 */
                    for(var k=0; k<31; k++){

                        var kongsu_d = kongsu.eq(k).text();
                        if(kongsu_d == '0'  || kongsu_d == ""){  //공백에 대한 error를 막기위해
                            kongsu_d = ' ';
                        }

                        if(k<15){

                            doc.drawText(
                                60+(k*6)+(k*0.55)   //x position  60은 1일 시작 + [k]번쨰+ 폭이 늘어나면서 조금씩 더커져야
                                ,(36+(11*h))-(1.3*h)  //y position
                                ,[kongsu_d]
                            );
                        }else{
                            doc.drawText(
                                60+((k-15)*6)+((k-15)*0.55) //x position  두번째 줄 k-15는 k값이 16부터 시작해서
                                ,(41+(11*h))-(1.3*h)  //y position
                                ,[kongsu_d]
                            );
                        }
                    }/* text 값 잘못 찍으면 오류난다.*/


                    /*  총 공수, 일일 단가, 노무비 총액, 갑근세, 주민세, 고용보험, 의료보험, 국민연금, 계, 차감 지급액  */
                    doc.setFontSize(8);  //9 넘어가면 폰트 칸넘침

                    doc.drawText(165,(38+(11*h))-(1.4*h),[total_kongsu]);
                    doc.drawText(173,(38+(11*h))-(1.4*h),[danga]);
                    doc.drawText(186,(38+(11*h))-(1.4*h),[total_income]);
                    doc.drawText(203,(38+(11*h))-(1.4*h),[gab_tax]);
                    doc.drawText(215,(38+(11*h))-(1.4*h),[jumin_tax]);
                    doc.drawText(225,(38+(11*h))-(1.4*h),[employ_tax]);
                    doc.drawText(238,(38+(11*h))-(1.4*h),[med_tax]);
                    doc.drawText(250,(38+(11*h))-(1.4*h),[pension]);
                    doc.drawText(262,(38+(11*h))-(1.4*h),[tax_total]);
                    doc.drawText(274,(38+(11*h))-(1.4*h),[closing_money]);


                        sum_total_kongsu.push(Number(total_kongsu));
                        sum_danga.push(Number(lib.uncomma(danga)));
                        sum_total_income.push(Number(lib.uncomma(total_income)));
                        sum_gab_tax.push(Number(lib.uncomma(gab_tax)));
                        sum_jumin_tax.push(Number(lib.uncomma(jumin_tax)));
                        sum_employ_tax.push(Number(lib.uncomma(employ_tax)));
                        sum_med_tax.push(Number(lib.uncomma(med_tax)));
                        sum_pension.push(Number(lib.uncomma(pension)));
                        sum_tax_total.push(Number(lib.uncomma(tax_total)));
                        sum_closing_money.push(Number(lib.uncomma(closing_money)));

                        // 15 로 딱 나누어질 때 pages가 1이 늘어날 때 도 찍고, 배열이 끝날 때도 찍고





            /*소계 합계 찍는 로직 for문 안에서 만들어지고 있음*/
                    doc.setCharSpace(-0.5);
                    if(i>0){

                        if(i == 14){ //i 는 0부터 시작, 14일 때는 15번째

                            //console.log("1페이지일 때"+"공수합"+hab_sum(sum_total_kongsu));
                            var hab_total_kongsu = lib.hab_sum(sum_total_kongsu).toString(); // Number를 string으로 변환하지않으면 에러발생
                            var hab_danga = lib.hab_sum(sum_danga).toLocaleString();
                            var hab_total_income = lib.hab_sum(sum_total_income).toLocaleString();
                            var hab_gab_tax = lib.hab_sum(sum_gab_tax).toLocaleString();
                            var hab_jumin_tax = lib.hab_sum(sum_jumin_tax).toLocaleString();
                            var hab_employ_tax = lib.hab_sum(sum_employ_tax).toLocaleString();
                            var hab_med_tax = lib.hab_sum(sum_med_tax).toLocaleString();
                            var hab_pension = lib.hab_sum(sum_pension).toLocaleString();
                            var hab_tax_total  = lib.hab_sum(sum_tax_total).toLocaleString();
                            var hab_closing_money = lib.hab_sum(sum_closing_money).toLocaleString();
                            doc.drawText(165,183,[hab_total_kongsu]);
                            doc.drawText(173,183,[hab_danga]);
                            doc.drawText(187,183,[hab_total_income]);
                            doc.drawText(203,183,[hab_gab_tax]);
                            doc.drawText(215,183,[hab_jumin_tax]);
                            doc.drawText(225,183,[hab_employ_tax]);
                            doc.drawText(238,183,[hab_med_tax]);
                            doc.drawText(250,183,[hab_pension]);
                            doc.drawText(262,183,[hab_tax_total]);
                            doc.drawText(275,183,[hab_closing_money]);

                            /* 소계끝  합계시작 */
                            /* 1페이지는 소계와 합계가 같다*/
                            doc.drawText(165,193,[hab_total_kongsu]);
                            doc.drawText(173,193,[hab_danga]);
                            doc.drawText(187,193,[hab_total_income]);
                            doc.drawText(203,193,[hab_gab_tax]);
                            doc.drawText(215,193,[hab_jumin_tax]);
                            doc.drawText(225,193,[hab_employ_tax]);
                            doc.drawText(238,193,[hab_med_tax]);
                            doc.drawText(250,193,[hab_pension]);
                            doc.drawText(262,193,[hab_tax_total]);
                            doc.drawText(275,193,[hab_closing_money]);



                        }else if(i > 15){ //1페이지 아닐 경우


                                var last_p = pages*15-1;
                                console.log(last_p);
                            if(i == last_p){ //중간페이지 :: 페이지가 증가할 때, i== 30, 45, ...  pages*15 - 1 = i
                                /* 중간 페이지 */


                                var arr_s = i-14;  //배열 자를 시작점
                                var arr_e = pages*15;

                                var hab_total_kongsu = lib.hab_sum(lib.arr_cut(sum_total_kongsu, arr_s, arr_e)).toString();
                                var hab_danga = lib.hab_sum(lib.arr_cut(sum_danga, arr_s, arr_e)).toLocaleString();
                                var hab_total_income = lib.hab_sum(lib.arr_cut(sum_total_income, arr_s, arr_e)).toLocaleString();
                                var hab_gab_tax = lib.hab_sum(lib.arr_cut(sum_gab_tax, arr_s, arr_e)).toLocaleString();
                                var hab_jumin_tax = lib.hab_sum(lib.arr_cut(sum_jumin_tax, arr_s, arr_e)).toLocaleString();
                                var hab_employ_tax = lib.hab_sum(lib.arr_cut(sum_employ_tax, arr_s, arr_e)).toLocaleString();
                                var hab_med_tax = lib.hab_sum(lib.arr_cut(sum_med_tax, arr_s, arr_e)).toLocaleString();
                                var hab_pension = lib.hab_sum(lib.arr_cut(sum_pension, arr_s, arr_e)).toLocaleString();
                                var hab_tax_total = lib.hab_sum(lib.arr_cut(sum_tax_total, arr_s, arr_e)).toLocaleString();
                                var hab_closing_money = lib.hab_sum(lib.arr_cut(sum_closing_money, arr_s, arr_e)).toLocaleString();
                                console.log(pages+' 페이지일 때'+hab_total_kongsu);
                                //console.log(pages+' 페이지일 때'+lib.hab_sum(hab_danga));

                                doc.drawText(167,183,[hab_total_kongsu]);
                                doc.drawText(173,183,[hab_danga]);
                                doc.drawText(187,183,[hab_total_income]);
                                doc.drawText(203,183,[hab_gab_tax]);
                                doc.drawText(215,183,[hab_jumin_tax]);
                                doc.drawText(225,183,[hab_employ_tax]);
                                doc.drawText(238,183,[hab_med_tax]);
                                doc.drawText(250,183,[hab_pension]);
                                doc.drawText(262,183,[hab_tax_total]);
                                doc.drawText(275,183,[hab_closing_money]);
                                /* 소계끝  합계시작 */
                                /* final 합계 f*/
                                var f_hab_total_kongsu = lib.hab_sum(sum_total_kongsu).toString();
                                var f_hab_danga = lib.hab_sum(sum_danga).toLocaleString();
                                var f_hab_total_income = lib.hab_sum(sum_total_income).toLocaleString();
                                var f_hab_gab_tax = lib.hab_sum(sum_gab_tax).toLocaleString();
                                var f_hab_jumin_tax = lib.hab_sum(sum_jumin_tax).toLocaleString();
                                var f_hab_employ_tax = lib.hab_sum(sum_employ_tax).toLocaleString();
                                var f_hab_med_tax = lib.hab_sum(sum_med_tax).toLocaleString();
                                var f_hab_pension = lib.hab_sum(sum_pension).toLocaleString();
                                var f_hab_tax_total = lib.hab_sum(sum_tax_total).toLocaleString();
                                var f_hab_closing_money = lib.hab_sum(sum_closing_money).toLocaleString();
                                doc.drawText(167,193,[f_hab_total_kongsu]);
                                doc.drawText(173,193,[f_hab_danga]);
                                doc.drawText(187,193,[f_hab_total_income]);
                                doc.drawText(203,193,[f_hab_gab_tax]);
                                doc.drawText(215,193,[f_hab_jumin_tax]);
                                doc.drawText(225,193,[f_hab_employ_tax]);
                                doc.drawText(238,193,[f_hab_med_tax]);
                                doc.drawText(250,193,[f_hab_pension]);
                                doc.drawText(262,193,[f_hab_tax_total]);
                                doc.drawText(275,193,[f_hab_closing_money]);


                            }else if(total_row-1 == i){ // 마지막 페이지 인경우
                                pages +=1;
                                var arr_e = pages*15;
                                var arr_s = arr_e-15;


                                var hab_total_kongsu = lib.hab_sum(lib.arr_cut(sum_total_kongsu, arr_s, arr_e)).toString();
                                var hab_danga = lib.hab_sum(lib.arr_cut(sum_danga, arr_s, arr_e)).toLocaleString();
                                var hab_total_income = lib.hab_sum(lib.arr_cut(sum_total_income, arr_s, arr_e)).toLocaleString();
                                var hab_gab_tax = lib.hab_sum(lib.arr_cut(sum_gab_tax, arr_s, arr_e)).toLocaleString();
                                var hab_jumin_tax = lib.hab_sum(lib.arr_cut(sum_jumin_tax, arr_s, arr_e)).toLocaleString();
                                var hab_employ_tax = lib.hab_sum(lib.arr_cut(sum_employ_tax, arr_s, arr_e)).toLocaleString();
                                var hab_med_tax = lib.hab_sum(lib.arr_cut(sum_med_tax, arr_s, arr_e)).toLocaleString();
                                var hab_pension = lib.hab_sum(lib.arr_cut(sum_pension, arr_s, arr_e)).toLocaleString();
                                var hab_tax_total = lib.hab_sum(lib.arr_cut(sum_tax_total, arr_s, arr_e)).toLocaleString();
                                var hab_closing_money = lib.hab_sum(lib.arr_cut(sum_closing_money, arr_s, arr_e)).toLocaleString();


                                doc.drawText(167,183,[hab_total_kongsu]);
                                doc.drawText(173,183,[hab_danga]);
                                doc.drawText(187,183,[hab_total_income]);
                                doc.drawText(203,183,[hab_gab_tax]);
                                doc.drawText(215,183,[hab_jumin_tax]);
                                doc.drawText(225,183,[hab_employ_tax]);
                                doc.drawText(238,183,[hab_med_tax]);
                                doc.drawText(250,183,[hab_pension]);
                                doc.drawText(262,183,[hab_tax_total]);
                                doc.drawText(275,183,[hab_closing_money]);
                                /* 소계끝  합계시작 */
                                /* final 합계 f*/
                                var f_hab_total_kongsu = lib.hab_sum(sum_total_kongsu).toString();
                                var f_hab_danga = lib.hab_sum(sum_danga).toLocaleString();
                                var f_hab_total_income = lib.hab_sum(sum_total_income).toLocaleString();
                                var f_hab_gab_tax = lib.hab_sum(sum_gab_tax).toLocaleString();
                                var f_hab_jumin_tax = lib.hab_sum(sum_jumin_tax).toLocaleString();
                                var f_hab_employ_tax = lib.hab_sum(sum_employ_tax).toLocaleString();
                                var f_hab_med_tax = lib.hab_sum(sum_med_tax).toLocaleString();
                                var f_hab_pension = lib.hab_sum(sum_pension).toLocaleString();
                                var f_hab_tax_total = lib.hab_sum(sum_tax_total).toLocaleString();
                                var f_hab_closing_money = lib.hab_sum(sum_closing_money).toLocaleString();
                                doc.drawText(167,193,[f_hab_total_kongsu]);
                                doc.drawText(173,193,[f_hab_danga]);
                                doc.drawText(187,193,[f_hab_total_income]);
                                doc.drawText(203,193,[f_hab_gab_tax]);
                                doc.drawText(215,193,[f_hab_jumin_tax]);
                                doc.drawText(225,193,[f_hab_employ_tax]);
                                doc.drawText(238,193,[f_hab_med_tax]);
                                doc.drawText(250,193,[f_hab_pension]);
                                doc.drawText(262,193,[f_hab_tax_total]);
                                doc.drawText(275,193,[f_hab_closing_money]);


                            }

                        }
                    }

                } // //개별 정보를 찍는 for 문 END !!!!




                doc.save('dailyMeber_payList.pdf');
                p._hidePage();

            });
            img.src = '../../docs/dailyMemberMedical.png';





        },
        work_pdf : function(){

            //TODO  전체명수를 7로 나눠서, 몇번 실행할지를 구한다음.
            //TODO 7명만 1,2,3 page 찍고 다음 8번재 사람부터 1,2,3 페이지찍고 다음 종료한 사람으로부터 7명
            var exist = $('#kongsu_table_body').length;
            if(exist < 1 ){
                alert('조회를 먼저해주세요');
                return false
            }
            var p = window.parent.parent;

            alert('근로 내역서');
            p._showPage();

            var img = new Image();
            var img2 = new Image();
            var img3 = new Image();

            img.src = '../../docs/job-1.png';
            img2.src = '../../docs/job-2.png';
            img3.src = '../../docs/job-3.png';

            img3.addEventListener('load', function() {

                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');



                var total_row = $('#kongsu_table_body tr').length;  //table의 총 row 수
                var balju_company = $('#balju_company').text().toString();
                var bogoja = $('#bogoja').text();
                var hyun_jang_name = $('#hyun_jang_name').text();
                var date_val = $('#toMonth').val();
                var date = date_val.split("-");
                var company_name = $('#company_name').text();
                var company_address = $('#company_address').text();
                var company_phone = $('#company_phone').text();
                var president = $('#president').text();
                var Today = new Date();
                var currentYear = Today.getFullYear();  //년도를 구함
                var currentMonth = Today.getMonth() + 1; //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
                var currentDate = Today.getDate();  //오늘 일자.
                var h = 0;


                for(var i=0; i<total_row; i++)
                {
                    /*8칸이니까 8칸 씩 높이값 초기화, 8칸 다채워지면 addPage한다. */
                    if(i % 8 == 0){ h = 0;}
                    if(i % 8 == 1){ h = 1;}
                    if(i % 8 == 2){ h = 2;}
                    if(i % 8 == 3){ h = 3;}
                    if(i % 8 == 4){ h = 4;}
                    if(i % 8 == 5){ h = 5;}
                    if(i % 8 == 6){ h = 6;}
                    if(i % 8 == 7){ h = 7;}

                    if(i>0){
                        if(i % 8 == 0)
                        {  //i= 0,1,2,3,4,5,6,7,
                            // 0 % 7 = 7
                            doc.addPage();
                            doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,

                        }
                    }






                    var tr = $('#kongsu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text();
                    var name = tr.children().eq(2).text();
                    var job = tr.children().eq(3).text();
                    var jumin_val = tr.children().eq(4).find('div').eq(0).text().split("-");
                    var jumin1 = jumin_val[0];
                    var jumin2 = jumin_val[1];
                    var address = tr.children().eq(4).find('div').eq(1).text();
                    var total_income = tr.children().eq(8).text(); //노무비 총액
                    var kongsu = tr.children().eq(5).find('div');



                    // k=0 첫페이지일 때 i=0,1,2,3,4,5,6

                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);
                    doc.setFontSize(9);
                    doc.drawText(145,20.5,[date[0]]);
                    doc.drawText(165,20.5,[date[1]]);
                    doc.drawText(100,43.5,[company_name]);
                    doc.drawText(200,43.5,[hyun_jang_name]);
                    doc.drawText(100,52.5,[company_address]);
                    doc.setFontSize(8);
                    doc.drawText(257,55,[company_phone]);
                    doc.setFontSize(6);



                    /* document에 출력 */
                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);
                    doc.setFontSize(7);
                    doc.drawText(18,(83+(11*h))-(1.4*h),[name]);
                    doc.drawText(69,(83+(11*h))-(1.4*h),[address]);
                    doc.drawText(125,(83+(11*h))-(1.4*h),[job]);
                    doc.drawText(95,166,[company_name]);


                    /*숫자를 찍는 Font*/
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.setCharSpace(0);
                    doc.drawText(34,(84+(11*h))-(1.4*h),[jumin1]);
                    doc.drawText(48,(84+(11*h))-(1.4*h),[jumin2]);
                    //doc.drawText(110,(83+(11*i))-(1.4*i),[phone]);


                    doc.setCharSpace(-1);
                    doc.setFontSize(9);
                    /*근로일수, 일 평균 근로시간*/
                    var total_kongsu = [];
                    var average_kongsu = [];

                    for(var k=0; k<31; k++){
                        var daily_kongsu = kongsu.eq(k).text();

                        if(kongsu.eq(k).text()>0){
                            total_kongsu.push(kongsu.eq(k).text());
                            //average_kongsu.push(kongsu.eq(k).text());
                            daily_kongsu = "O";
                        }else{
                            daily_kongsu = " ";
                        }

                        if(k<15){
                            doc.drawText(
                                138+(k*3)+(k*1.8)   //x position
                                ,(81.5+(11*h))-(1.4*h)  //y position
                                //,[kongsu.eq(k).text()]
                                ,[daily_kongsu]
                            );
                        }else{
                            doc.drawText(
                                138+((k-15)*3)+((k-15)*1.8) //x position
                                ,(86.5+(11*h))-(1.4*h)  //y position
                                ,[daily_kongsu]
                            );
                        }
                    }/* text 값 잘못 찍으면 오류난다.*/

                    var work_day2 = '';
                    var work_day = total_kongsu.length;
                    work_day2 += work_day;

                    doc.setCharSpace(0);
                    doc.setFontSize(10);
                    doc.drawText(215,(84.5+(11*h))-(1.4*h),[work_day2]);
                    doc.drawText(230,(84.5+(11*h))-(1.4*h),["8"]);
                    doc.drawText(245,(84.5+(11*h))-(1.4*h),[total_income]);

                    var year = '';
                    var month = '';
                    var day = '';

                    year += currentYear;
                    month += currentMonth;
                    day += currentDate;

                    doc.drawText(127, 166, [year]);
                    doc.drawText(143, 166, [month]);
                    doc.drawText(155, 166, [day]);

                }
                 //doc.addPage();
                 //doc.addImage(img2, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                 //doc.addPage();
                 //doc.addImage(img3, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                 doc.save('job-1.pdf');
                p._hidePage();
            });










        },
        payment_pdf : function(){
            var p = window.parent.parent;
            alert('급여 지급');
            p._showPage();
            var img = new Image();
            img.addEventListener('load', function() {
                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                //doc.setPage(2);
                //doc.addPage(500, 270);  //w,h

                //doc.internal.getNumberOfPages(2);
                doc.addImage(img, 'png', 1, 1, 298, 210);  //  x,y,w,h,

                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');
                doc.addFont('gothic.ttf', 'LiLing', 'normal', 'Identity-H');
                doc.addFont('HARLOWSI.TTF', 'WMLWQI+HarlowSolid', 'normal', 'WinAnsiEncoding');
                doc.addFont('ITCBLKAD.TTF','a','normal','WinAnsiEncoding');
                doc.addFont('BOD_PSTC.TTF','b','normal','WinAnsiEncoding');
                doc.addFont('GADUGI.TTF', 'GADUGI', 'normal', 'WinAnsiEncoding');





                //doc.setDefaultFonts(0, 'Times');    //English default
                doc.setDefaultFonts(1, 'MsGothic');    //Korean default
                //doc.setDefaultFonts(3, 'LiLing');         //Chinese default
                //doc.setDefaultFonts(2, 'MsGothic');        //Japanese default

                //var name = $('#kongsu_table_body').children().children().eq(2).text();
                //var job = $('#kongsu_table_body').children().children().eq(3).text();

                var total_row = $('#nomu_table_body tr').length;  //table의 총 row 수

                for(var i=0; i<total_row; i++){

                    var tr = $('#nomu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text();
                    var name = tr.children().eq(2).text();
                    var job = tr.children().eq(3).text();
                    var jumin = tr.children().eq(4).text();
                    var kongsu = tr.children().eq(8).text();
                    var danga = tr.children().eq(9).text();
                    var total_income = tr.children().eq(10).text(); //노무비 총액
                    var gab_tax = tr.children().eq(11).text(); //갑근세
                    var jumin_tax = tr.children().eq(12).text(); //주민세
                    var employ_tax = tr.children().eq(13).text(); //고용보험
                    var med_tax = tr.children().eq(14).text(); //의료보험
                    var pension = tr.children().eq(15).text(); //국민연금
                    var tax_total = tr.children().eq(16).text(); // 공제합계
                    var closing_money = tr.children().eq(17).text();  //차감된 지급액
                    var bank = tr.children().eq(5).children().val(); //은행
                    var bank_owner = tr.children().eq(6).children().val(); //은행주
                    var account = tr.children().eq(7).children().val(); //계좌번호

                    var cal_tax = parseInt(jumin_tax)+parseInt(gab_tax);
                    //alert(cal_tax);
                    //alert(bank);
                    //alert(total_income);

                    doc.setFont('HeadlineR');        // set font

                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);


                    doc.setFontSize(6);
                    //doc.drawText(12,(36+(11*i))-(1.4*i),[index]);
                    doc.drawText(17,(36+(11*i))-(1.4*i),[job]);

                    doc.setFontSize(7);
                    doc.drawText(24,(36+(11*i))-(1.4*i),[name]);


                    doc.setCharSpace(0);
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.drawText(36,(35+(11*i))-(1.4*i),[jumin]);
                    doc.setFontSize(9);
                    doc.drawText(67,(35+(11*i))-(1.4*i),[kongsu]);
                    doc.drawText(78,(35+(11*i))-(1.4*i),[danga]);
                    doc.setFontSize(9);
                    doc.drawText(93,(35+(11*i))-(1.4*i),[total_income]);
                    doc.drawText(112,(35+(11*i))-(1.4*i),[gab_tax]);
                    doc.drawText(128,(35+(11*i))-(1.4*i),[jumin_tax]);
                    doc.drawText(144,(35+(11*i))-(1.4*i),[employ_tax]);
                    //doc.drawText(160,(35+(11*i))-(1.4*i),[med_tax]);
                    //doc.drawText(176,(35+(11*i))-(1.4*i),[pension]);



                    doc.setFont('HeadlineR');        //
                    doc.setFontSize(7);

                    doc.drawText(192,(35+(11*i))-(1.4*i),[bank]);
                    doc.drawText(209,(35+(11*i))-(1.4*i),[bank_owner]);
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.drawText(230,(35+(11*i))-(1.4*i),[account]);


                }
                doc.save('dailyMeber_payList.pdf');
                p._hidePage();

            });
            img.src = '../../docs/dailyMember_payList.png';





        },






    };

}();



