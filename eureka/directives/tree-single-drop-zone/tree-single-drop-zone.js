(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeSingleDropZone', TreeSingleDropZone);

    function TreeSingleDropZone() {
        return {
            restrict: 'AE',
            require: ['?ngModel', '^form'],
            link: function link(scope, elem, attrs, ngModel) {
                if (!attrs.ngModel) {
                    return;
                }

                let myForm = ngModel[1];
                let currentDropArea = angular.element(elem.children()[1]);
                let labelDropArea = angular.element(elem.parent()[0].children[0]);

                scope.$watch(function(myValue) {
                    if (myValue.vm.bindModel) {
                        myValue.vm.isDropZonevalid = 'True';
                        labelDropArea.removeClass('trigger-validation-text');
                        currentDropArea.removeClass('trigger-validation');
                    } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && myForm.submitted) {
                        myValue.vm.isDropZonevalid = '';
                        labelDropArea.addClass('trigger-validation-text');
                        currentDropArea.addClass('trigger-validation');
                    } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && !myForm.submitted) {
                        myValue.vm.isDropZonevalid = '';
                    }
                });
            },
            scope: {
                key: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@',
                bindModel: '=ngModel', //Directive should have ng-model attached will make optional
                dropZoneIndex:'@?'  //Directive will need index for cases where there are multiple zones on page: sequence and threshold
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-single-drop-zone/tree-single-drop-zone.html',
            controller: 'TreeSingleDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());