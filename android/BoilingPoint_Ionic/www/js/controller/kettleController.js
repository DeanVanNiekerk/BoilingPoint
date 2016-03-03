kettleApp.controller("kettleController", function ($scope, kettleservice) {

    $scope.status = new StatusModel(null);
    $scope.errorResult = '';

    var service = kettleservice;
    //var service = fakekettleservice

    //Fetch current status from kettle service
    $scope.getKettleStatus = function () {

        //var data = JSON.parse('{ "Type": "2", "Data": { "On": "true", "Temp": "35", "Level": "50%" } }');

        //$scope.status = new StatusModel(data);
        //$scope.errorResult = '';
        service.getKettleStatus().then(
            //Success callback
            function (response) {
                debugger;
                //var json = JSON.parse(response.data);
                $scope.status = new StatusModel(response.data);
                $scope.errorResult = '';
                debugger;
                //debug
                var jsonPretty = JSON.stringify(response.data, null, '\t');
                angular.element(document.getElementById('debug')).text(jsonPretty);
            },
            //Fail callback
            function (response) {
                debugger;
                if (response.status == 503) {
                    $scope.status = new StatusModel(null);
                    $scope.errorResult = "No kettle connected.";
                    return;
                }

                $scope.errorResult = "Error Getting Status. "
                $scope.errorResult += "Status Code: " + response.status;
            });
    };

    $scope.toggleOnOff = function () {

        if  (angular.element(document.getElementById('toggleOnButton')).hasClass('active')) {
            $scope.turnKettleOff();
        }
        else {
            $scope.turnKettleOn();
        };
    };

    $scope.turnKettleOn = function () {
        $scope.errorResult = 'on clicked';
        //service.turnKettleOn()
    };
    $scope.turnKettleOff = function () {
        $scope.errorResult = 'off clicked';
        //service.turnKettleOff
    };

    setInterval($scope.getKettleStatus(), 5000); // Time in milliseconds
});