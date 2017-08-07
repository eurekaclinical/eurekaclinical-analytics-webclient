(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeMultiDropZone', TreeMultiDropZone);

    function TreeMultiDropZone() {
        return {
            require: ['?ngModel', '^form'],
            restrict: 'AE',
            transclude: true,
            link: function link(scope, elem, attrs, ngModel) {
                if (!attrs.isRequired) {
                    return;
                }
                if (attrs.isRequired) {
                    let myForm = ngModel[1];
                    let currentDropArea = angular.element(elem.children()[1]);
                    let labelDropArea = angular.element(elem.parent()[0].children[0]);

                    scope.$watch(function(myValue) {
                        if (myValue.vm.bindModel.length > 0) {
                            myValue.vm.isDropZonevalid = 'True';
                            labelDropArea.removeClass('trigger-validation-text');
                            currentDropArea.removeClass('trigger-validation');
                        } else if (myValue.vm.bindModel.length === 0 && myForm.submitted) {
                            myValue.vm.isDropZonevalid = '';
                            labelDropArea.addClass('trigger-validation-text');
                            currentDropArea.addClass('trigger-validation');
                        } else if (myValue.vm.bindModel.length === 0 && !myForm.submitted){
                            myValue.vm.isDropZonevalid = '';
                        }
                    });
                }
            },
            scope: {
                bindModel: '=ngModel',
                keys: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@',
                dropZoneIndex:'@?',
                isRequired:'@?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-multi-drop-zone/tree-multi-drop-zone.html',
            controller: 'TreeMultiDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());