/* Controller to handle issues */

var app = angular.module('Lab4App', []);

app.controller('issuesCtrl', function ($scope, $http) { // Controller


// Handle sort orders //////////////////////////

    $scope.orderByMe = function (issues) { // Sort list after the clicked category
        $scope.myOrderBy = issues;
    }

    $scope.toggleOrder = function () { // Toggle ascending/descending by toggle click, orderVarable changes between false and true
        $scope.orderVariable = !$scope.orderVariable
    }

// Get all issues for read //////////////////////

function getIssues() {
$http.get("/api/issues")
.success(function (response) {
    console.log(response);
    $scope.issuescope = response;
})
};

getIssues();


 
// Add issue ////////////////////////////////////

    $scope.addIssue = function (description) { // click event
        var data = { description: description }; // fetch what to add
        console.log(description)
 if(description == undefined ){ // Don't save if no description
    $scope.msg = "Ärendebeskrivning saknas.";
    
 } else {
        //Call the services
        $http.post('/api/issues/add', JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Ärende tillagt!";
                // Read list again
                getIssues();
                

        }, function (response) {
            $scope.msg = "Sparningen misslyckades.";
            
        });
    }

    };


// Change status of issue ///////////////////////

    $scope.checkIssue = function (id, status) { // click event
        var data = { // data to send
            status: status
        }
        console.log(data);
        $http.put('/api/issues/edit/' + id, JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Status uppdaterad!";

        }, function (response) {
            $scope.msg = "Uppdateringen misslyckades.";
        });
    };


 // Delete issue by id /////////////////////////
    $scope.remove = function (id) {
        console.log(id)
        $http.delete('api/issues/delete/' + id).success(function (response) {
        })
        // Read list again
        getIssues();
    }

});    // End controller