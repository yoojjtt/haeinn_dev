// JavaScript Document

var daily_employee_register = function ()
{

    var test = "test_var";

    return {

        hyunjang_load : function(proc){   // 진행중인 공사만 불러온다. 1  //현장 select 박스
            //공사 중인 것 만 불러온다.
            var gubun = "R";
            var iData = ['proc'];
            iData[0] = proc;

            var result = _DB_query.httpService("hyunjang_info",gubun, iData);
            var res = result[0].data[0];

            var res_num = result[0].data[0].length;

            if(result){
                $('#loading').css('display','none');
             }
            $("#hyunjang_select").empty();
            for (var i = 0; i < res_num; i++)
            {
                var str = '';

                //var j = i+1;
                str += "<option value='"+res[i].id+"'>";
                str += res[i].hyun_jang_name

                str += "</option>";
                $("#hyunjang_select").append(str);
                //$("#bogoja").append(res[i].balju_company);
                //$("#baluju_company").append(res[i].bogoja);

            }

        },
        daily_employee_include : function(employee_id){  //일용직 근로자 클릭해서 왼쪽 table에 추가할 때
            //console.log(result_data_save)
            if(result_data_save[0] == null){// 데이터가 없음 상태일 때
                $('#monthly_danga').empty();
            }



            var gubun = "individual";
            var iData = ['employee_id'];
            iData[0] = employee_id;

            var result = _DB_query.httpService("daily_employee_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;


            if(result_data_save.indexOf("'"+res.id+"'") == -1){

                result_data_save.push("'"+res.id+"'");
                var str = '';
                str += "<tr>";
                str += "<td style='display:none;'>"+ res.id +"</td>";
                str += "<td>"+ "<input onClick='daily_employee_register.daily_employee_exclude()' name='checkBox' type='checkbox' checked>"+"</td>";
                str += "<td>"+ res.job +"</td>";
                str += "<td>"+ res.name +"</td>";
                str += "<td>"+ "<input type='text'>" +"</td>";


                sixty_check = lib.more_than_sixty(res.jumin1,res.jumin2);

                if(sixty_check  == false){
                    alert('60세 이상입니다.');
                    str += "<td>"+ "<input type='checkbox' name='pension' value='"+0+"'>" +"</td>";
                    str += "<td>"+ "<input type='checkbox' name='medical' value='"+0+"'>" +"</td>";


                }else{
                    //alert('60세 미만입니다.');
                    str += "<td>"+ "<input type='checkbox' name='pension' value='"+1+"'>" +"</td>";
                    str += "<td>"+ "<input type='checkbox' name='medical' value='"+1+"'>" +"</td>";


                }


                str += "</tr>";

                $('#monthly_danga').append(str);

            }else{
                alert('이미 등록됨');
            }
            $('input:checkbox[name="pension"]').each(function() {
                if(this.value == "1"){ //값 비교
                    this.checked = true; //checked 처리
                }
            });
            $('input:checkbox[name="medical"]').each(function() {
                if(this.value == "1"){ //값 비교
                    this.checked = true; //checked 처리
                }
            });
            /*
              var res_num = result_data.length;
              for(var i = 0; i < res_num; i++){
                  alert(result_data[i]);
              }

            */

        },
        daily_employee_exclude : function(){   // monthly_danga list 에서   checked 풀면 리스트에서 삭제: result Array에서 뺴기, delete Array 에추가
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();

            //$('#monthly_danga input[type=
            var checkbox = document.getElementsByName("checkBox");
            var checkboxNum = checkbox.length;  //checkBox name 의 개수를 반환
            //alert(checkboxNum);
            for(var c = 0; c < checkboxNum; c++){
              var uncheck= checkbox[c].checked;  // checked여부를 boolean으로 반환
              if(uncheck == false){
                  var tr = $(checkbox[c]).parent().parent();
                  tr.remove();
                  var employee_id = tr.children().eq(0).text();
                  break // checked false 반환하자마자 remove를 하기 때문에 employee_id 값을 여러개 반환 오류남  break로 해결
              }
            }

            var find_id = result_data_save.indexOf("'"+employee_id+"'", 0);
            if(find_id != -1){  // 있다면

                //alert(result_data_save);
                result_data_save.splice(find_id, 1);

                var find_delete_id = result_data_delete.indexOf("'"+employee_id+"'", 0);
                if(find_delete_id != -1){  // delete Array 에 있다면
                    alert("Find delete id");
                }else{// 없다면 추가
                    result_data_delete.push(employee_id);   // delete data는 id0@id1@id2@id3 형식으로 넘겨서 '' 없이 넣는다.
                    alert(result_data_delete);
                }
            }else{
                alert("NotFind");

            }

        },
        monthly_danga_load : function(){   //  현장 선택하고 월 선택하면 해당 월의 현장에 등록된 일용직 조회
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();
            var gubun = "R";
            var iData = ['hyunjang_id','month'];
            iData[0] = hyunjang_id;
            iData[1] = month;


            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;

            result_data_save = [];  //monthly_danga 에 추가할 데이터
            result_data_delete = [];  // monthly_daga 에서 삭제할 데이터

            if(res  == false){

                //alert(month+' 입력값이 없습니다.');
                $('#monthly_danga').empty();
                $('#beforeList').css('display','inline');
                var empty = '';
                empty += "<div style='text-align:center; padding-top:100px;'>"+month+" 등록된 리스트가 없습니다"+"</div>"
                $('#monthly_danga').append(empty);

            }else{
                $('#beforeList').css('display','none');
                $('#monthly_danga').empty();
                for (var i = 0; i < res_num; i++)
                {
                    result_data_save.push("'"+res[i].id+"'");



                    var str = '';
                    str += "<tr>";
                    str += "<td style='display:none;'>"+ res[i].id +"</td>";
                    str += "<td>"+ "<input onClick='daily_employee_register.daily_employee_exclude()' name='checkBox' type='checkbox' checked>"+"</td>";
                    str += "<td>"+ res[i].job +"</td>";
                    str += "<td>"+ res[i].name +"</td>";
                    str += "<td>"+ "<input type='text' value='"+res[i].daily_salary+"'>" +"</td>";  //TODO .toLocaleString 하면 저장할 때 , 앞에 까지 읽는다.
                    str += "<td>"+ "<input type='checkbox' name='pension'  value='"+res[i].pension+"'>" +"</td>";
                    str += "<td>"+ "<input type='checkbox' name='medical' value='"+res[i].medical+"'>" +"</td>";
                    str += "</tr>";
                    $('#monthly_danga').append(str);
                    //alert(res[i].daily_salary + "//"+res[i].pension+"//"+res[i].medical);

                    if(res[i].pension == '1'){
                        $('input:checkbox[name="pension"]').each(function() {
                            if(this.value == "1"){ //값 비교
                                this.checked = true; //checked 처리
                            }
                        });
                    }
                    if(res[i].medical =='1'){
                        $('input:checkbox[name="medical"]').each(function() {
                            if(this.value == "1"){ //값 비교
                                this.checked = true; //checked 처리
                            }
                        });
                    }



                }
            }

            //alert(result_data_save);


        },
        monthly_danga_load_before : function(){   //  전달 명단 불러오는 버튼
            //alert('전달명단');
             var month = lib.dateValue_add_month(-1);

             var hyunjang_id = $('#hyunjang_select').val();
             var gubun = "R";
            var iData = ['hyunjang_id','month'];
            iData[0] = hyunjang_id;
            iData[1] = month;


            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;

            result_data_save = [];  //monthly_danga 에 추가할 데이터
            result_data_delete = [];  // monthly_daga 에서 삭제할 데이터

            if(res  == false){

                alert(month+'전달 값이 없습니다. 등록하세요.');
                $('#monthly_danga').empty()
                $('#beforeList').css('display','inline');

            }else{
                $('#beforeList').css('display','none');
                $('#monthly_danga').empty();
                for (var i = 0; i < res_num; i++)
                {
                    result_data_save.push("'"+res[i].id+"'");  //명단 id 배열에 넣음
                    var str = '';
                    str += "<tr>";
                    str += "<td style='display:none;'>"+ res[i].id +"</td>";
                    str += "<td>"+ "<input onClick='daily_employee_register.daily_employee_exclude()' name='checkBox' type='checkbox' checked>"+"</td>";
                    str += "<td>"+ res[i].job +"</td>";
                    str += "<td>"+ res[i].name +"</td>";
                    str += "<td>"+ "<input type='text' value='"+res[i].daily_salary+"'>" +"</td>";  //TODO .toLocaleString 하면 저장할 때 , 앞에 까지 읽는다.
                    str += "<td>"+ "<input type='checkbox' name='medical' value='"+res[i].pension+"'>" +"</td>";
                    str += "<td>"+ "<input type='checkbox' name='medical' value='"+res[i].medical+"'>" +"</td>";
                    str += "</tr>";
                    $('#monthly_danga').append(str);
                }
            }

            //alert(result_data_save);


        },
        monthly_danga_save : function(){   // 저장 버튼: INSERT/UPDATE
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();

            if (!month){
                alert('등록할 날짜를 선택하세요');
                $('#toMonth').focus();
                return false
            }
            if(!hyunjang_id){
                alert('현장을 선택하세요');
                $('#hyunjang_select').focus();
                return false
            }





            //alert($('#monthly_danga tr').size());
            var total_num = $('#monthly_danga tr').size();
            var value_array = '';
            for (var i = 0; i < total_num; i++) {

                var chk = $('#monthly_danga tr').eq(i).children().eq(1).find('input[type="checkbox"]').is(':checked');
                var id = $('#monthly_danga tr').eq(i).children().eq(0).text();
                var pension_c = $('#monthly_danga tr').eq(i).children().eq(5).find('input[type="checkbox"]').is(':checked');
                var medical_c = $('#monthly_danga tr').eq(i).children().eq(6).find('input[type="checkbox"]').is(':checked');
                if (chk == true) {

                    var danga = $('table tr').eq(i+1).find('input[type="text"]').val();
                    var pension_val = 0;
                    var medical_val = 0;
                   // alert(pension_c);
                    if(pension_c == true){
                        pension_val = 1;
                    }else{
                        pension_val = 0;
                    }
                    if(medical_c == true){
                        medical_val = 1;
                    }else{
                        medical_val = 0;
                    }

                    //alert(id+"님의 단가: "+danga);
                    //TODO danga에는 i+1 을 해야 오류가 나지않는 이유는??
                    value_array += id +"@"+danga + "@" +pension_val + "@" +medical_val + "@" +"//";
                }
            }
            //alert(value_array);




                 var gubun = "S";
                var iData = ['hyunjang_id','value','month','total_num'];
                iData[0] = hyunjang_id;
                iData[1] = value_array;
                iData[2] = month;
                iData[3] = total_num;


                var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
                var msg = result[0].data[0][0].msg;
                console.log(result);

                //alert(result);
                var res = result[0].data[0][0];
                var return_code = result[0].data[0][0].return_code;
                if(return_code == '100'){
                    alert(msg);
                    location.reload();

                }



        },
        monthly_danga_delete : function(){   // 저장 버튼   DELETE
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();

            //alert(result_data_delete);
            var total_num = result_data_delete.length;
            var idGroup = '';
            for (var i = 0; i < total_num; i++) {

                var id = result_data_delete[i];
                //alert(id);
                    idGroup += id + "@";
                //alert(idGroup);


            }
            //alert(hyunjang_id+"//"+month+"//"+idGroup+"//"+total_num);

            var gubun = "D";
            var iData = ['hyunjang_id','month','employee_id'];
            iData[0] = hyunjang_id;
            iData[1] = month;
            iData[2] = idGroup;
            iData[3] = total_num;


            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            //var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;
            //alert(return_code);

            // if(return_code == '100'){
            //     //alert(msg);
            //     location.reload();
            //
            //
            //   }


        },




    };

}();



