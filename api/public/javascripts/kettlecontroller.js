


app.controller('kettlecontroller', function ($scope, kettleservice) {
	
	var service = kettleservice;
	
	$scope.kettleStatus = '';
	
	$scope.updateKettleStatus = function() {
		
		service.getKettleStatus().then(
            //Success callback
            function (response) {
                  $scope.kettleStatus = response.data;
            },
            //Fail callback
            function (response) {
                  
                  if(response.status == 503) {
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
      
      setInterval($scope.updateKettleStatus(), 2000);
			  
});