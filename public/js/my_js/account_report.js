// JavaScript Document

var account_report = function ()
{

    var account_closingInfo;
    var account_list;
    var account_sum;

    var targetDay; //오늘

    var _term = 'd'; // d,w,m //읽는단위

    return {
        _init : function () {

            //console.log("account_report_init");

            $('#btn_dayReport').click(this.btn_dayReport_handler);
            $('#btn_weekReport').click(this.btn_weekReport_handler);
            $('#btn_monthReport').click(this.btn_monthReport_handler);

            //오늘확인
            var send_day = _common_util.caldate(0, '-');
            targetDay = send_day;

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
                return;
            }

            this.binding_closingInfo();

        },
        binding_closingInfo : function () {

            var obj = account_closingInfo[0];
            console.log(obj);

            /*
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
            $('#blance_money').html(_common_util.commaNum(obj.blance_money));*/

        },
        // 선택 버튼 기능 정의
        btn_dayReport_handler : function () {

            _term = 'd';
            account_report.read_report();

        },
        btn_weekReport_handler : function () {

            _term = 'w';
            account_report.read_report();

        },
        btn_monthReport_handler : function () {

            _term = 'm';
            account_report.read_report();

        },
        read_report : function () {

            $('#income_table tbody').html('');
            $('#outcome_table tbody').html('');
            $('#tuition_table tbody').html('');

            account_list = [];
            account_sum = [];

            var data = [];
            data[0] = 'report';
            data[1] = targetDay;
            data[2] = _term;

            var req = _DB_query.httpService("account","R", data);

            if (req.length == 0) {
                return;
            }

            account_list = req[0].data[0]
            account_sum = req[0].data[1];
            //console.log(account_sum[0]);

            account_report.binding_label();
            account_report.binding_list();

        },
        binding_label : function () {

            var startDay = account_sum[0].start_day;
            var endDay = account_sum[0].end_day;
            var term_label = '보고기간 : ' + startDay + ' ~ ' + endDay + ' (*전기이월금은 보고내용에서 제외됩니다.)';

            $('#report_term').css('display', 'block');
            $('#report_term').html(term_label);

            var income_sum = account_sum[0].incom_sum;
            var outcome_sum = account_sum[0].outcom_sum;
            var tuition_sum = account_sum[0].tuition_sum;

            if(income_sum!=null) {
                $('#lbl_income_sum').html('(합계 : '+_common_util.commaNum(income_sum)+'원)');
            }

            if(outcome_sum!=null) {
                $('#lbl_outcome_sum').html('(합계 : '+_common_util.commaNum(outcome_sum)+'원)');
            }

            if(tuition_sum!=null) {
                $('#lbl_tuition_sum').html('(합계 : '+_common_util.commaNum(tuition_sum)+'원)');
            }

        },
        binding_list : function () {

            var obj = account_list;

            var O;
            var iStr;
            var oStr;
            var tStr;
            var str;
            var registDay;
            var money;
            var categoryName;

            var iSum = 0;
            var oSum = 0;
            var tSum = 0;
            for (var i in obj) {

                O = obj[i];
                //console.log(O);

                if(O.gubunKey==1) {
                    str = iStr;
                    if(O.categoryCode==1) {
                        str = tStr;
                    }
                }

                if(O.gubunKey==2) {
                    str = oStr;
                }

                registDay = O.registDay_ymd;
                if(registDay) {
                    registDay = _common_util.format_date(registDay, '.');
                }

                money = O.money;
                categoryName = O.categoryName;

                if(categoryName==null) {
                    categoryName = "";
                }

                str += '<tr class="list_row">';
                str += '<td>'+registDay+'</td>';
                str += '<td>'+_common_util.commaNum(money)+'</td>';
                str += '<td>'+categoryName+'</td>';
                str += '</tr>';

                if(O.gubunKey==1) {
                    iSum++;
                    $('#income_table tbody').append(str);
                    if(O.categoryCode==1) {
                        tSum ++;
                        $('#tuition_table tbody').append(str);
                    }

                }

                if(O.gubunKey==2) {
                    oSum++;
                    $('#outcome_table tbody').append(str);
                }
            }

            //console.log(iSum, oSum);
            if(iSum>0) {
                $('#lbl_income_sum_num').html(' '+iSum+'건');
            }

            if(oSum>0) {
                $('#lbl_outcome_sum_num').html(' '+oSum+'건');
            }

            if(tSum>0) {
                $('#lbl_tuition_sum_num').html(' '+tSum+'건');
            }
            windows_resize();

        },
    };

}();



