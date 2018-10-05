angular.module('App', ['ngSanitize','ui.bootstrap','ngFileUpload']).controller('LoginCtrl',function ($scope,$http) {
	
	
	M.AutoInit();
	
	$scope.showHidePassword = function()
  {
		var passwordfield = document.getElementById('password');
		if (passwordfield.type === "password") {
			passwordfield.type = "text";
		}
		else {
			passwordfield.type = "password";
		}
		if(document.getElementById('confpassword'))
		{
		var passwordfield1 = document.getElementById('confpassword');
		if (passwordfield1.type === "password") {
			passwordfield1.type = "text";
		}
		else {
			passwordfield1.type = "password";
		}
		}
		
  };
	
	
});