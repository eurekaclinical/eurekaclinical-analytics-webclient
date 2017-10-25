(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name eureka.UserService
     * @description
     * This is the user service.
     * @requires $http
     * @requires $q
     * @requires eureka.ProxyService
     */

    angular
        .module('eureka')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', 'ProxyService'];
    
    class User {
        constructor(info) {
            this.info = info;
        }

        hasRole(name) {
            let { roles } = this.info;
            return roles.some(role => role.name === name);
        }

        getDisplayName() {
            let { fullName, firstName, lastName, username } = this.info;
            if (fullName) {
                return fullName;
            } else if (firstName || lastName) {
                return [firstName, lastName]
                    .filter(function (val) {return val && val.length > 0 ? val : undefined;})
                    .join(' ');
            }else{
                return username;
            }
        }
    }

    function UserService($http, $q, ProxyService) {

        var dataEndpoint = ProxyService.getDataEndpoint();

        return {
            getUser: getCurrentUser,
            getRole: getRole
        };

        function getRole(roleId) {
            return $http.get(dataEndpoint+'/roles/' + roleId).then(function(res) {
                return res.data;
            }, handleError);
        }

        function getCurrentUser() {
            return $http.get(dataEndpoint+'/users/me')
		.then(function(res) {
		    let userInfo = res.data;
		    if (!userInfo) {
			return $q.when(null);
			
		    }
		    return $q.all(_.map(userInfo.roles, getRole)).then(function(roles) {
			userInfo.roles = roles;
			return new User(userInfo);
		    });
		}, handleError);
        }

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            if (!angular.isObject(response.data) && !response.data) {
                return ($q.reject('An unknown error occurred.'));
            }
            return ($q.reject(response.data));
        }
        
    }

}());
