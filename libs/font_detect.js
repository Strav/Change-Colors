/**
 * JavaScript code to detect available availability of a 
 * particular font in a browser using JavaScript and CSS. 
 * 
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/jsoncookies
 * License: Creative Commons Attribution-ShareAlike 2.5
 *          http://creativecommons.org/licenses/by-sa/2.5/
 * Version: 0.15 
 *          changed comparision font to serif from sans-serif, 
 *          as in FF3.0 font of child element didn't fallback 
 *          to parent element if the font is missing.
 * Updated: 09 July 2009 10:52pm
 * 
 */

/**
 * Actual function that does all the work. Returns an array with all the info.
 * This test will fail for the font set as the default serif font.
 * 
 * Usage: d = new Detector();
 *        d.test('font_name');
 */


var fonts = new Array("Agency FB","American Typewriter","Andale Mono","Andale Mono","Apple Chancery","Arial","Arial Black","Arial Narrow","Arial Rounded MT Bold","Arial Unicode MS","Baskerville","Big Caslon","Bitstream Charter","Bitstream Vera Sans","Bitstream Vera Sans Mono","Bitstream Vera Serif","Blackadder ITC","Book Antiqua","Bookman Old Style","Bradley Hand ITC","Brush Script MT","Calibri","Calisto MT","Cambria","Candara","Castellar","Century Gothic","Century Schoolbook","Century Schoolbook L","Comic Sans MS","Comic Sans MS","Comic Sans MS","Consolas","Constantia","Copperplate","Copperplate Gothic Bold","Copperplate Gothic Light","Corbel","Courier","Courier 10 Pitch","Courier New","Curlz MT","DejaVu Sans","DejaVu Sans Condensed","DejaVu Sans Light","DejaVu Sans Mono","DejaVu Serif","DejaVu Serif Condensed","Didot","Edwardian Script ITC","Electron","Engravers MT","Eras Demi ITC","Eras Light ITC","Felix Titling","Franklin Gothic Book","Franklin Gothic Demi","Franklin Gothic Demi Cond","Franklin Gothic Heavy","Franklin Gothic Medium","Franklin Gothic Medium Cond","FreeMono","FreeSans","FreeSerif","Freestyle Script","French Script MT","Futura","Garamond","Geneva","Georgia","Gill Sans","Gill Sans MT","Gill Sans MT Condensed","Gill Sans Ultra Bold","Goudy Old Style","Goudy Stout","Haettenschweiler","Helvetica","Helvetica Neue","Herculanum","Hoefler Text","Impact","Imprint MT Shadow","Jokerman","Juice ITC","Kartika","Kristen ITC","Liberation Mono","Liberation Sans","Liberation Serif","Lucida Bright","Lucida Console","Lucida Grande","Lucida Handwriting","Lucida Sans","Lucida Sans Typewriter","Lucida Sans Unicode","Maiandra GD","Marker Felt","Metal","Microsoft Sans Serif","Mistral","Monaco","Monotype Corsiva","MS Reference Sans Serif","Nice","Nimbus Mono L","Nimbus Roman No9 L","Nimbus Sans L","OCR A Extended","Optima","Palace Script MT","Palatino","Palatino Linotype","Papyrus","Papyrus","Perpetua","Pristina","Rage Italic","Rockwell","Rockwell Extra Bold","Script MT Bold","Skia","Sylfaen","Tahoma","Tahoma","Tempus Sans ITC","Times","Times New Roman","Trebuchet MS","URW Bookman L","URW Chancery L","URW Gothic L","URW Palladio L","Verdana","Vivaldi","Vrinda","Zapfino");

var Detector = function(){
    var h = document.getElementsByTagName("BODY")[0];
    var d = document.createElement("DIV");
    var s = document.createElement("SPAN");
    d.appendChild(s);
    d.style.fontFamily = "serif";		//font for the parent element DIV.
    s.style.fontFamily = "serif";		//have to use serif coz in FF3.0, it doesn't fall back to font of parent element.
    s.style.fontSize   = "72px";			//we test using 72px font size, we may use any size. I guess larger the better.
    s.innerHTML        = "mmmmmmmmmml";		//we use m or w because these two characters take up the maximum width. And we use a L so that the same matching fonts can get separated
    h.appendChild(d);
    var defaultWidth   = s.offsetWidth;		//now we have the defaultWidth
    var defaultHeight  = s.offsetHeight;	//and the defaultHeight, we compare other fonts with these.
    h.removeChild(d);
    /* test
     * params:
     * font - name of the font you wish to detect
     * return:
     * f[0] - Input font name.
     * f[1] - Computed width.
     * f[2] - Computed height.
     * f[3] - Detected? (true/false).
     */
    function debug(font) {
        h.appendChild(d);
        var f = [];
        f[0] = s.style.fontFamily = font;       // Name of the font
        f[1] = s.offsetWidth;                           // Width
        f[2] = s.offsetHeight;                          // Height
        h.removeChild(d);
        font = font.toLowerCase();
        if (font == "serif") {
            f[3] = true;    // to set arial and sans-serif true
        } else {
            f[3] = (f[1] != defaultWidth || f[2] != defaultHeight); // Detected?
        }
        return f;
    }
    function test(font){
        f = debug(font);
        return f[3];
    }
    this.detailedTest = debug;
    this.test = test;
}

/********************/

function buildFontSelector(fontsArray){
    var FontSelectorString = '<div class="FontsContainer">';
    var FontDetector = new Detector();
    for(i = 0; i < fonts.length; i++){
	var testFont = FontDetector.test(fonts[i]);
	if(testFont == true)
	    FontSelectorString += '<div class="SingleFontDiv" onClick="setFont(\''+ fonts[i] +'\');" style="font-family: '+ fonts[i] +'">' + fonts[i] + '</div>';
    }
    FontSelectorString += '</div>'
    return FontSelectorString;
}

function buildFontSizeSelector(){
    var FontSizeSelectorString = '<select id="fontSize" name="fontSize" onchange="setFontSize(this.value);">';
    FontSizeSelectorString += '<option id="fontSizeOption_0" value="0">Web page\'s font size</option>'; 
    for(i = 1; i <= 32; i++){
	FontSizeSelectorString += '<option id="fontSizeOption_'+ i +'" value="' + i + '">' + i + 'pt</option>'; 
    }
    FontSizeSelectorString += '</select>';
    return FontSizeSelectorString;
}


function showFonts(){
    var fontRow = document.getElementById("fontSelector");
    var fontBtn = document.getElementById("fontSelectorBtn");
    fontBtn.innerHTML = "(Hide font selection)"
    fontRow.style.display = '';
    fontBtn.onclick = hideFonts;
}

function hideFonts(){
    var fontRow = document.getElementById("fontSelector");
    var fontBtn = document.getElementById("fontSelectorBtn");
    fontBtn.innerHTML = "(Select another font)"
    fontRow.style.display = 'none';
    fontBtn.onclick = showFonts;
}


function setFont(fontName){
    var defaultFont = document.getElementById('default_font');
    var sampleBlock = document.getElementById('sampleBlock');
    defaultFont.style.fontFamily = fontName;
    sampleBlock.style.fontFamily = fontName;
    defaultFont.innerHTML = fontName;
    saveOption("OverrideFontName", fontName);
}

function setFontSize(fontSize){
    var sampleBlock = document.getElementById('sampleBlock');
    if(parseInt(fontSize) == 0){
	sampleBlock.style.fontSize = '12pt';
    }
    else{
	sampleBlock.style.fontSize = fontSize + 'pt';
    }
    document.getElementById('fontSizeOption_' + fontSize).selected = true;
    saveOption("FontSize", fontSize);
}

function removeFontStyleAttributes(){
    var sampleBlock = document.getElementById('sampleBlock');
    sampleBlock.style.fontFamily = '';
    sampleBlock.style.fontSize = '';
}

function hideFontOptions(){
    hide('fontSelection'); 
    hide('fontSizeRow'); 
    removeFontStyleAttributes();    
}

function showFontOptions(){
    show('fontSelection'); 
    show('fontSizeRow'); 
}

function fontRadioDefault()
{
hideFontOptions();
saveOption("DefaultBrowserFont", true);
}

function fontRadioOverride()
{
showFontOptions();
setFontSize(document.getElementById('fontSize').value); 
setFont(document.getElementById('default_font').innerHTML);
saveOption("DefaultBrowserFont", false);
}