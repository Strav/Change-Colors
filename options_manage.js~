
var Options = {"background_color" : ["color", ""], "links_color": ["color", ""], "text_color" : ["color", ""], "apply_to_all": ["check", ""], "enable_on_startup": ["check", ""]};

function save_options() 
{
    for(key in Options)
    {
	switch(Options[key][0])
	{
	case "color":
	    Options[key][1] = "#" + document.getElementById(key).value;
	    break;
	case "check":
	    if(document.getElementById(key).checked == true)
		Options[key][1] = "checked";
	    else
		Options[key][1] = "";
	    break;
	}
	
    }
    localStorage["ColorOptions"]  = JSON.stringify(Options);
    var status = document.getElementById("save_status");
    status.innerHTML = "Options Saved.";
}

function restore_options() 
{	
    var localOptions = JSON.parse(localStorage["ColorOptions"]);
    for(key in localOptions)
    {
	optionValue = localOptions[key];
	if(!optionValue)
	    return;
	else
	{
	    var element = document.getElementById(key);
	    if(element)
		{
		    element.value = localOptions[key][1];
		    switch(localOptions[key][0])
		    {
		    case "check":
			if(localOptions[key][1] == "checked")
			    element.checked = true;
			else
			    element.checked = false;
			break;
		    }
		}
	    else
		return;
	}	
    }
    hideAndUncheckIf(!document.getElementById("apply_to_all").checked, "enable_on_startup_div", "enable_on_startup");
}


