(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeMultiDropZone', TreeMultiDropZone);

    function TreeMultiDropZone() {
        return {
            require: ['^form', 'ngModel'],
            restrict: 'AE',
            link: function(scope, element, attr, ctrls) {
                let myForm = $("#categorizationForm"); // easy way to get form to user listener
                scope.form = ctrls[0]; // require both form and ngmodel, may only need ngmodel.  Will remove if I do not need both.
                let ngModel = ctrls[1]; // read above

                myForm.on("submit", function(event) {
                    if (scope.vm.items.length > 0) {
                        console.log('drop zone is valid');
                        scope.$parent.categorizationForm.definition.$setValidity('definition', true);
                        $('#tree-container').removeClass('trigger-validation'); 
                        $('#error-label').addClass('hide-item'); // remove validation classes, will use bootstrap eventually
                        scope.$parent.editPhenotype.save();  // calling the save function of the controller.  Will need to make this dynamic and not hard coded
                    } else if (scope.vm.items.length === 0 && ngModel.$$parentForm.submitted) {
                         event.preventDefault();
                        $('#tree-container').addClass('trigger-validation');
                        $('#error-label').removeClass('hide-item');  // remove validation classes, will use bootstrap eventually
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