(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('sourceConfigPrompts', SourceConfigPrompts);

    function SourceConfigPrompts($timeout) {
        return {
            restrict: 'AE',
            require: ['?ngModel', '^form'],
            link: function link(scope, elem, attrs, ngModel) {
                let fileSpace;
                let fileHeader;
                let myForm = ngModel[1];
                
                $timeout( function(){
                    // Had to use timeout to make sure DOM is loaded
                    fileSpace = angular.element('div.drop')[0]; // Get element to highlight file border when validation is false
                    fileHeader = angular.element('div.drop')[0].parentElement.parentElement.getElementsByTagName('label')[0];// Get element to highlight file header when validation is false
                }, 1000 );

                scope.$watch(function(myValue) {
                    if(myValue.vm.bindModel) {
                        if (myValue.vm.bindModel.length > 0) {
                            myValue.vm.inputField = 'True';
                            fileSpace.classList.remove('trigger-validation');
                            fileHeader.classList.remove('trigger-validation-text');
                        } else if (myValue.vm.bindModel.length === 0 && myForm.submitted) {
                            myValue.vm.inputField = '';
                            fileSpace.classList.add('trigger-validation');
                            fileHeader.classList.add('trigger-validation-text');
                        } else if (myValue.vm.bindModel.length === 0 && !myForm.submitted){
                            myValue.vm.inputField = '';
                        }   
                    }
                });
            },
            scope: {
                bindModel: '=ngModel',
                sourceConfig: '=',
				prompts: '=',
				fileUploadError: '&?',
				fileUploadSuccess: '&?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/source-config-prompts/source-config-prompts.html',
            controller: 'SourceConfigPromptsCtrl',
            controllerAs: 'vm'
        };
    }
}());