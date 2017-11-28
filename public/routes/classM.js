
var router_name = 'classM';

function classM(router, parent)
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);

}

classM.prototype.handleRoutes = function(router, parent)
{
    var parent = parent;

    router.post("/"+router_name+"/ajax.json", function(req, res) {

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);

        var ins_id = req.session.userId;

        //학원코드 없으면 에러
        if(ins_id=="" || ins_id==undefined) {
            var return_data = {
                "error": true,
                "data": "not ins_id"
            };

            res.json(return_data);
            return;
        }

        //console.log("ins_id : " + ins_id);

        if(gubun=="R") {

            var classId = data[0];

            var query = "CALL class_R(" +
                "'" +  ins_id + "', " +
                classId +
                ")";

            console.log(query);

            parent.mysql_proc_exec(query, res);

        }

        if(gubun=="S") {

            var db_key = data[0];
            var _num = data[2];
            var _field = data[1];
            var _view = data[3];
            var _grd_opt = data[4];

            var query = "CALL class_S(" +
                db_key + ", " +
                _num + ", " +
                "'" + _field + "', " +
                _view + ", " +
                _grd_opt + ", " +
                "'" + ins_id + "'" +
                ")";

            console.log(query);
            parent.mysql_proc_exec(query, res);

        }

        if(gubun=="D") {

            var table = "a_cfg_class";
            var db_key = data[0];
            var query = "CALL data_delete(" +
                "'" + table + "', " +
                db_key + ")";

            console.log(query);
            parent.mysql_proc_exec(query, res);

        }



    });

}

module.exports = classM;