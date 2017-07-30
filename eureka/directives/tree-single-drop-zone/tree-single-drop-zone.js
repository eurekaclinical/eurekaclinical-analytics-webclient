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
                var myForm = ngModel[1];
                var theForm = attrs.formName
                    // Watch our internal model and change the external model
                scope.$watch(function(myValue) {
                    // console.log("Internal change: " + scope.imessage);
                    // ngModelCtrl.$setViewValue(scope.imessage);
                    console.log(myValue.vm.bindModel);
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
                bindModel: '=ngModel',
                dropZoneIndex:'@?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-single-drop-zone/tree-single-drop-zone.html',
            controller: 'TreeSingleDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());