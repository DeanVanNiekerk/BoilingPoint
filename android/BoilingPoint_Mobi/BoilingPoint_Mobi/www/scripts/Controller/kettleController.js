kettleApp.controller("kettleController", function ($scope, kettleservice) {

    $scope.statusTemp = 0;
    $scope.errorResult = '';

    var service = kettleservice;

    //Fetch current status from kettle service
    $scope.getKettleStatus = function () {
        debugger;
        //var data = {
        //    Type: '2',
        //    Data: {
        //        On: 'true',
        //        Temp: '35',
        //        Level: '50%'
        //    }
        //};
        //var result = new StatusModel(data);
        //$scope.statusTemp = result.data.temp;

        service.getKettleStatus().then(
            //Success callback
            function (response) {
                var result = new StatusModel(response.data);
                $scope.statusTemp = result.data.temp;
                $scope.errorResult = '';
            },
            //Fail callback
            function (response) {

                if (response.status == 503) {
                    $scope.errorResult = "No kettle connected.";
                    return;
                }

                $scope.errorResult = "Error Getting Status. "
                $scope.errorResult += "Status Code: " + response.status;
            });
    };

});