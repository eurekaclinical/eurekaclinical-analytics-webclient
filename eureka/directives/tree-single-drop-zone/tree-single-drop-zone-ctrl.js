(function () {
	'use strict';

	angular
			.module('eureka')
			.controller('TreeSingleDropZoneCtrl', TreeSingleDropZoneCtrl)
			.controller('TreeSingleDropZoneDeleteModalCtrl', DeleteModalCtrl)
			.controller('TreeSetModalCtrl', SetModalCtrl);

	TreeSingleDropZoneCtrl.$inject = ['$scope', 'PhenotypeService', 'TreeService', '$uibModal'];
	DeleteModalCtrl.$inject = ['$uibModalInstance', 'displayName'];
	SetModalCtrl.$inject = ['$uibModalInstance'];

	function TreeSingleDropZoneCtrl($scope, PhenotypeService, TreeService, $uibModal) {
		let vm = this;
		//This dropZoneValid is for the hidden input field.  If there are items the dropZoneValid has text, which makes the hidden input field valid.
		vm.isDropZonevalid = '';
		vm.set = function () {
			$uibModal.open({
				templateUrl: 'setItemModal.html',
				controller: 'TreeSetModalCtrl',
				controllerAs: 'mo'
			}).result.then(
					function (selectedItem) {
						if (selectedItem !== null && (!vm.bindModel || selectedItem.key !== vm.bindModel.key)) {
							vm.bindModel = {
								name: selectedItem.key,
								displayName: selectedItem.displayName,
								type: selectedItem.type
							};
						}
					},
					function () {
					}
			);
		};

		vm.remove = function (itemToRemove) {
			$uibModal.open({
				templateUrl: vm.deleteModalTemplateUrl,
				controller: 'TreeSingleDropZoneDeleteModalCtrl',
				controllerAs: 'mo',
				resolve: {
					displayName: function () {
						return itemToRemove.displayName;
					}
				}
			}).result.then(
					function () {
						vm.bindModel = null;
						vm.key = null;
					},
					function (arg) {
					}
			);
		};

		vm.populate = function () {
			if (vm.key) {
				let phenotypeKey = null;
				let conceptKey = null;
				if (vm.key.startsWith('USER:')) {
					phenotypeKey = vm.key;
				} else {
					conceptKey = vm.key;
				}
				vm.bindModel = null;
				if (conceptKey !== null) {
					TreeService.getTreeNode(conceptKey).then(function (concept) {
						vm.bindModel = {
							name: conceptKey,
							displayName: concept.displayName,
							type: concept.type
						};
						if (concept.type === 'SYSTEM') {
							vm.bindModel.systemType = concept.systemType;
						}
					}, function (msg) {
						vm.bindModel = {
							name: conceptKey,
							displayName: conceptKey
						};
						vm.displayError({message: 'Unknown concept ' + conceptKey});
					});
				} else if (phenotypeKey !== null) {
					PhenotypeService.getPhenotype(phenotypeKey).then(function (phenotype) {
						vm.bindModel = {
							name: phenotype.key,
							displayName: phenotype.displayName,
							type: phenotype.type
						};
					}, function (msg) {
						vm.bindModel = {
							name: phenotypeKey,
							displayName: phenotypeKey
						};
						vm.displayError({message: 'Unknown phenotype ' + phenotypeKey});
					});
				}
			}
		};

		$scope.$watch(function () {
			return vm.key;
		}, function (newValue, oldValue) {
			vm.populate();
		}, true);
	}

	function DeleteModalCtrl($uibModalInstance, displayName) {
		var mo = this;
		mo.displayName = displayName;
		mo.ok = function () {
			$uibModalInstance.close();
		};

		mo.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	}

	function SetModalCtrl($uibModalInstance) {
		var mo = this;
		mo.itemsToAdd = [];
		mo.ok = function () {
			$uibModalInstance.close(mo.itemsToAdd !== null ? mo.itemsToAdd[0] : null);
		};
		mo.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
}());