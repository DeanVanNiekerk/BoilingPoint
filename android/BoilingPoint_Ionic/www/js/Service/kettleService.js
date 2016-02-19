kettleApp.service(
    "kettleservice",
    function ($http) {
        var self = this;
        this.baseUrl = "http://finetent.dedicated.co.za:8080/kettle/";

        this.getKettleStatus = function () {
            debugger;
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

/*
function FakeDataStore() {
    self = this;
    this.temp = 0;
    this.status = false;
    this.level = "50%";

    this.getFakeData = function () {
        var data = { "data": { "Type": "2", "Data": { "On": "true", "Temp": "35", "Level": "50%" } } };
        return data;
    }


}



kettleApp.service(
    "fakekettleservice",
    function ($http) {

        var self = this;
        this.baseUrl = "";
        this.fakeData = new FakeDataStore();
        this.getKettleStatus = function(isSuccessful) {

            var deferred = $q.defer()

            if (isSuccessful === true) {
                deferred.resolve(self.fakeData.getFakeData());
            }
            else {
                deferred.reject("Oh no! Something went terribly wrong in you fake $http call")
            }

            return deferred.promise
        }

        this.turnKettleOn = function () {
            
        }

        this.turnKettleOff = function () {
           
        }

    }
);
*/