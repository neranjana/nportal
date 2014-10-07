/* App Module */

var app = angular.module('nPortal', []);

app.controller('portalConroller', [ '$scope', '$rootScope',
		function(scope, rootScope) {
			scope.myName = 'Neranjana';
			console.log("inside controller");

		} ]);

app.directive('helloWorld', function() {
	console.log('inside directive');
	return {
		restrict : 'AE',
		replace : 'true',
		template : '<h3>Hello World!!</h3>'
	};
});

app.directive('vuCollapsiblePanel', ['$compile', '$rootScope', function(compile, rootScope) {
	
	return {
		restrict : 'A',
		scope : {

		},
		link: function (scope, element, attrs) {
			console.log("element is " + element);
			console.log("html is " + element.context.innerHTML);
			var originalElement = element.context.innerHTML;
			var anchorClass = '';
			var bodyClass = 'in';
			var elementId = attrs.id;
			console.log("Id is " + elementId);
			var collapsibleAttrValue = attrs.vuCollapsiblePanel;
			
			
			var setCollapsed = function() {
				
				anchorClass = 'collapsed';
				bodyClass = 'out';
			};
			
			var setExpanded = function() {
				
				anchorClass = '';
				bodyClass = 'in';
			};

			
			scope.toggleCollapseState = function () {

				if (rootScope.viewModel[elementId].collapsedState == "expanded") {
					rootScope.viewModel[elementId].collapsedState = "collapsed";
				} else {
					rootScope.viewModel[elementId].collapsedState = "expanded";
				}
			};
			
			collapsibleAttrValue == 'collapsed'
			
			
			var newElement = '<div class="panel-group" id="' + attrs.id + '-accordion">'
					+ '<div class="panel panel-default">'
					+ '<div class="panel-heading">'
					+ '<h4 class="panel-title">'
					+ '<a data-toggle="collapse" data-parent="#' + attrs.id + '-accordion" href="" data-target="#' + attrs.id + '"'
					+ 'class="' + anchorClass + ' section group"'
					+ 'ng-click="toggleCollapseState();">' 
					+ '<div class="expand-icon-blue col span_1_of_2 h-pad-2x left"/>' 
					+ '<span>' + attrs.title + '</span></a>'
					+ '</h4>'
					+ '</div>'
					+ '<div id="' + attrs.id + '" class="panel-collapse collapse ' + bodyClass + '">' + originalElement + ' </div>'
					+ '</div>' + '</div>';
			element.replaceWith(compile(newElement)(scope));
			
		},	
	};
}]);