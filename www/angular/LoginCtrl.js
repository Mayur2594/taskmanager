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
  
  
  
  
  function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

function checkPassStrength(pass) {
    var score = scorePassword(pass);
    if (score > 80)
        return "Strong";
    if (score > 60)
        return "Good";
    if (score >= 30)
        return "Weak";

    return "";
}

function ColorPassword(pass) {
    var score = scorePassword(pass);
    if (score > 80)
        return "green";
    if (score > 60)
        return "yellow";
    if (score >= 30)
        return "red";

    return "";
}

   $scope.verfiPasswordConf = function(password,confpassword)
  {
		if(confpassword)
		{
			if(confpassword != password)
			{
				$scope.passstrenth = "Password and confirm password does not match";
			}
			if(confpassword === password)
			{
				$scope.passstrenth = (checkPassStrength(password));
			}
		}
  };
  
  
  $scope.verifyPasswordStrongness = function(passkey)
  {
		if(!passkey || passkey === '')
		$scope.passwordcalc = false;
		else
		$scope.passwordcalc = true;
	
		$scope.passstrenth = (checkPassStrength(passkey));
        $scope.passscore = (scorePassword(passkey));
        $scope.prgcol = (ColorPassword(passkey));
		
		$scope.verfiPasswordConf(passkey,$scope.Confirmpassword);
		
  };
  
  $scope.Registeruser = function()
  {
	if(!$scope.usersDetails || ($scope.usersDetails.firstname =="" || !$scope.usersDetails.firstname) || ($scope.usersDetails.mobile =="" || !$scope.usersDetails.mobile)|| ($scope.usersDetails.email =="" || !$scope.usersDetails.email) || ($scope.usersDetails.password =="" || !$scope.usersDetails.password) || ($scope.usersDetails.password != $scope.Confirmpassword))
	{
		swal({
			  type: 'error',
			  title: 'Oops...',
			  text: 'Something went wrong!'
			}).then((result) => {
			 
			})
	}
	else
	{
				$http({
					method  : 'POST',
					url     : 'http://localhost:8090/api/Registeruser/',
					data    : $scope.usersDetails,
					headers : {'Content-Type': 'application/json'} 
					}).then(function(response) {
					if(response.data.status === 1)
					{
						swal({
						  type: 'error',
						  title: 'Oops...',
						  text: response.data.message
						}).then((result) => {
						 
						})
					}
					else
					{
						swal({
							  type: 'success',
							  title: 'It`s Done!',
							  text: response.data.message
							}).then((result) => {
							 location.href = "index.html";
							})
					}
				});		
	}
  };
 
	
	
});