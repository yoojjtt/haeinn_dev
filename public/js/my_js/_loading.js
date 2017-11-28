// JavaScript Document

var loading = function ()
{

    var test = "test_var";

    return {

        start : function(){
            // alert('시작');
            //$('#loading').css('display','block');
            var loader = document.getElementById('loading');
            loader.style.display = 'block';
            return true;
        },
        end : function(){
            //$('#loading').css('display','none');
            var loader = document.getElementById('loading');
            loader.style.display = 'none';
            return true;
        }


    };

}();



