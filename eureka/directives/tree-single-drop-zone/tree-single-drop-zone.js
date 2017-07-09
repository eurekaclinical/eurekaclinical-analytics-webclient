(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeSingleDropZone', TreeSingleDropZone);

    function TreeSingleDropZone() {
        return {
            restrict: 'AE',
            scope: {
                item: '=',
                key: '=?',
                enableValidation: '@?',
                triggerValidation: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-single-drop-zone/tree-single-drop-zone.html',
            controller: 'TreeSingleDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());