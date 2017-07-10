(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeMultiDropZone', TreeMultiDropZone);

    function TreeMultiDropZone() {
        return {
            restrict: 'AE',
            scope: {
                items: '=',
                keys: '=?',
                triggerValidation: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@',
                enableValidation: '@?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-multi-drop-zone/tree-multi-drop-zone.html',
            controller: 'TreeMultiDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());