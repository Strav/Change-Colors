function bindColor(elementId, attributeName, targetId){
    var element = document.getElementById(elementId);
    var value = element.value;
    var target = document.getElementById(targetId);
    target.style[attributeName] = '#' + value;
    saveOption(elementId, value);
}

function hide(elementId){
    var element = document.getElementById(elementId);
    element.style.display = 'none';
}

function show(elementId){
    var element = document.getElementById(elementId);
    element.style.display = '';
}

function saveOption(optionName, optionValue){
    localStorage[optionName]  = JSON.stringify(optionValue);    
}

function loadOption(optionName){
    return JSON.parse(localStorage[optionName]);   
}

function restoreOptionValue(elementId){
    var value = loadOption(elementId);
    var element = document.getElementById(elementId);
    element.value = value;
}

function restoreOptions(){
    setFontSize(loadOption("FontSize"));
    setFont(loadOption("OverrideFontName"));
    restoreOptionValue("text_color")
    restoreOptionValue("background_color")
    restoreOptionValue("links_color")
    restoreOptionValue("visited_links_color")

    if(loadOption("DefaultBrowserFont")){
	document.getElementById("browserFontDefault").checked = true;
	hideFontOptions();
    }
    else{
	document.getElementById("browserFontOverride").checked = true;
	showFontOptions();
    }
    
    bindColor('background_color', 'backgroundColor', 'sampleBlock');
    bindColor('text_color', 'color', 'sampleBlock');
    bindColor('links_color', 'color', 'link');
    bindColor('visited_links_color', 'color', 'visited_link');
}
