kettleApp.controller("kettleController", function ($scope, kettleservice, $interval) {

    $scope.status = new StatusModel(null);
    $scope.errorResult = '';
    $scope.jsonPretty = '';
    $scope.tempColor = 'color-cold';
    $scope.tempHeight = 0;
    $scope.waterHeight = 0;

    var service = kettleservice;

    //Fetch current status from kettle service
    $scope.getKettleStatus = function () {

        //var data = JSON.parse('{ "Type": "2", "Data": { "On": "true", "Temp": "35", "Level": "50%" } }');

        service.getKettleStatus().then( 
            //Success callback
            function (response) {
                $scope.status = new StatusModel(response.data);
                

                if ($scope.status.data.temp > 70)
                    $scope.tempColor = 'mercury color-hot';
                else if ($scope.status.data.temp > 45)
                    $scope.tempColor = 'mercury color-mild';
                else
                    $scope.tempColor = 'mercury color-cold';

                //level / (kettle height - 2xpadding)  * 100
                $scope.tempHeight = parseInt($scope.status.data.temp / (120 - 20) * 100);

                $scope.waterHeight = parseInt($scope.status.data.level / (120 - 20) * 100);

                //cards
                $scope.jsonPretty = JSON.stringify(response.data, null, '\t');
                $scope.errorResult = '';
            },
            //Fail callback
            function (response) {
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
        if ($scope.status.data.onBool) {
            $scope.turnKettleOn();
        } else {
            $scope.turnKettleOff();
        };
    };

    $scope.turnKettleOn = function () {
        $scope.errorResult = 'on clicked';
        service.turnKettleOn();
    };

    $scope.turnKettleOff = function () {
        $scope.errorResult = 'off clicked';
        service.turnKettleOff();
    };

    $interval($scope.getKettleStatus, 1000);
});