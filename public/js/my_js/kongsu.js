// JavaScript Document

var kongsu = function ()
{

    var test = "test_var";

    return {

        kongsu_load : function(month, daily){
            $('#kongsu_table_body').empty();
            var gubun = "R";
            var iData = ['hyunjang_no','daily_employee_num','month','daily','infoType'];
            /* 임시 데이터 베이스*/


            iData[0] = $('#hyunjang_select').val();
            iData[1] = '';
            iData[2] = month;  // 날짜  2017-08  (월까지만 자른다.)
            iData[3] = daily;
            iData[4] = 'daily';  //'daily'


            var result = _DB_query.httpService("kongsu_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            if(res  == false) {

                //alert(month + ' 입력값');
                var empty = '';
                empty += "<div style='text-align:center; padding-top:100px;'>"+month+" 등록된 리스트가 없습니다"+"</div>"
                $('#kongsu_table_body').append(empty);
            }


            for (var i = 0; i < res_num; i++)
            {
                var str = '';
                var kongsu = res[i].kongsu;
                str += "<tr>"
                str += "<td>" + "<input onClick='kongsu.kongsu_check(this)' name='checkBox2' type='checkbox'>"+"</td>";
                str += "<td style='display:none;'>" + res[i].daily_employee_num + "</td>";
                str += "<td>" + res[i].name + "</td>";
                str += "<td>" + res[i].jumin1 +"-"+ res[i].jumin2 + "</td>";
                str += "<td>" + res[i].job+ "</td>";
                if(res[i].kongsu == null){
                    kongsu = '미입력';
                    // TODO 결석 배열 만들어서 결석 토탈에 넣어준다.
                }
                str += "<td>" + kongsu + "</td>";
                str += "</tr>"
                $('#kongsu_table_body').append(str);
            }
           $('#total_num').text(res_num);
            $('#total_num_nomal').text(res_num);
            $('#total_num_absence').text(res_num);
            $('#total_num_etc').text(res_num);
        },
        kongsu_save : function(){
            var hyunjang_id = $('#hyunjang_select').val();
            var kongsu = $('#Kongsu_type').val();
            var daily = $('#dateSearch').val();
            var total_num = result_data_save.length;
            var idGroup = '';



            for(var i = 0 ; i < total_num; i++){
                var id = result_data_save[i];

                idGroup += id + "@";

            }
            //alert(idGroup);


            var gubun = "S";
            var iData = ['hyunjang_id','daily_employee_num','date','kongsu','total_num'];

            iData[0] = hyunjang_id;
            iData[1] = idGroup;
            iData[2] = daily;
            iData[3] = kongsu;
            iData[4] = total_num;


            var result = _DB_query.httpService("kongsu_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            var msg = result[0].data[0][0].msg;
            //var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;

            if(return_code == '100'){
                alert(msg);
                //location.reload();


            }


        },
        kongsu_check : function(me){
            var isChecked = $(me).is(":checked");
            var txt;


            if(isChecked == true) {  //checked 되있다면
                txt = $(me).parent().parent().children().eq(1).text().trim();

                //alert(txt);

                var find_id = result_data_save.indexOf(txt, 0);
                if(find_id != -1) {  // 있다면
                    alert(error);
                }else{
                    result_data_save.push(txt); // 배열에 추가
                }

            }else{  // checkd 해제 했다면 
                txt = $(me).parent().parent().children().eq(1).text().trim();
                //alert(txt);
                var find_id = result_data_save.indexOf(txt, 0);
                if(find_id != -1) {  // 있다면
                    result_data_save.splice(find_id, 1);  // 배열에서 제외
                }else{
                    alert(err);
                }

            }
            //alert(result_data_save);

        },
        check_all : function(n, obj){
            //chk 가 하나라도 풀려있으면 check all  ==>return 1
            //chk 가 다 checked 되있으면 check 풀기 ==>return 2

            var chk = document.getElementsByName(obj);
            var tot = chk.length;
            var sum = 0;

            //alert(sum +"//"+ result_data_save);
            for (var i = 0; i < tot; i++) { // check 몇개되있는지 여부 확인
                var checked = $(chk[i]).prop('checked');
                if(checked == true){
                    sum++;
                }
            }
            //alert(sum +"vs"+ tot);
            if(sum < tot){  // 전체선택 다 안된 상태에서 전체선택 누를 경우
                //alert(sum);
                for (var j = 0; j < tot; j++) {
                    chk[j].checked = true;

                    //(chk[j].checked) = true ? ture : false;

                    var txt = $(chk[j]).parent().parent().children().eq(1).text().trim();
                    var find_id = result_data_save.indexOf(txt, 0);
                    if(find_id != -1) {  // 있다면
                        //alert(result_data_save+"::"+txt);
                    }else{
                        result_data_save.push(txt); // 배열에 추가
                    }

                }

            }else if(sum = tot){  //전체선택 한번 더 누를 경우
                for (var j = 0; j < tot; j++) {
                    chk[j].checked = false;
                    //(chk[j].checked) = true ? ture : false;

                    var txt = $(chk[j]).parent().parent().children().eq(1).text().trim();
                    var find_id = result_data_save.indexOf(txt, 0);
                    if(find_id != -1) {  // 있다면
                        //alert(result_data_save+"::"+txt);
                        result_data_save.splice(find_id, 1);  // 배열에서 삭제
                    }else{
                        //result_data_save.push(txt);
                    }

                }
            }
            //alert(result_data_save);

        },

    };

}();



