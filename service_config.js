
function bauhaus_config() {

    var return_val = {
        "db_config" : {
            host     : '220.230.113.201',
            port     : 3306,
            user     : 'root',
            password : 'Pi667788!',
            database : 'one_paper'
        },
        "mail_config" : {
            /* gmail작동안함.
            user     : "bauhaus_admin@predict.kr", //"2mailx@naver.com",
            password : "predict5300", //"Predict5300!",
            host     : "smtp.gmail.com",
            port     : 465,
            ssl      : true*/
            user: "predict49800@naver.com",
            password: "",
            host: "smtp.naver.com",
            port: 465,
            ssl: true
        }
    }

    return return_val;
}

module.exports = bauhaus_config;
