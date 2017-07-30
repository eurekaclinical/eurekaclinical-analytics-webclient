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
                    if (myValue.vm.bindModel.length > 0) {

                        myValue.vm.isDropZonevalid = 'True';
                        $('#tree-container').removeClass('trigger-validation');
                    } else if (myValue.vm.bindModel.length === 0 && myForm.submitted) {
                        myValue.vm.isDropZonevalid = '';
                        $('#tree-container').addClass('trigger-validation');

                    } else if (myValue.vm.bindModel.length === 0 && myForm.submitted){
                         myValue.vm.isDropZonevalid = '';
                    }
                });
            },
            scope: {
                bindModel: '=ngModel',
                formName:'@?',
                items: '=',
                keys: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@',
                dropZoneIndex:'@?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-multi-drop-zone/tree-multi-drop-zone.html',
            controller: 'TreeMultiDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());