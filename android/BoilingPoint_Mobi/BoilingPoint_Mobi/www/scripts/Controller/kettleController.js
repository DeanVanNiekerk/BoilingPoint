kettleApp.controller("kettleController", function ($scope, kettleservice) {

    $scope.status = new StatusModel(null);
    $scope.errorResult = '';

    var service = kettleservice;

    
    //Fetch current status from kettle service
    $scope.getKettleStatus = function () {
        
        var data = JSON.parse('{ "Type": "2", "Data": { "On": "true", "Temp": "35", "Level": "50%" } }');

        $scope.status = new StatusModel(data);
        $scope.errorResult = '';

        //service.getKettleStatus().then(
        //    //Success callback
        //    function (response) {
        //        var json = JSON.parse(response.data);
        //        $scope.status = new StatusModel(json);
        //        $scope.errorResult = '';
        //    },
        //    //Fail callback
        //    function (response) {

        //        if (response.status == 503) {
        //            $scope.status = new StatusModel(null);
        //            $scope.errorResult = "No kettle connected.";
        //            return;
        //        }

        //        $scope.errorResult = "Error Getting Status. "
        //        $scope.errorResult += "Status Code: " + response.status;
        //    });
    };

    $scope.toggleOnOff = function () {

        if ($('#toggleOnButton').hasClass('active')) {
            $scope.turnKettleOff();
        }
        else {
            $scope.turnKettleOn();
        };
    };

    $scope.turnKettleOn = function () {
        $scope.errorResult = 'on clicked';
    };
    $scope.turnKettleOff = function () {
        $scope.errorResult = 'off clicked';
    };

    setInterval($scope.getKettleStatus(), 5000); // Time in milliseconds
});