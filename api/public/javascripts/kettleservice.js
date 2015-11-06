
var app = angular.module('app', []);

app.service(
    "kettleservice",
    function ($http) {

        
        this.getKettleStatus = function() {
            return $http({
                method: "get",
                url: "kettle/status"
            });
        }
        
        this.turnKettleOn = function() {
            return $http({
                method: "get",
                url: "kettle/on"
            });
        }
        
        this.turnKettleOff = function() {
            return $http({
                method: "get",
                url: "kettle/off"
            });
        }

    }
);