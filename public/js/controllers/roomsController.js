/* Controller to handle rooms */

var app = angular.module('roomsApp', []);

app.controller('roomsCtrl', function ($scope, $http) { // Controller


// Handle sort orders //////////////////////////

    $scope.orderByMe = function (rooms) { // Sort list after the clicked category
        $scope.myOrderBy = rooms;
    }

    $scope.toggleOrder = function () { // Toggle ascending/descending by toggle click, orderVarable changes between false and true
        $scope.orderVariable = !$scope.orderVariable
    }

// Get all rooms for read //////////////////////

function getRooms() {
$http.get("/api/rooms")
.success(function (response) {
    console.log(response);
    $scope.roomscope = response;
})
};

getRooms();


 
// Add room ////////////////////////////////////

    $scope.addRoom = function (description, coordinates) { // click event
        var data = { description: description, 
                    coordinates: coordinates }; // fetch what to add
      
        console.log(data);
 if(description == undefined ){ // Don't save if no description
    $scope.msg = "Rumsbeskrivning saknas.";
    
 } else {
        //Call the services
        $http.post('/api/rooms/add', JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Rum tillagt!";
                // Read list again
                getRooms();
                

        }, function (response) {
            $scope.msg = "Sparningen misslyckades.";
            
        });
    }

    };


// Change status of room ///////////////////////

    $scope.bookRoom = function (id, status) { // click event
        var data = { // data to send
            status: status
        }
        console.log(data);
        $http.put('/api/rooms/book/' + id, JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Rum bokat!";

        }, function (response) {
            $scope.msg = "Bokningen misslyckades.";
        });
    };


 // Delete room by id /////////////////////////
    $scope.remove = function (id) {
        console.log(id)
        $http.delete('api/rooms/delete/' + id).success(function (response) {
        })
        // Read list again
        getRooms();
    }

});    // End controller