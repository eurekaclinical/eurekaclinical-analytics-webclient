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

        return {
            getUser: getCurrentUser,
            getRole: getRole
        };

        function getRole(roleId) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/roles/' + roleId).then(handleSuccess, handleError);
	    }, handleError);
        }

        function getCurrentUser() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/users/me')
		    .then(handleSuccess, handleError)
		    .then(function(userInfo) {
			return $q.all(_.map(userInfo.roles, getRole)).then(function(roles) {
			    userInfo.roles = roles;
			    return new User(userInfo);
			}, handleError);
		    }, handleError);
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
