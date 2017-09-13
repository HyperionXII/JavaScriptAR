"use strict";

main();

/// Quck Assertion function
///
/// @param condition
///		Testing condition
/// @param error
///		The error message to be displayed
function myAssert(condition, error = "Assert")
{
	var returnValue = false;

	if(!condition)
	{
		returnValue = true;
		console.error(error);
		alert(error);
	}

	return returnValue;
}

/// Start Here
///
function main() 
{
	var glCanvas = document.querySelector("#glCanvas");
	myAssert(glCanvas != null, "No glCanvas found");
	
	var glContext = glCanvas.getContext("webgl");
	myAssert(glContext != null, "No glContext found");
	
	glContext.clearColor(1.0, 0.0, 0.0, 1.0);
  
  	glContext.clear(glContext.COLOR_BUFFER_BIT);
}

