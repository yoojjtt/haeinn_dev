// JavaScript Document

var tax = function ()
{

    var test = "test_var";

    return {

        tax_load : function(){
            $('#tax_update').hide();
            $('#tax_return').hide();
            $('#tax_new').show();
            var gubun = "R";
            var iData = ['company_no'];
            iData[0] = company_no;
            //alert(company_no);
            var result = _DB_query.httpService("tax_info",gubun, iData);
            var res = result[0].data[0][0];

            //var res_num = result[0].data[0].length

            //res.c_old // 노인 장기요양
            //res.endDay // 적용 마지막날
            //res.p_old // 개인 노인
            // res.startDay // 적용 시작일
            //TODO 추가하기 나중에


            $('#tax_table').empty();
            var str = '';
                str += "<tr>";
                str += "<td style='text-align:center'>"+"갑근세"+"</td>"
                str += "<td style='text-align:center'>"+res.income+"%"+"</td>";
                str += "<td style='text-align:center'>"+"-"+"</td>";
                str += "<td style='text-align:center'>"+"면세액 기준:"+res.exception+"원"+"<br>"+"일당 중 10만원 초과금액에 대하여 2.7%"+"</td>";
                str += "</tr>";

                str += "<tr>";
                str += "<td style='text-align:center'>"+"주민세"+"</td>"
                str += "<td style='text-align:center'>"+res.jumin+"%"+"</td>";
                str += "<td style='text-align:center'>"+"-"+"</td>";
                str += "<td style='text-align:center'>"+"갑근세의 10%"+"<br>"+"2.7% * 10% = 0.27%"+"</td>";
                str += "</tr>";

                str += "<tr>";
                str += "<td style='text-align:center'>"+"건강보험"+"</td>"
                str += "<td style='text-align:center'>"+res.p_med+"%"+"</td>";
                str += "<td style='text-align:center'>"+res.c_med+"%"+"</td>";
                str += "<td style='text-align:center'>"+"- "+"</td>";
                str += "</tr>";

                str += "<tr>";
                str += "<td style='text-align:center'>"+"국민연금"+"</td>"
                str += "<td style='text-align:center'>"+res.p_pension+"%"+"</td>";
                str += "<td style='text-align:center'>"+res.c_pension+"%"+"</td>";
                str += "<td style='text-align:center'>"+"총 9% (2014년 변동없음) "+"</td>";
                str += "</tr>";

                str += "<tr>";
                str += "<td style='text-align:center'>"+"고용보험"+"</td>"
                str += "<td style='text-align:center'>"+res.p_employee+"%"+"</td>";
                str += "<td style='text-align:center'>"+res.c_employee+"%"+"</td>";
                str += "<td style='text-align:center'>"+"고용보험 = 실업급여 + 추가요율 "+"<br>"
                    +"실업급여: 1.3% (근로자,사업주 0.65%씩 부담"+"<br>"
                    +"추가 요율(α) : 고용안정 및 직업능력개발사업비"+"<br>"
                        +" 0.25% :상시근로자 150명 미만"+"<br>"
                        +" 0.45% :상시근로자 150명 이상(우선지원대상)"+"<br>"
                        +" 0.65% :상시근로자 150~1000명 미만"+"<br>"
                        +" 0.85% :상시근로자 1000명 이상"+"<br>"
                    +"</td>";
                str += "</tr>";



            $('#tax_table').append(str);



        },
        tax_new : function(hyunjang_no){
            $('#tax_new').hide();
            $('#tax_update').show();
            $('#tax_return').show();

            $('#tax_table').empty();
            var str = '';
            str += "<tr>";
            str += "<td style='text-align:center'>"+"갑근세"+"</td>"
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"<input type='text'>"+"</td>";
            str += "<td style='text-align:center'>"+"면세액 기준:"+"<input type='text'>"+"원"+"<br>"+"일당 중 10만원 초과금액에 대하여 2.7%"+"</td>";
            str += "</tr>";

            str += "<tr>";
            str += "<td style='text-align:center'>"+"주민세"+"</td>"
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"<input type='text'>"+"</td>";
            str += "<td style='text-align:center'>"+"갑근세의 10%"+"<br>"+"2.7% * 10% = 0.27%"+"</td>";
            str += "</tr>";

            str += "<tr>";
            str += "<td style='text-align:center'>"+"건강보험"+"</td>"
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"- "+"</td>";
            str += "</tr>";

            str += "<tr>";
            str += "<td style='text-align:center'>"+"국민연금"+"</td>"
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"총 9% (2014년 변동없음) "+"</td>";
            str += "</tr>";

            str += "<tr>";
            str += "<td style='text-align:center'>"+"고용보험"+"</td>"
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"<input type='text'>"+"%"+"</td>";
            str += "<td style='text-align:center'>"+"고용보험 = 실업급여 + 추가요율 "+"<br>"
                +"실업급여: 1.3% (근로자,사업주 0.65%씩 부담"+"<br>"
                +"추가 요율(α) : 고용안정 및 직업능력개발사업비"+"<br>"
                +" 0.25% :상시근로자 150명 미만"+"<br>"
                +" 0.45% :상시근로자 150명 이상(우선지원대상)"+"<br>"
                +" 0.65% :상시근로자 150~1000명 미만"+"<br>"
                +" 0.85% :상시근로자 1000명 이상"+"<br>"
                +"</td>";
            str += "</tr>";



            $('#tax_table').append(str);



        },
        tax_update : function(){
            alert('update');
        },



    };

}();



