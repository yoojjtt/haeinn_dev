// JavaScript Document

var account_input = function ()
{
    var class_data;
    var student_data;
    var account_group_data;

    var is_edit_mode = false;
    var is_input_visible = false;

    var account_data;
    var account_closing_data;

    //선택값.
    var accountKey;
    var selected_day;
    var selected_group1; //수입,지출정기이월
    var selected_group2; //코드 항목..
    var selected_group2_name; //코드 항목..
    var selected_group3; //학생키
    var pay_type = 1;  //현금 1 , 은행 :2

    var classKey = -1; //모두 , 휴지통 -2,

    return {
        _init : function () {

            //console.log("account_input_init");

            // 버튼 기능 정의
            $('#btn_item').click(this.btn_item_handler);
            $('#btn_today').click(this.btn_today_handler);
            $('#btn_accountBook').click(this.btn_accountBook_handler);
            $('#btn_add').click(this.btn_add_bandler);
            $('#btn_save').click(this.btn_save_handler);
            $('#btn_delete').click(this.btn_delete_handler);
            $('#btn_close').click(this.btn_close_handler);

            $('#pay_type1').click(this.pay_type_click_handler);
            $('#pay_type2').click(this.pay_type_click_handler);

            $('#gubun_list tbody tr').click(this.gubun_click_handler);

            $('#sClass').change(this.sClass_change_handler);

            //오늘확인
            //var today = _common_util.caldate(0, '.');
            //selected_day = _common_util.caldate(0, '-');

            //한번만..
            //this.read_account('daily_closing');
            //this.read_account('daily_list');

            //값비교를 위해서 있어야 함.
            this.class_read();
            this.student_read();

            //account_input.change_target_day_action(selected_day);

        },
        change_target_day : function (_mktime) {

            //var target_day = _common_util.mktime_to_date(_mktime, 'ymd', 'date');

            var send_day = target_day.split(".").join("");
            send_day = _common_util.format_date(send_day, '-');

            account_input.change_target_day_action(send_day);

        },
        change_target_day_action : function (_change_day) {

            selected_day = _change_day;
            $('#btn_accountBook').html(selected_day+' 장부입력');

            $('#iTargetDay').val(selected_day);

            is_input_visible = true;
            account_input.btn_accountBook_handler();

            this.read_account();
            this.read_closing();

        },
        gubun_click_handler : function () {

            var num = this.id.substr(-1);

            account_input.gubun_click_action(num);
            account_input.table_tr_state(-1);

        },
        gubun_click_action : function (num) {

            is_edit_mode = false;

            account_input.gubun_state(num);
            account_input.gubun2_show_hide(num);

            selected_group1 = num;
            if(num<3) {
                account_input.account_group_read(num);
            }

            //일부 리셋
            account_input.reset_form_part();

            //모두가린다
            $('#input_group3').css('display', 'none');
            $('#input_group4').css('display', 'none');

            //전기이월이면
            if(num==3) {
                account_input.gubun4_show_hide('visible');
                $('#iMoney').focus();

                selected_group2_name = "전기이월";
                $('#lbl_selected2').html(selected_group2_name);
            }

        },
        gubun_state : function (_num) {

            for(var i=1; i<=3; i++) {
                $('#gubun_list_'+i).removeClass('selected');
            }

            if(_num==0) { return; }
            $('#gubun_list_'+_num).addClass('selected');

        },
        gubun2_show_hide : function (_num) {

            var width = 150;
            var visible = 'visible';
            if(_num=='3') {
                width = 0;
                visible = 'hidden';

                account_input.gubun4_show_hide('visible');
            }
            $('#input_group2').css('width', width);
            $('#input_group2').css('visibility', visible);

        },
        gubun3_show_hide : function (_visible_opt) {

            var width = 150;
            var visible = 'visible';
            var display = 'block';
            if(_visible_opt=='hidden') {
                width = 0;
                visible = 'hidden';

                account_input.gubun4_show_hide('visible');
            }
            $('#input_group3').css('display', display);
            $('#input_group3').css('width', width);
            $('#input_group3').css('visibility', visible);

        },
        gubun4_show_hide : function (_visible_opt) {

            var width = 150;
            var visible = 'visible';
            var display = 'block';
            if(_visible_opt=='hidden') {
                width = 0;
                visible = 'hidden';
            }
            $('#input_group4').css('display', display);
            $('#input_group4').css('width', width);
            $('#input_group4').css('visibility', visible);

        },
        //항목 선택 읽기(수입,지출)
        account_group_read : function (_type) {

            //칼라처리.
            if(_type == '2') {
                $('#input_group2').removeClass('selected_incom');
                $('#input_group2').addClass('selected_outcom');
            }
            else {
                $('#input_group2').removeClass('selected_outcom');
                $('#input_group2').addClass('selected_incom');
            }

            account_group_data = []; //초기화

            var data = [];
            data[0] = _type; //1,2

            var req = _DB_query.httpService("account_group","R", data);
            account_group_data = req[0].data;

            if(req.length==0 || account_group_data.length==0) {
                //console.log('항목 결과가 없음.(이후표시)');
                return;
            }

            this.account_group_binding_list();

        },
        account_group_binding_list : function () {

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var O;
            var descript;
            for (var i in account_group_data) {

                O = account_group_data[i][0];

                //console.log(O);

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==1) {
                    odd_tag = " odd";
                }

                descript = "";
                if(O!=undefined) {
                    descript = O.descript;

                    str += '<tr class="list_row'+odd_tag+'" id="gubun2_'+i+'" onclick="account_input.selected_gubun_row('+i+')">';
                    str += '<td>'+descript+'</td>';
                    str += '</tr>';
                }

            }

            $('#input_group2 tbody').html(str);

        },
        selected_gubun_row : function (_i) {

            var obj = account_group_data[_i][0];

            //console.log(obj);

            selected_group2 = obj.code;
            selected_group2_name = obj.descript;

            this.gubun2_state(_i);

            //일부 리셋
            account_input.reset_form_part();

            //console.log("selected_group2 : " + selected_group2);
            $('#lbl_selected2').html(selected_group2_name);

            //수강료이면..
            this.gubun3_show_hide('hidden');
            if(selected_group2==1) {
                this.gubun3_show_hide('visible');

                //반설정 초기화
                $('#sClass').val('0');
                this.student_read(); //기준에 의한 모든 데이터(다시읽기)
                return;
            }

            $('#iMoney').focus();
            $('#btn_delete').prop('disabled', true);

        },
        gubun2_state : function (_tnum) {

            var selected_class = "selected";
            if(selected_group1==2) {
                selected_class = "oSelected";
            }
            for(var i=0; i<account_group_data.length; i++) {
                $('#gubun2_'+i).removeClass(selected_class);
            }

            if(_tnum<0) { return; }
            $('#gubun2_'+_tnum).addClass(selected_class);

        },
        class_read : function() {

            class_data = []; //초기화

            var data = [];
            data[0] = 0;

            var req = _DB_query.httpService("classM","R", data);
            //console.log(req);

            //결과없는것.
            if(req.length==0) {
                //resize_win();  //todo list
                console.log('결과가 없음.(이후표시)');
                return;
            }

            class_data = req[0].data[0];
            this.class_binding_list();

        },
        class_binding_list : function () {

            var str = '<option value="0">[전체]</option>';
            var O;
            var key;
            var class_name;
            for (var i in class_data) {
                //console.log(class_data[i]);
                O = class_data[i];

                key = O.id;
                class_name = O.field;
                str  += '<option value="'+key+'">'+class_name+'</option>';
            }

            $('#sClass').html(str);

        },
        sClass_change_handler : function () {

            classKey = $(this).val();
            account_input.student_read();

        },
        student_read : function() {

            student_data = []; //초기화

            var data = [];
            data[0] = classKey;
            //todo list

            // var req = _DB_query.httpService("student","R", data);
            // student_data = req[0].data[0];
            //
            // if(req.length==0 || student_data.length==0) {
            //     windows_resize();
            //     //console.log('결과가 없음.(이후표시)');
            //     return;
            // }
            //
            // this.student_binding_list();

        },
        student_binding_list : function () {

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var name;
            var O;
            for (var i in student_data) {

                O = student_data[i];

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==0) {
                    odd_tag = " odd";
                }

                str += '<tr class="list_row'+odd_tag+'" id="gubun3_'+i+'" onclick="account_input.selected_student_row('+i+')">';
                str += '<td>'+O.name+'</td>';
                str += '</tr>';
            }

            $('#student_table tbody').html(str);
        },
        selected_student_row : function (_i) {

            var obj = student_data[_i];
            console.log(obj);

            selected_group3 = obj.id;

            account_input.student_list_state(_i);
            $('#iMoney').focus();
            
        },
        student_list_state : function (_tNum) {

            for(var i=0; i<student_data.length; i++) {
                $('#gubun3_'+i).removeClass('selected');
            }

            if(_tNum<0) { return; }
            $('#gubun3_'+_tNum).addClass('selected');

            var tPos = _tNum * 28;
            $('#student_table tbody').animate({scrollTop : tPos}, 400);

        },
        btn_accountBook_handler : function () {

            account_input.reset_form();

            is_input_visible = !is_input_visible;

            var visible = 'none';
            var height = 60;
            if(is_input_visible) {
                visible = 'block';
                height = 240;
            }
            $('#account_input_box').css('display', visible);
            $('#account_input_big_box').css('height', height);

            //windows_resize();

        },
        pay_type_click_handler : function () {

            if ($('#pay_type2').is(':checked')) {
                pay_type = 2;
            }
            else {
                pay_type = 1;
            }

        },
        btn_item_handler : function () {

            //console.log("항목 등록 : ");

            var width = $(this).width();
            var top = $(this).offset().top;
            var left = $(this).offset().left;

            parent.parent.groupManagerOpen(left-110, top+155, 410, 350, '항목등록 관리', 'account_group_manager');

        },
        btn_today_handler : function () {

            //console.log("오늘 날짜로 : ");
            //오늘확인
            var today = _common_util.caldate(0, '.');
            var send_day = _common_util.caldate(0, '-');
            account_input.change_target_day_action(today, send_day);

            $('#dp6').datepicker('update', send_day);

        },
        btn_close_handler : function () {

            is_input_visible = true;
            account_input.btn_accountBook_handler();

        },
        btn_add_bandler : function () {

            account_input.reset_form();

        },
        btn_delete_handler : function () {

            var answer = confirm("정말 삭제하시겠습니까?");
            if (!answer) {
                return
            }
            account_input.delete_action();

        },
        delete_action : function () {

            var iData = [];

            iData[0] = accountKey;

            //서버전송.
            var req = _DB_query.httpService("account","D", iData);

            if(req.length==0) {
                return;
            }

            var obj = req[0].data;
            alert('삭제 되었습니다');

            //전기이월삭제 확인이 필요함..
            if(selected_group1==3 || selected_group1==9) {
                account_input.read_closing();
            }

            //새로고침.
            account_input.btn_close_handler();
            account_input.read_account();

        },
        btn_save_handler : function () {

            //필수 체크
            //수강료이면
            if(selected_group1==1 && selected_group2==1) {
                if(selected_group3=="") {
                    alert("학생을 선택해 주세요.");
                    $('#student_table').focus();
                    return;
                }
            }

            if($('#iMoney').val()=="") {
                alert("금액을 입력해 주세요.");
                $('#iMoney').focus();
                return;
            }

            if(!C_isNum($('#iMoney').val())) {
                alert("금액은 숫자로만 입력해 주세요.");
                $('#iMoney').focus();
                return;
            }

            var iData = [];

            iData[0] = accountKey;
            iData[1] = selected_group1;
            iData[2] = selected_group2;
            iData[3] = selected_group3;
            iData[4] = selected_day;
            iData[5] = $('#iMoney').val();
            iData[6] = pay_type;
            iData[7] = $('#iMemo').val();

            //console.log(iData);
            //return;

            var req = _DB_query.httpService("account","S", iData);

            if(req.length==0) {
                console.log('결과가 없음.');
                return;
            }

            var obj = req[0].data;

            var msg;
            //console.log("affectedRows : " + obj.affectedRows);
            if(accountKey>0) {
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

            //전기이월이면 리로드
            if(selected_group1==3) {
                account_input.read_closing();
            }

            //새로고침
            account_input.btn_close_handler();
            account_input.read_account();

        },
        read_closing : function() {

            //console.log("read_closing");

            account_closing_data = []; //초기화

            var data = [];
            data[0] = "daily_closing";
            data[1] = selected_day;

            var req = _DB_query.httpService("account","R", data);

            if(req.length==0) {
                console.log('결과가 없음.(이후표시)');
                return;
            }

            account_closing_data = req[0].data[0];
            this.binding_closing_label();

        },
        read_account : function() {

            account_data = []; //초기화

            var data = [];
            data[0] = "daily_list";
            data[1] = selected_day;

            var req = _DB_query.httpService("account","R", data);

            if(req.length==0) {
                //console.log('결과가 없음.(이후표시)');
                return;
            }

            account_data = req[0].data[0];
            if(account_data.length==0) {
                var str="";
                str  += '<div class="zero_data">검색된 데이터가 없습니다.</div>';
                $('#payment_table tbody').html(str);
                //console.log('회계 결과가 없음.(이후표시)');
                return;
            }

            this.binding_list();

        },
        binding_list : function () {

            //console.log(account_data);

            var str="";
            var k = 0;
            var j = 1;
            var odd_tag;

            var O;
            var codeName;
            var registDay;
            var incom;
            var outcom;
            for (var i in account_data) {

                O = account_data[i];
                //console.log(O);

                j = Number(i) + 1;
                k = i % 2;
                odd_tag = "";
                if(k==0) {
                    odd_tag = "odd";
                }

                registDay = O.registDay_ymd;
                if(registDay) {
                    registDay = _common_util.format_date(registDay, '.');
                }

                codeName = O.codeName;
                if(codeName==null) {
                    codeName = "";
                }

                incom = "0";
                outcom = "0";
                if(O.gubunKey==1) {
                    incom = O.money;
                    incom = _common_util.commaNum(incom);
                }
                else if(O.gubunKey==9) {
                    codeName = "전기이월";
                    incom = O.money;
                    incom = _common_util.commaNum(incom);
                }
                else {
                    outcom = O.money;
                    outcom = _common_util.commaNum(outcom);
                }

                str  += '<tr class="list_row '+odd_tag+'" id="aTr_'+i+'" onclick="account_input.selected_row('+i+')">';
                    str  += '<td>'+registDay+'</td>';
                    str  += '<td>'+codeName+'</td>';
                    str  += '<td class="income">'+incom+'</td>';
                    str  += '<td class="outcom">'+outcom+'</td>';
                    str  += '<td>'+O.memo+'</td>';
                str  += '</tr>';
            }

            $('#payment_table tbody').html(str);
            windows_resize();

        },
        selected_row : function (_i) {

            var obj = account_data[_i];
            //console.log(obj);

            account_input.table_tr_state(_i);
            is_input_visible = false;
            account_input.btn_accountBook_handler();

            //화면인터랙션..
            // 전기이월 예외
            var temp_gubunKey = obj.gubunKey;
            if(temp_gubunKey==9) {
                temp_gubunKey = 3;
            }
            account_input.gubun_click_action(temp_gubunKey);

            // 전기이월 예외
            var temp_code;
            if(obj.gubunKey<3) {
                if(obj.gubunKey==1) {
                    temp_code = obj.categoryCode - 1;
                }
                else {
                    temp_code = obj.categoryCode - 51;
                }
                account_input.selected_gubun_row(temp_code);
            }

            accountKey = obj.id;
            selected_group1 = obj.gubunKey;
            selected_group2 = obj.categoryCode;
            selected_group3 = obj.studentKey;

            var registDay = obj.registDay_ymd;
            if(registDay) {
                registDay = _common_util.format_date(registDay, '.');
            }

            $('#iTargetDay').val(registDay);
            $('#iMoney').val(obj.money);
            pay_type = obj.bank;

            $('#pay_type1').prop("checked",pay_type==1? true:false);
            $('#pay_type2').prop("checked",pay_type==2? true:false);

            $('#iMemo').val(obj.memo);

            is_edit_mode = true;
            $('#btn_delete').prop('disabled', !is_edit_mode);

            //수강료이고 학생키가 있다면.
            if(selected_group1 == 1 && obj.studentKey>0) {

                var selected_num = search_metch_key_to_index(student_data, obj.studentKey);
                //console.log(selected_num);

                //학생리스트에서 학생 활성화 시키기. 스크롤 이동..
                selected_group3 = obj.studentKey;
                account_input.student_list_state(selected_num);
            }

        },
        table_tr_state : function (_tnum) {

            for(var i=0; i<account_data.length; i++) {
                $('#aTr_'+i).removeClass('select');
            }

            if(_tnum<0) { return; }
            $('#aTr_'+_tnum).addClass('select');

        },
        binding_closing_label : function () {

            //console.log(account_closing_data);

            var obj = account_closing_data[0];

            var balance_day = obj.balance_day;
            if(balance_day) {
                balance_day = balance_day.split("-").join("");
                balance_day = _common_util.format_date(balance_day, '.');
            }

            var target_day = obj.targetDay;
            if(target_day) {
                target_day = target_day.split("-").join("");
                target_day = _common_util.format_date(target_day, '.');
            }

            var balance_money = obj.blance_money;
            var today_incom_sum = obj.today_incom_sum;
            var today_outcom_sum = obj.today_outcom_sum;
            var total_incom_sum = obj.total_incom_sum;
            var total_outcom_sum = obj.total_outcom_sum;

            if(today_incom_sum==null) { today_incom_sum = 0; }
            if(today_outcom_sum==null) { today_outcom_sum = 0; }

            if(total_incom_sum==null) { total_incom_sum = 0; }
            if(total_outcom_sum==null) { total_outcom_sum = 0; }

            var today_closing = Number(today_incom_sum) - Number(today_outcom_sum);
            var total_closing = Number(total_incom_sum) - Number(total_outcom_sum) + Number(balance_money);

            $('#input_start').html(balance_day);
            $('#input_start2').html(balance_day);
            $('#input_end').html(target_day);
            $('#input_end2').html(target_day);
            $('#balance_money').html(_common_util.commaNum(balance_money));
            $('#balance_money2').html(_common_util.commaNum(balance_money)+' 원(전기이월금)');

            $('#today_incom_sum').html(_common_util.commaNum(today_incom_sum)+' 원');
            $('#today_outcom_sum').html(_common_util.commaNum(today_outcom_sum)+' 원');
            $('#today_incom_sum2').html(_common_util.commaNum(today_incom_sum)+' 원');
            $('#today_outcom_sum2').html(_common_util.commaNum(today_outcom_sum)+' 원');

            $('#today_closing').html(_common_util.commaNum(today_closing)+' 원');

            $('#total_incom_sum').html(_common_util.commaNum(total_incom_sum)+' 원');
            $('#total_outcom_sum').html(_common_util.commaNum(total_outcom_sum)+' 원');

            $('#total_closing').html(_common_util.commaNum(total_closing)+' 원');

        },
        reset_form_part : function () {

            pay_type = 1;
            $('#pay_type1').prop("checked",true);
            $('#pay_type2').prop("checked",false);

            if(!is_edit_mode) {
                $('#iMoney').val('');
            }
            $('#iMemo').val('');

        },
        reset_form : function () {

            accountKey = 0;
            selected_group1 = '';
            selected_group2 = '';
            selected_group3 = '';

            selected_group2_name = '';

            this.reset_form_part();

            //모두가리기.
            this.gubun_state(0);

            this.gubun2_show_hide(3);
            $('#input_group3').css('display', 'none');
            $('#input_group4').css('display', 'none');

            $('#btn_delete').prop('disabled', true);

        }
    };

}();



