// JavaScript Document

var account_stats = function ()
{

    var account_stats1; //통계
    var account_stats2; //통계

    var targetDay; //오늘

    return {
        _init : function (_in_out) {

            console.log("account_stats_init");

            //오늘확인
            var send_day = _common_util.caldate(0, '-');
            targetDay = send_day;

            //console.log("수입 통계 : ");
            account_stats.read_stats(_in_out);

        },
        //수입/지출 통계
        read_stats : function (_in_out) {

            account_stats1 = [];
            account_stats2 = [];

            var data = [];
            data[0] = 'stats';
            data[1] = targetDay;
            data[2] = 1; // 1:수입, 2:지출(상관없음) -> 2가지 모두 리턴

            var req = _DB_query.httpService("account", "R", data);
            account_stats1 = req[0].data[0]; //수입
            account_stats2 = req[0].data[1]; //지출

            console.log(req);

           if (req.length == 0) {
                console.log('결과가 없음.(이후표시)');
                return;
            }

            var graph_label = "수입";
            var graph_color = "#3d88ba";
            var tObj = account_stats1;
            if(_in_out==2) {
                tObj = account_stats2;
                graph_label = "지출";
                graph_color = "darkorange"
            }

            $('#graph_label').html(graph_label);
            $('#graph_label2').html(graph_label);

            var tempData = new Array();
            var obj;
            var label;
            var value;
            for(var i=0; i<tObj.length; i++) {
                obj = tObj[i];
                //console.log(obj);

                label = obj.descript
                value = obj.incom_sum;
                if(_in_out==2) {
                    value = obj.outcom_sum;
                }
                if(value==null) {
                    value = 0;
                }
                //console.log(label, value);

                tempData.push({label:label, value:value});

                //console.log(tempData);
            }

            // Morris Donut Chart
            /*
            Morris.Donut({
                element: 'hero-donut',
                data: tempData,
                colors: ["#30a1ec", "#76bdee", "#c4dafe", "#000", "#ddd"],
                formatter: function (y) { return y + "%" }
            });*/

            // Morris Bar Chart
            Morris.Bar({
                element: 'hero-bar',
                data: tempData,
                xkey: 'label',
                ykeys: ['value'],
                labels: [graph_label],
                barRatio: 0.4,
                xLabelMargin: 10,
                hideHover: 'auto',
                barColors: [graph_color] //지출 darkorange
            });


        },

    };

}();



