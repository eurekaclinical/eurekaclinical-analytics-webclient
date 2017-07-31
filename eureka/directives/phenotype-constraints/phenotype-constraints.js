(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('phenotypeConstraints', PhenotypeConstraints);

    function PhenotypeConstraints() {
        return {
            restrict: 'AE',
            scope: {
				conceptOrPhenotypeKey: '=?',
                conceptOrPhenotype: '=',
				minDuration: '=',
				minDurationUnits: '=',
				maxDuration: '=',
				maxDurationUnits: '=',
				propertyName: '=',
				propertyValue: '=',
				onConceptOrPhenotypeError: '&?',
				onTimeUnitsError: '&?',
                dropIndex: '@?' //dropIndex need for views with multiple drop zones.  The name attribute for the input field has to be unique
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/phenotype-constraints/phenotype-constraints.html',
            controller: 'PhenotypeConstraintsCtrl',
            controllerAs: 'vm'
        };
    }
}());