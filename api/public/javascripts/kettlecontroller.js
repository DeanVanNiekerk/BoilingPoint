


app.controller('kettlecontroller', function ($scope, kettleservice) {
	
	var service = kettleservice;
	
	$scope.kettleStatus = '';
    $scope.kettleOn = false;
    $scope.kettleTemp = '0';
    $scope.kettleTempState = 'primary';
    $scope.kettleLevel = '0';
    $scope.kettleConnected = false;
	
	$scope.updateKettleStatus = function() {
		
		service.getKettleStatus().then(
            //Success callback
            function (response) {
                  
                var data = response.data.Data;
                
                $scope.kettleStatus = JSON.stringify(data);
                $scope.kettleOn = (data.On.toLowerCase() == "true");
                $scope.kettleTemp = data.Temp;
                $scope.kettleLevel = data.Level;
                
                var temp = parseInt($scope.kettleTemp);
                if(temp > 70)
                    $scope.kettleTempState = 'danger';
                else if(temp > 30)
                    $scope.kettleTempState = 'warning';
                else 
                    $scope.kettleTempState = 'primary';
                
                $scope.kettleConnected = true;
                  
            },
            //Fail callback
            function (response) {
                  
                if(response.status == 503) {
                    $scope.kettleConnected = false;
                    $scope.kettleStatus = "No kettle connected.";
                    return;
                }
                
                $scope.kettleStatus = "Error Getting Status. "
                $scope.kettleStatus += "Status Code: " + response.status;
          });
	};
	
	$scope.turnKettleOn = function() {
		
		service.turnKettleOn().then(
            //Success callback
            function (response) { },
            //Fail callback
            function (response) {
                  
                  if(response.status == 503)
                        return;
                  
                  var error = "Error turning kettle on. "
                  error += "Status Code: " + response.status;
                  alert(error);
                  console.log(response);
          });
	};
      
      $scope.turnKettleOff = function() {
		
		service.turnKettleOff().then(
            //Success callback
            function (response) { },
            //Fail callback
            function (response) {
                  
                  if(response.status == 503)
                        return;
                        
                  var error = "Error turning kettle off. "
                  error += "Status Code: " + response.status;
                  alert(error);
                  console.log(response);
          });
	};
      
    //$scope.updateKettleStatus();
    setInterval($scope.updateKettleStatus, 2000);
			  
});