// JavaScript Document

var service_auth = function ()
{

    var test = "test_var";

    return {

        load : function(email){
            var gubun = "R";
            var iData = ['super_user'];

            iData[0] = email;

            var result = _DB_query.httpService("service_info",gubun, iData);
            var msg = result[0].data[1][0].msg;
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;
            //lert(msg);

            for (var i = 0; i < res_num; i++)
            {
                var str = '';
                var j = i+1;

                str += "<tr>";
                var c_name = res[i].company_name;
                if(c_name == ''){
                    var c_name = '미 등록';

                }
                str += "<td>" + c_name + "</td>";
                str += "<td>" + res[i].name + "</td>";
                str += "<td>" + res[i].president_email + "</td>";

                var startDay = new Date(res[i].startDay*1000);
                var s_year = startDay.getFullYear();
                var s_month = startDay.getMonth()+1;
                var s_date = startDay.getDate();


                var endDay = new Date(res[i].endDay*1000);
                var e_year = endDay.getFullYear();
                var e_month = endDay.getMonth()+1;
                var e_date = endDay.getDate();

                var d = new Date();
                var toDay = d.getTime();
                var gap_day = (endDay - toDay)/(24*60*60*1000);
                var gap = Math.floor(gap_day)+1;
                //var gap_date = gap.getDate();
                var target = res[i].president_email;

                str += "<td style='text-align:center'>" + s_year+"년 " +s_month+"월 "+ s_date +"일 "
                    +"~"+ e_year+"년 " +e_month+"월 "+ e_date +"일 "
                    +"<span style='color:red;'>" +"("+"잔여일 수:  "+gap+" 일"+")"+"</span>"
                    +  "</td>";

                str += "<td>"

                    +"<div class='form-inline'>"
                            +"<span style='margin-right:5px;'>"
                            +"<input class='span4' type='number'/>"
                            +"</span>"

                            +"<button class='btn btn-success' name='extension' style='margin-right:5px;' >연장</button>"
                            +"<button class='btn btn-danger' name='ban' >정지</button>"
                    +"</div>"
                    + "</td>";


                str += "</tr>";
                $("#service_table").append(str);
            }






        },
        update : function(super_user, email, date, ban){
            var gubun = "S";
            var iData = ['super_user','user_email', 'expiration_date', 'ban'];

            iData[0] = super_user;
            iData[1] = email;
            iData[2] = date;
            iData[3] = ban;

            var result = _DB_query.httpService("service_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var res = result[0].data[0][0];
            var last_time = result[0].data[0][0].last_time;
            var return_code = result[0].data[0][0].return_code;
            alert(msg);
            location.reload();

        }


    };

}();



