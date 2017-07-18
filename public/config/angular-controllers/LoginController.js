app.controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
    var vm = this;
    vm.login = function () {
        var user = {
            username: vm.username,
            password: vm.password
        };
        if (!vm.username || !vm.password) {
            vm.error = 'Username and Password should not be empty';
        }
        $http.post('/api/users/login', user).then(function (response) {
            if (response.data.success) {
                $window.sessionStorage.token = response.data.token;
                AuthFactory.isLoggedIn = true;
                var token = $window.sessionStorage.token;
                var decodedToken = jwtHelper.decodeToken(token);
                $window.sessionStorage.role = decodedToken.role;
                $location.path('/');
            }
            else {
                vm.error = response.data.message;
                vm.password=''
            }
        }).catch(function (error) {
            vm.error = error.data.message;
        })
    }
}