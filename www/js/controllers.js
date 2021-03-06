angular.module('app.controllers', [])
  
.controller('accountCtrl', function($scope, I4MIMidataService) {
	
	$scope.user = {
		server: 'https://test.midata.coop:9000'
	}
	
	$scope.loggedIn = I4MIMidataService.loggedIn();
	
	$scope.showModalLogin = function() {
			I4MIMidataService.login();
	}
})
   
.controller('formCtrl', function($scope, I4MIMidataService) {

	$scope.entry = {};

	$scope.entryFields = [
		{
			key: 'weight',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Weight [kg]',
				placeholder: 200
			}
		},
		{
			key: 'steps',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Steps',
				placeholder: 10000
			}
		}
	]
	
	$scope.fhirGroup = {
		name: "Gruppe",
		format: "fhir/Observation",
		subformat: "String",
		content: "http://loinc.org 61150-9",
		data: {
			"resourceType": "Observation",
			"status": "preliminary",
			"category": {
				"coding": [
					{
						"system": "http://hl7.org/fhir/ValueSet/observation-category",
		    			"code": "survey",
				    	"display": "Survey"
		       		}
				]
			},
			"code": {
				"coding": [
					{
						"system": "http://loinc.org",
		    			"code": "61150-9",
				    	"display": "Subjective Narrative"
		       		}
				]
			},
			$set: "valueString"
		}
	}
	
	$scope.fhir = {
		weight: {
			name: "Gewicht",
			format: "fhir/Observation",
			subformat: "Quantity",
			content: "http://loinc.org 3141-9",
			data: {
				"resourceType": "Observation",
				"status": "preliminary",
				"category": {
					"coding": [
						{
							"system": "http://hl7.org/fhir/ValueSet/observation-category",
			    			"code": "vital-signs",
					    	"display": "Vital Signs"
			       		}
					]
				},
				"code": {
					"coding": [
						{
							"system": "http://loinc.org",
			    			"code": "3141-9",
					    	"display": "Body weight Measured"
			       		}
					]
				},
				"valueQuantity":  {
					"unit": "kg",
					"system": "http://unitsofmeasure.org",
					"code": "kg"
				},
				$set: "valueQuantity.value"
			}
		},
		steps: {
			name: "Schritte",
			format: "fhir/Observation",
			subformat: "Quantity",
			content: "http://loing.org 55423-8",
			data: {
				"resourceType": "Observation",
				"status": "preliminary",
				"category": {
					"coding": [
						{
							"system": "http://hl7.org/fhir/ValueSet/observation-category",
							"code": "vital-signs",
							"display": "Vital Signs"
						}
					]
				},
				"code": {
					"coding": [
						{
							"system": "http://loinc.org",
			    			"code": "55423-8",
					    	"display": "Number of steps in unspecified time Pedometer"
			       		}
					]
				},
				"valueQuantity":  {
					"unit": "steps",
					"system": "http://midata.coop",
					"code": "steps"
				},
				$set: "valueQuantity.value"
			}
		}
	}
	
	$scope.showEntryModal = function() {
		I4MIMidataService.newEntry($scope.entry, $scope.entryFields, $scope.fhir, {/* options */});
	}
})
   
.controller('chartCtrl', function($scope, I4MIMidataService) {
	
	$scope.openCharts = function() {
		if ( navigator && navigator.app ) {
			navigator.app.loadUrl('http://krispo.github.io/angular-nvd3', { openExternal:true });
			console.log('http://krispo.github.io/angular-nvd3');
		} else {
			window.open('http://krispo.github.io/angular-nvd3','_system');
		}
	}
	
	I4MIMidataService.search().then(function(response){
		$scope.records = response.data;
	},function(reason){
		
	});
})

.controller('listCtrl', function($scope, I4MIMidataService) {
	
	I4MIMidataService.search().then(function(response){
		$scope.records = response.data;
	},function(reason) {
		
	});
})
    