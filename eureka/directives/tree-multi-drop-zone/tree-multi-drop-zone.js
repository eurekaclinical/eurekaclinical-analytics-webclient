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
                let myForm = $("#categorizationForm");

                scope.on("submit", function(event) {
                    event.preventDefault();

                    if (scope.vm.items.length > 0) {
                        console.log('drop zone is valid');
                        $('#tree-container').removeClass('trigger-validation');
                        $('#error-label').addClass('hide-item');

                        scope.$apply(function() {
                            scope.$parent.categorizationForm.$valid = true;
                            scope.$parent.categorizationForm.$submitted = true;
                            scope.$parent.categorizationForm.definition.$setValidity('definition', true);
                            scope.$parent.categorizationForm.definition.$setDirty(false);
                            scope.$eval(element.context.parentElement.parentNode.attributes["angular-validator-submit"].value);
                        });

                    } else if (scope.vm.items.length === 0 && ngModel.$$parentForm.submitted) {

                        scope.$apply(function() {
                            scope.$parent.categorizationForm.$valid = false;
                            scope.$parent.categorizationForm.$submitted = false;
                            scope.$parent.categorizationForm.definition.$setValidity('definition', false);
                            scope.$parent.categorizationForm.definition.$setDirty(true);
                        });
                        $('#tree-container').addClass('trigger-validation');
                        $('#error-label').removeClass('hide-item');

                        console.log('Form has been submitted, but is not valid');
                    }
                })

            },
            scope: {
                items: '=',
                keys: '=?',
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