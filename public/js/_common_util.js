    // JavaScript Document

    var _common_util = function ()
    {

        return {

            _init : function () {

                console.log("_common_util_init");

            },
            /** 달 계산 : toMonth 는 0 ~~ **/
            calMonth : function (_month, _format) {

                var caledmonth, caledday, caledYear;
                var D = new Date();

                D.setMonth(D.getMonth()+_month);
                //console.log(D.getFullYear(), D.getMonth()+1);

                caledYear = D.getFullYear();
                caledmonth = D.getMonth()+1;
                caledmonth = this.zero_plus(caledmonth);

                //String이 아니면 합쳐지는 경우가 생김.
                if (_format==undefined) {
                    _format = ".";
                }
                var result = this.format_month_date(String(caledYear)+String(caledmonth), _format);

                return result;

            },
            /** 날짜계산 : today 는 0 ~~ **/
            caldate : function (_day, _format) {

                var caledmonth, caledday, caledYear;
                var loadDt = new Date();

                var v = new Date(Date.parse(loadDt) + _day*1000*60*60*24);

                caledYear = v.getFullYear();
                caledmonth = v.getMonth()+1;
                caledmonth = this.zero_plus(caledmonth);

                caledday = v.getDate();
                caledday = this.zero_plus(caledday);

                //String이 아니면 합쳐지는 경우가 생김.
                if (_format==undefined) {
                    _format = ".";
                }
                var result = this.format_date(String(caledYear)+String(caledmonth)+String(caledday), _format);

                return result;

            },
            format_date : function(date, format) {

                var result;

                var yy = date.substr(0,4);
                var mm = date.substr(4,2);
                var dd = date.substr(6,2);
                var hh = date.substr(8,2);
                var MM = date.substr(10,2);
                var ss = date.substr(12,2);
                switch (format) {
                    case '.':
                        result = yy+'.'+mm+'.'+dd;
                        break;
                    case '-':
                        result = yy+'-'+mm+'-'+dd;
                        break;
                    case 'han':
                        result = yy+'년 '+mm+'월 '+dd+'일';
                        break;
                    case 'han_hsi':
                        result = yy+'년 '+mm+'월 '+dd+'일 '+hh+':'+MM+':'+ss;
                        break;
                    case 'space':
                        result = yy+' '+mm+' '+dd;
                        break;
                }

                return result;
            },
            format_month_date : function(date, format) {

                var result;

                var yy = date.substr(0,4);
                var mm = date.substr(4,2);
                switch (format) {
                    case '.':
                        result = yy+'.'+mm;
                        break;
                    case '-':
                        result = yy+'-'+mm;
                        break;
                    case 'han':
                        result = yy+'년 '+mm+'월';
                        break;
                }

                return result;
            },
            mktime_to_date : function (unix_timestamp, _format, _type) {

                var date = new Date(unix_timestamp*1000);
                /**
                 * _type있으면 date는 date형식으로 오고
                 * _type없으면 기존의 timestemp형식.
                 * **/
                if(_type) {
                    var date = unix_timestamp;
                }

                var year = date.getFullYear();
                var month = this.zero_plus(date.getMonth()+1);
                var day = this.zero_plus(date.getDate());

                var hours = date.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                var formattedTime = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                if(_format=='ymd') {
                    formattedTime = year + '.' + month + '.' + day; // + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                }

                return formattedTime;

            },
            /*****
             * yyyy mm dd기준 -> mktime
             * ex) date_to_mktime('2014-06-24'); -> 1738854001"
             *******/
            date_to_mktime : function (_date) {

                if(_date=="" || _date==undefined) {
                    console.log("_date없음");
                }

                var dateA,year,month,day;
                dateA = _date.split("-");
                year = dateA[0];
                month = parseInt(dateA[1]);
                day = parseInt(dateA[2]);
                return new Date(year, month - 1, day, 0, 0, 0, 0).getTime() / 1000;
            },
            /*******
             * yyyy-mm-dd기준 $n만큼 후의 날짜 계산
             * ex) alert(cal_date('2014-06-24', 365)); 1~10개월 이후 날짜수
             *******/
            cal_date : function ($date, $n)
            {
                var start = new Date(Date.parse($date)+($n * 1000 * 60 * 60 * 24));

                if($n<10) {
                    start.setMonth(start.getMonth()+$n);
                }

                var t_yyyy  = start.getFullYear();
                var t_mm	= start.getMonth()+1;
                var t_dd	= start.getDate();
                var t_date	= t_yyyy + '-' + this.zero_plus(t_mm) + '-' + this.zero_plus(t_dd);

                return t_date;
            },
            zero_plus : function (str) {

                var result;
                if(str.toString().length==1)
                {
                    result = "0"+str;
                }
                else {
                    result = str;
                }
                return result;

            },
            check_jumin : function(jumin) {

                //var jumin=document.getElementById('jumin1').value+document.getElementById('jumin2').value;

                //주민등록 번호 13자리를 검사한다.
                var fmt = /^\d{6}[1234]\d{6}$/;  //포멧 설정
                if (!fmt.test(jumin)) {
                    return false;
                }

                // 생년월일 검사
                var birthYear = (jumin.charAt(6) <= "2") ? "19" : "20";
                birthYear += jumin.substr(0, 2);
                var birthMonth = jumin.substr(2, 2) - 1;
                var birthDate = jumin.substr(4, 2);
                var birth = new Date(birthYear, birthMonth, birthDate);

                if ( birth.getYear() % 100 != jumin.substr(0, 2) ||
                    birth.getMonth() != birthMonth ||
                    birth.getDate() != birthDate) {
                    return false;
                }

                // Check Sum 코드의 유효성 검사
                var buf = new Array(13);
                for (var i = 0; i < 13; i++) buf[i] = parseInt(jumin.charAt(i));

                multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
                for (var sum = 0, i = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

                if ((11 - (sum % 11)) % 10 != buf[12]) {
                    return false;
                }

                return true;

            },
            /*
             입력값의 바이트 길이를 리턴
             ex) if (getByteLength(form.title) > 100) {
             alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");
             }
             */
            C_getByteLength : function(asValue) {
                var byteLength = 0;
                var	lsEsc = "%B2%B3%B4%B7%A8%AD%B1%D7%F7%B0%A7%B8%A1%BF%A4%B6%AE%C6%D0%AA%3F%3F%D8%BA%DE%BD%BC%BE%E6%F0%F8%DF%FE%B9";

                for (var i = 0; i < asValue.length; i++)
                {
                    var oneChar = escape(asValue.charAt(i));

                    if (oneChar.length == 1 )
                    {
                        byteLength ++;
                    }
                    else if (oneChar.indexOf("%u") != -1)
                    {
                        byteLength += 2;
                    }
                    else if (oneChar.indexOf("%") != -1)
                    {
                        if(lsEsc.indexOf(oneChar) != -1)
                        {
                            byteLength += 2;
                        }
                        else
                        {
                            byteLength += oneChar.length / 3;
                        }
                    }
                }

                return byteLength;
            },
            //사업자번호 유효성 검증
            C_isValidCustNo :function C_isValidCustNo(asValue) {
                var intSumMod = 0;

                if (C_isNull(asValue)) return true;

                var strValue = asValue.toString().replace(/-/g, "");

                if (C_getByteLength(strValue) == 13)
                {
                    return C_isValidRegNo(strValue);
                }

                if (C_getByteLength(strValue) != 10 || !C_isNum(strValue))
                {
                    ERR_MSG = "사업자등록번호는 10자리 숫자입니다.";
                    return false;
                }

                intSumMod += parseInt(strValue.substr(0, 1));
                intSumMod += parseInt(strValue.substr(1, 1)) * 3 % 10;
                intSumMod += parseInt(strValue.substr(2, 1)) * 7 % 10;
                intSumMod += parseInt(strValue.substr(3, 1)) * 1 % 10;
                intSumMod += parseInt(strValue.substr(4, 1)) * 3 % 10;
                intSumMod += parseInt(strValue.substr(5, 1)) * 7 % 10;
                intSumMod += parseInt(strValue.substr(6, 1)) * 1 % 10;
                intSumMod += parseInt(strValue.substr(7, 1)) * 3 % 10;
                intSumMod += Math.floor(parseInt(strValue.substr(8, 1)) * 5 / 10);
                intSumMod += parseInt(strValue.substr(8, 1)) * 5 % 10;
                intSumMod += parseInt(strValue.substr(9, 1));

                if (intSumMod % 10 != 0)
                {
                    ERR_MSG = "올바르지 않은 사업자등록번호입니다.";
                    return false;
                }

                return	true;
            },
            /** 출결라벨처리1/2/3/4/5/6 **/
            attendance_to_label : function (_num) {
                switch (_num) {
                    case "1":
                        return "정상";
                        break;
                    case "2":
                        return "결석";
                        break;
                    case "3":
                        return "병결";
                        break;
                    case "4":
                        return "지각";
                        break;
                    case "5":
                        return "휴일";
                        break;
                    case "6":
                        return "미처리";
                        break;
                }
            },
            /** 라벨처리1/2/3/4/5/6/ **/
            attendance_to_label : function (_num) {
                switch (_num) {
                    case "1":
                        return "정상";
                        break;
                    case "2":
                        return "결석";
                        break;
                    case "3":
                        return "병결";
                        break;
                    case "4":
                        return "지각";
                        break;
                    case "5":
                        return "휴일";
                        break;
                    case "6":
                        return "X";
                        break;
                }
            },
            attendance_to_tag : function (_num) {
                switch (_num) {
                    case "1":
                        return "normality";
                        break;
                    case "2":
                        return "absence";
                        break;
                    case "3":
                        return "sick";
                        break;
                    case "4":
                        return "lateness";
                        break;
                    case "5":
                        return "day_off";
                        break;
                    case "6":
                        return "yet";
                        break;
                }
            },
            /** 가족관계라벨처리1/2/3/4/5/6/7/8 **/
            family_relation_to_label : function (_num) {
                switch (_num) {
                    case "1":
                        return "부";
                        break;
                    case "2":
                        return "모";
                        break;
                    case "3":
                        return "형";
                        break;
                    case "4":
                        return "누나";
                        break;
                    case "5":
                        return "언니";
                        break;
                    case "6":
                        return "동생";
                        break;
                    case "7":
                        return "친척";
                        break;
                    case "8":
                        return "보호자";
                        break;
                }
            },
            /** 배열의 중보제거 기능. **/
            remove_duplicates : function(array) {
                var result = [];
                $.each(array, function(index, element) {     // 배열의 원소수만큼 반복
                    if ($.inArray(element, result) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
                        result.push(element);                // result 배열에 값을 넣는다.
                    }
                });
                return result;
            },
            /** 잘못된 핸드폰번호 확인(정규식이용). **/
            cell_number_check : function (_cell) {
                var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
                if ( !regExp.test( _cell ) ) {
                    //alert("잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.");
                    console.log('잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.');
                    return false
                }
                return true;
            },
            commaNum : function (num) {
                if(num==null) {
                    return "";
                }
                var str = num.toString();
                return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
            },
            sleep : function (num){	//[1/1000초]
                var now = new Date();
                var stop = now.getTime() + num;
                while(true){
                    now = new Date();
                    if(now.getTime() > stop)return;
                }
            }

        };

    }();
