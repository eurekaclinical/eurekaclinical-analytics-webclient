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

                scope.$watch(function(myValue) {
                    if (myValue.vm.bindModel) {
                        myValue.vm.isDropZonevalid = 'True';
                        $('.tree-drop').removeClass('trigger-validation');
                    } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && myForm.submitted) {
                        myValue.vm.isDropZonevalid = '';
                        $('.tree-drop').addClass('trigger-validation');
                    } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && !myForm.submitted) {
                        myValue.vm.isDropZonevalid = '';
                    }
                });
            },
            scope: {
                item: '=',
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