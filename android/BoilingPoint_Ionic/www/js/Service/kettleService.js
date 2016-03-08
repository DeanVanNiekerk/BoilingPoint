kettleApp.service(
    "kettleservice",
    function ($http) {
        var self = this;
        this.baseUrl = "http://finetent.dedicated.co.za:8080/kettle/";

        this.getKettleStatus = function () {
            return $http({
                method: "get",
                url: self.baseUrl + "status"
            });
        }

        this.turnKettleOn = function () {
            return $http({
                method: "post",
                url: self.baseUrl + "on"
            });
        }

        this.turnKettleOff = function () {
            return $http({
                method: "post",
                url: self.baseUrl + "off"
            });
        }

    }
);
