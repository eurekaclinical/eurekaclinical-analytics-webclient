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
                //If isrequired null validation will be enabled
                if (!attrs.isRequired) {
                    return;
                }
                //If isrequired validation will be enabled
                if (attrs.isRequired) {
                    let myForm = ngModel[1];
                    let currentDropArea = angular.element(elem.children()[1]); //Get current drop area to highlight for validation
                    let labelDropArea = angular.element(elem.parent()[0]); //Get label above drop are to highlight for validation

                    scope.$watch(function(myValue) {
                        if (myValue.vm.bindModel) {
                            myValue.vm.isDropZonevalid = 'True';
                            labelDropArea.removeClass('has-error');
                            currentDropArea.removeClass('has-error');
                        } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && myForm.submitted) {
                            myValue.vm.isDropZonevalid = '';
                            labelDropArea.addClass('has-error');
                            currentDropArea.addClass('has-error');
                        } else if ((myValue.vm.bindModel === null || myValue.vm.bindModel === undefined) && !myForm.submitted) {
                            myValue.vm.isDropZonevalid = '';
                        }
                    });
                }
            },
            scope: {
                key: '=?',
                displayError: '&',
                deleteModalTemplateUrl: '@',
                bindModel: '=ngModel', //Directive should have ng-model attached will make optional
                dropZoneIndex:'@?',  //Directive will need index for cases where there are multiple zones on page: sequence and threshold
                isRequired:'@' //If isRequired not added validation will be disabled
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-single-drop-zone/tree-single-drop-zone.html',
            controller: 'TreeSingleDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());