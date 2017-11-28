// JavaScript Document

var account_group_manager = function ()
{

    var group_data;
    var is_income = false;
    var input_group_name;
    var in_out_num = 1;

    var groupKey = 0;
    var selected_code = 0;
    var type = 1;

    return {
        _init : function () {

            //console.log("account_group_manager_init");

            $('#rb_income').click(this.rb_click_handler);
            $('#rb_outcome').click(this.rb_click_handler);

            $('#btn_save').click(this.btn_save_handler);
            $('#btn_delete').click(this.btn_delete_handler);

            this.default_setup();
            //this.code_binding()

            this.read_group();

        },
        rb_click_handler : function () {

            if ($('#rb_income').is(':checked')) {
                is_income = false;
                in_out_num = 1;
            }
            else {
                is_income = true;
                in_out_num = 2;
            }

            account_group_manager.reset_form();
            account_group_manager.read_group();
        },
        default_setup : function () {
            input_group_name = $("input[id='iGroup']");
            input_group_name.focus();
        },
        read_group: function () {

            selected_code = 0;
            group_data = []; //초기화

            var data = [];
            data[0] = in_out_num;
            data[1] = type;

            var req = _DB_query.httpService("account_group","R", data);
            group_data = req[0].data;

            if(req.length==0 || group_data.length==0) {
                return;
            }

            this.code_binding();

        },
        code_binding : function () {

            var str="";
            var odd_tag;

            var obj;
            var k = 0;
            var j = 0;
            var descript;

            //서버에서 최대 코드를 확인하고, 그코드값 만큼 담아서 준다 ~~ 없으면 없는데로 준다
            for(var i=0; i<group_data.length-1;i++) {

                obj = group_data[i][0];

                //console.log(obj);

                j = i+1;
                if(is_income) {
                    j = 50 + j;
                }

                if(obj==undefined) {
                    descript = "";
                }
                else {
                    descript = obj.descript+"(지정됨)";
                    //console.log(j, obj.code, descript);
                }

                k = i % 2;
                odd_tag = "";
                if (k == 1) {
                    odd_tag = "odd";
                }

                str += '<tr class="list_row ' + odd_tag + '" id="GroupList'+j+'" onclick="account_group_manager.selected_group('+j+')">';
                str += '<td><b>코드(' + j + ') :</b> '+descript+'</td>';
                str += '</tr>';

                $('#group_manager_table').html(str);
            }


        },
        btn_save_handler : function () {

            if(selected_code==0){
                alert('아래 리스트에서 지정되지 않은 코드을 선택해 주세요');
                input_group_name.focus();
                return;
            }

            if(input_group_name.val() == "") {
                alert('항목명을 입력해 주세요');
                input_group_name.focus();
                return;
            }

            var iData = [];
            iData[0] = groupKey;
            iData[1] = 1;
            iData[2] = selected_code;
            iData[3] = input_group_name.val();

            //console.log(iData);
            //return;

            var req = _DB_query.httpService("account_group","S", iData);

            //결과없는것.
            if(req.length==0) {
                //console.log('결과가 없음.');
                return;
            }
            var obj = req[0].data;

            //console.log(obj);
            var msg;
            if(groupKey>0) {
                //console.log(obj.affectedRows);
                msg = "수정되었습니다";
                if(obj.affectedRows<=0) {
                    msg = "에러가 발생하였습니다.(수정안됨)";
                }
            }
            else {
                msg = "저장되었습니다";
                if(obj.affectedRows<=0) {
                    msg = "에러가 발생하였습니다.(저장안됨)";
                }

            }
            alert(msg);

            groupKey = 0;
            account_group_manager.reset_form();
            account_group_manager.read_group();
        },
        btn_delete_handler : function () {

            var answer = confirm("정말삭제하시겠습니까?");
            if(answer) {
                //console.log("yes");
                account_group_manager.delete_action();
            }
            else {
                //console.log("no");
                return;
            }
        },
        delete_action : function () {

            var iData = [];

            iData[0] = groupKey;

            //서버전송
            var req = _DB_query.httpService("account_group", "D", iData);

            //결과 없는것
            if(req.length==0) {
                //console.log('결과가 없음.');
                return;
            }

            var obj = req[0].data;
            //console.log(obj.affectedRows);
            alert('삭제되었습니다.');

            account_group_manager.reset_form();
            account_group_manager.read_group();

        },
        list_state : function (_tNum) {

            //console.log(_tNum);

            var sN = 1;
            var eN = 50;
            if(in_out_num==2) {
                sN = 50;
                eN = 100;
                _tNum = _tNum+50;
            }
            for (var i=sN; i<eN;++i) {
                $('#GroupList'+i).removeClass('selected');
            }

            $('#GroupList'+_tNum).addClass('selected');

        },
        selected_group : function (_j) {

            var tNum = _j;
            if(in_out_num==2) {
                tNum = _j-50;
            }

            //console.log(_j);
            var obj = group_data[tNum-1];

            selected_code = _j;

            this.list_state(tNum);

            this.binding_edit_group_form(obj[0]);

        },
        binding_edit_group_form : function (_obj) {

            //console.log(_obj);

            if(_obj==undefined) {
                this.reset_form();
                return;
            }

            $('#btn_delete').css('display', 'inline-block');
            if(selected_code==1) {
                console.log("수강료는 삭제 할 수 없습니다");
                $('#btn_delete').css('display', 'none');
            }

            groupKey = _obj.id;
            var descript = _obj.descript;
            input_group_name.val(descript);

            $('#btn_save').html("수정");
            $('#btn_delete').prop('disabled', false);

            input_group_name.focus();

        },
        reset_form : function () {

            $('#btn_save').html("저장"); // 저장으로
            $('#btn_delete').prop('disabled', true);
            groupKey = 0;

            input_group_name.val('');
            input_group_name.focus();

        }


    };

}();



