(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeMultiDropZone', TreeMultiDropZone);

    function TreeMultiDropZone() {
        return {
            require: 'ngModel',
            restrict: 'AE',
            link: function(scope, element, attr, ngModel) {
                // lets go ahead and set dropzone to empty for no initial submits
                ngModel.$setValidity('treeMultiDropZone', false);

                function updateDropZone(scope, element) {
                    if (scope.vm.items !== undefined) {
                        if (scope.vm.items.length > 0) {
                            ngModel.$setValidity('treeMultiDropZone', true);
                            console.log('Form is valid');
                        } else if (scope.vm.items.length === 0 && ngModel.$$parentForm.submitted) {
                            // we will show the validation error message here because for has been submitted
                            ngModel.$setValidity('treeMultiDropZone', false);
                            console.log('Form has been submitted, but is not valid');
                        } else {
                            // we will leave this open for now
                        }
                    }
                }
                setInterval(function() { updateDropZone(scope, element); }, 1000);
            },
            scope: {
                items: '=',
                keys: '=?',
                submit: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-multi-drop-zone/tree-multi-drop-zone.html',
            controller: 'TreeMultiDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());