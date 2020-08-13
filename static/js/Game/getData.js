var m_width, m_height;

let userName = "admin";
let mapname = "demo1";
let mapID = window.location.pathname.split('/')[1].split("_")[1];
let count_level = 1;
let level = 1;
let matrix = "";

var url = "map_" + mapID + "/" + level + "/get";

$.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    data: {"user": userName, "mapID": mapID, "level": level},
    dataFilter: function (data, type) {
        obj = JSON.parse(data);
        matrix = obj.matrix.split(";");

    },
    statusCode: {
        200: function () {
            // YOUR SERVER'S RESPONSE
            // you can act on your server's
            // response if there will be any
            // eg. you can send back information to update UI.
        },
        // ... handle errors if required
        404: function () {
            alert("Сервер недоступен");// what to do on 404 etc.
        }
    },
});






