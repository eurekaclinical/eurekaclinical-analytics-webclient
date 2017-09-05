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
                        if(myValue.vm.isMultiDropzoneDirty === true){
                            if(myValue.vm.dropZoneIndex){
                                myForm["dropZoneMulti_"+myValue.vm.dropZoneIndex].$setDirty()
                            } else {
                                myForm["dropZoneMulti_"].$setDirty()
                            } 
                        }
                        if (myValue.vm.bindModel.length > 0) {
                            myValue.vm.isDropZonevalid = 'True';
                            labelDropArea.removeClass('has-error');
                            currentDropArea.removeClass('has-error');
                        } else if (myValue.vm.bindModel.length === 0 && myForm.submitted) {
                            myValue.vm.isDropZonevalid = '';
                            labelDropArea.addClass('has-error');
                            currentDropArea.addClass('has-error');
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
                isRequired:'@?' //If isRequired not added validation will be disabled
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/tree-multi-drop-zone/tree-multi-drop-zone.html',
            controller: 'TreeMultiDropZoneCtrl',
            controllerAs: 'vm'
        };
    }
}());