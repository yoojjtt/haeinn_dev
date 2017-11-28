// JavaScript Document

var account_closing = function ()
{
    var account_inData;
    var account_outData;
    var account_tuitionData;
    var account_closing_data;
    var account_closingInfo; //입력기간 / 전기이월금..

    var targetDay; //오늘

    return {
        _init : function () {

            //console.log("account_closing_init");

            // 버튼 기능 정의
            $('#btn_income').click(this.btn_income_handler);
            $('#btn_expenditure').click(this.btn_expenditure_handler);

            //오늘확인
            var send_day = _common_util.caldate(0, '-');
            targetDay = send_day;

            //this.read();
            //this.read_closingInfo('daily_closing', 0);

        },
        // 버튼 기능
        btn_income_handler : function () {

            parent.parent.modalOpen('account_stats', '항목별통계', 1000, 450, 1);

        },
        btn_expenditure_handler : function () {

            parent.parent.modalOpen('account_stats', '항목별통계', 1000, 450, 2);

        },
        read_closingInfo : function() {

            account_closingInfo = [];

            var data = [];
            data[0] = 'daily_closing';
            data[1] = targetDay;
            data[2] = 0;

            var req = _DB_query.httpService("account", "R", data);
            account_closingInfo = req[0].data[0];

            if (req.length == 0) {
                console.log('결과가 없음.(이후표시)');
                return;
            }

            this.binding_closingInfo();

        },
        binding_closingInfo : function () {

            var obj = account_closingInfo[0];
            //console.log(obj);

            var startDay = obj.balance_day;
            if(startDay) {
                startDay = startDay.split('-').join("");
                startDay = _common_util.format_date(startDay, '.');
            }

            var endDay = obj.targetDay;
            if(endDay) {
                endDay = endDay.split('-').join("");
                endDay = _common_util.format_date(endDay, '.');
            }

            $('#startDay').html(startDay);
            $('#endDay').html(endDay);
            $('#blance_money').html(_common_util.commaNum(obj.blance_money));

        },
        read : function() {

            account_inData = []; //초기화
            account_outData = []; //초기화
            account_tuitionData = []; //초기화
            account_closing_data = [];

            var data = [];
            data[0] = 'daily_all_closing';
            data[1] = targetDay;
            data[2] = 0;

            var req = _DB_query.httpService("account","R", data);
            account_inData = req[0].data[0];
            account_outData = req[0].data[1];
            account_tuitionData = req[0].data[2];
            account_closing_data = req[0].data[3];

            if(req.length==0) {
                console.log('결과가 없음.(이후표시)');
                return;
            }

            this.binding_closing();
            this.binding_inList();
            this.binding_outList();
            this.binding_tuitionList();

        },
        binding_closing : function () {

            var obj = account_closing_data[0];
            //console.log(obj);

            $('#incom_label').html(_common_util.commaNum(obj.total_incom_sum));
            $('#outcom_label').html(_common_util.commaNum(obj.total_outcom_sum));
            $('#tuition_label').html(_common_util.commaNum(obj.tuition_sum));

        },
        binding_inList : function () {

            var obj = account_inData;
            //console.log(obj);

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var O;
            var registDay;
            var money;
            var categoryName;
            var memo;
            for (var i in obj) {

                O = obj[i];
                //console.log(O);

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==1) {
                    odd_tag = " odd";
                }

                registDay = O.registDay_ymd;
                if(registDay) {
                    registDay = _common_util.format_date(registDay, '.');
                }

                money = O.money;
                money = _common_util.commaNum(money);

                categoryName = O.categoryName;

                memo = O.memo;
                if(O.categoryCode==1) {
                    memo = O.studentName;
                }


                str += '<tr class="list_row'+odd_tag+'" title="'+memo+'">';
                str  += '<td>'+registDay+'</td>';
                str  += '<td>'+money+'</td>';
                str  += '<td>'+categoryName+'</td>';
                str  += '</tr>';
            }

            $('#incom_table tbody').html(str);

            windows_resize();


        },
        binding_outList : function () {

            var obj = account_outData;
            //console.log(obj);

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var O;
            var registDay;
            var money;
            var categoryName;
            var memo;
            for (var i in obj) {

                O = obj[i];
                //console.log(O);

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==1) {
                    odd_tag = " odd";
                }

                registDay = O.registDay_ymd;
                if(registDay) {
                    registDay = _common_util.format_date(registDay, '.');
                }

                money = O.money;
                money = _common_util.commaNum(money);

                categoryName = O.categoryName;

                memo = O.memo;

                str += '<tr class="list_row'+odd_tag+'" title="'+memo+'">';
                str  += '<td>'+registDay+'</td>';
                str  += '<td>'+money+'</td>';
                str  += '<td>'+categoryName+'</td>';
                str  += '</tr>';
            }

            $('#outcom_table tbody').html(str);

            windows_resize();


        },
        binding_tuitionList : function () {

            var obj = account_tuitionData;
            //console.log(obj);

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var O;
            var registDay;
            var money;
            var categoryName;
            var memo;
            for (var i in obj) {

                O = obj[i];
                //console.log(O);

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==1) {
                    odd_tag = " odd";
                }

                registDay = O.registDay_ymd;
                if(registDay) {
                    registDay = _common_util.format_date(registDay, '.');
                }

                money = O.money;
                money = _common_util.commaNum(money);

                categoryName = O.categoryName;

                memo = O.studentName;

                str += '<tr class="list_row'+odd_tag+'" title="'+memo+'">';
                str  += '<td>'+registDay+'</td>';
                str  += '<td>'+money+'</td>';
                str  += '<td>'+categoryName+'</td>';
                str  += '</tr>';
            }

            $('#tuition_table tbody').html(str);

            windows_resize();


        }
    };

}();



