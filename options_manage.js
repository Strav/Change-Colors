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

function colorRadioDefault(){
    hide("background_color_row");
    hide("text_color_row");
    hide("links_color_row");
    hide("visited_links_color_row");
    saveOption("DefaultBrowserColor", true);
}

function colorRadioOverride(){
    show("background_color_row");
    show("text_color_row");
    show("links_color_row");
    show("visited_links_color_row");
    saveOption("DefaultBrowserColor", false);
}


function saveOption(optionName, optionValue){
    localStorage[optionName]  = JSON.stringify(optionValue);
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.objCurrentPage.buildCssToInject();
}

function loadOption(optionName){
    return JSON.parse(localStorage[optionName]);   
}

function restoreOptionValue(elementId){
    var value = loadOption(elementId);
    var element = document.getElementById(elementId);
    element.value = value;
}

function radioCheck(optionName, defaultElementId, overrideElementId){
    if(loadOption(optionName)){
	document.getElementById(defaultElementId).checked = true;
	document.getElementById(defaultElementId).onclick();
    }
    else{
	document.getElementById(overrideElementId).checked = true;
	document.getElementById(overrideElementId).onclick();
    }
}

function restoreOptions(){
    setFontSize(loadOption("FontSize"));
    setFont(loadOption("OverrideFontName"));
    restoreOptionValue("text_color")
    restoreOptionValue("background_color")
    restoreOptionValue("links_color")
    restoreOptionValue("visited_links_color")
    radioCheck("DefaultBrowserFont", "browserFontDefault", "browserFontOverride");
    radioCheck("DefaultBrowserColor", "browserColorDefault", "browserColorOverride");
    radioCheck("ShowImage", "showImageDefault", "showImageOverride");
    radioCheck("ShowFlash", "showFlashDefault", "showFlashOverride");
    bindColor('background_color', 'backgroundColor', 'sampleBlock');
    bindColor('text_color', 'color', 'sampleBlock');
    bindColor('links_color', 'color', 'link');
    bindColor('visited_links_color', 'color', 'visited_link');
}

function displayColoredMessage(element, message, colorCode){
    element.style.color = colorCode;
    element.innerHTML = message;
}

