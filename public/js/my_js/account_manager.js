// JavaScript Document

var account_manager = function ()
{


    return {
        _init : function () {

            // admin_login.login_check();
            //
            // $('#btn_logout').click(this.btn_logout_handler);
            //
            // $('#btn_help').click(this.btn_help_handler);
            //
            // $('#tab2').click(this.tab_click_handler);

        },
        tab_click_handler : function () {

            //console.log(this.id);

            var target = document.getElementById('iframe_account_closing').contentWindow;
            target._reload();

        },
        btn_help_handler : function () {

            parent.parent.modalOpen('help_manager', '도움말', 800, 500, 3);

        },
        btn_logout_handler : function () {

            admin_login.logout_handler();

            /*
            var data = [];
            var req = _DB_query.httpService("admin_login","logout", data);
            var logout_data = req[0].data;

            var return_msg = logout_data;

            alert(return_msg);

            //화면 리로드
            parent.admin_login_after("logout");
            */

        }

    };

}();



