(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('treeMultiDropZone', TreeMultiDropZone);

    function TreeMultiDropZone() {
        return {
            require: 'ngModel',
            restrict: 'AE',
            link: function(scope, element, attr, ctrls) {
                let myForm = $("#categorizationForm"); // easy way to get form to user listener
                myForm.on("submit", function(event) {
                    if (scope.vm.items.length > 0) {
                        console.log('drop zone is valid');
                        $('#tree-container').removeClass('trigger-validation'); 
                        $('#error-label').addClass('hide-item'); // remove validation classes, will use bootstrap eventually
                        scope.$parent.editPhenotype.save();  // calling the save function of the controller.  Will need to make this dynamic and not hard coded
                    } else if (scope.vm.items.length === 0 && scope.$parent.categorizationForm.submitted === true) {
                        $('#tree-container').addClass('trigger-validation');
                        $('#error-label').removeClass('hide-item');  // remove validation classes, will use bootstrap eventually
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