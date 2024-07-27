//=============================================================================
// textCommandRu.js
//=============================================================================
/*:
 
 * @plugindesc Ввод команд
 * @author Yuryol
 
 * @param listCommand
 * @desc Лист команд.  
 * @default шаг,огонь,стоп,влево,вправо,прыг,назад,щит,бег,лево,право,как дела?,привет,хп
 
 * @param switchCommand
 * @desc ID переключателя для включения-выключения плагина
 * @default 5
 
 * @param switchInput
 * @desc ID переключателя для включения-отключения движения персонажа.
 * @default 6
 
 * @param button
 * @desc кнопка для включения-выключения плагина
 * @default `
 
 * @param variable
 * @desc ID переменной для показа фона 
 * @default 5
 
 * @param windowBG
 * @desc  положение по осям X и Y фоновой картинки окна ввода.
 * @default 0,0
 
 * @param windowText
 * @desc 1-ые два числа - положение по осям X и Y поля ввода текста. Вторые два числа - ширина и высота поля ввода, пятое число - цвет окна ввода, шестое число - цвет рамки окна ввода. Последнее число - ширина рамки
 * @default 0,0,222,30,#000000,#00bb00,1
 
 * @param fontText
 * @desc 1-ые два числа - положение по осям X и Y текста относительно окна ввода текста. 3-е число - отступ справа, 4 число - шрифт, 5 число - курсив ли, 6 число - цвет, 7 число - обводка, 8 число - толщина обводки
 * @default 6,0,14,17,true,#00bb00,#000000,0,Trebuchet MS
 
 
*/
var parameters = PluginManager.parameters('textCommandRu');
 
var windowText = parameters['windowText'];
windowText = windowText.split(',');
 
var windowBG = parameters['windowBG'];
windowBG = windowBG.split(',');
 
var fontText = parameters['fontText'];
fontText = fontText.split(',');
 
(function() {
 
var button = parameters['button'];
var switchCommand = parameters['switchCommand'];
var switchInput = parameters['switchInput'];
var variable = parameters['variable'];
 
var listCommand = parameters['listCommand'];
listCommand = listCommand.split(',');
 
var inputCommand = [];
 
/********************
Список клавиш для написания команд
********************/
 
Input.rusTriggered = function() { 
 	if (this._latestButton != null && this._pressedTime === 0 && ['?',' ','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','ф','ы','в','а','п','р','о','л','д','ж','э','я','ч','с','м','и','т','ь','б','ю','1','2','3','4','5','6','7','8','9','0','+','-'].contains(this._latestButton)) { 
		inputCommand[inputCommand.length] = this._latestButton; 
	};
}  
 
/********************
Считывание нажатия клавиш
********************/
 
var textCommand = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	textCommand.call(this);
  this.inputTextCommand();
};
 
Scene_Map.prototype.inputTextCommand = function() {
	Input.rusTriggered();
  Input.switchTriggered();
 
	// Вызов окна ввода
	if (Input.isTriggered(button)) {
  	if($gameSwitches.value(switchCommand)){
			$gameSwitches.setValue(switchCommand, false);
			Input.switchTriggered();
		} else {
			$gameSwitches.setValue(switchCommand, true);
			Input.switchTriggered();
		}
	}    
 
	// Закрытие окна ввода при заходе в меню
	if (Input.isTriggered('escape')) {
		$gameSwitches.setValue(switchCommand, true);
		Input.switchTriggered();
	}
 
	// Удаление крайних символов
	if (Input.isLongPressed('backspace')) {
		inputCommand.pop();
	} else {
		if (Input.isTriggered('backspace')) {
    	inputCommand.pop();
	  }
  }  
 
	// Ввод слова
  if (Input.isTriggered('ok')) {  
    i = listCommand.indexOf(inputCommand.join(''));
    if(inputCommand.join('')==listCommand[i]) {
    	$gameTemp.reserveCommonEvent(i+1);   
    } 
    inputCommand = [];        
   }     
};
 
/********************
Вызов окна ввода команд
********************/
 
var Scene_Map_create_alias = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	Scene_Map_create_alias.call(this);
 
	this.bg_hud = new BG_hud();  
  this.addChild(this.bg_hud);
 
};
 
/********************
BG_hud - BackGround окна с вводом команд
********************/
 
function BG_hud() {
	this.initialize.apply(this, arguments);
};
 
BG_hud.prototype = Object.create(Sprite.prototype);
BG_hud.prototype.constructor = BG_hud;
 
BG_hud.prototype.initialize = function () {
  Sprite.prototype.initialize.call(this);
 
//  this.x = windowText[0];
//  this.y = windowText[1];
  this.bitmap = new Bitmap(windowText[2], windowText[3]);
	this.update();    
};
 
BG_hud.prototype.update = function(){
    this.drawHud();
};
 
BG_hud.prototype.drawHud = function () {
	this.bitmap.clear();
	if ($gameSwitches.value(switchCommand)) {
		$gameScreen.erasePicture(1);
	} else {
    this.x = windowText[0];
    this.y = windowText[1];
    $gameScreen.showPicture(1, 'BG'+$gameVariables.value(variable), 0, windowBG[0], windowBG[1], 100, 100, 255, 0);
		//Поле для ввода текста
		this.bitmap.fillRect(0, 0, windowText[2], windowText[3], windowText[5]);
    this.bitmap.fillRect(windowText[6], windowText[6], windowText[2]-windowText[6]*2, windowText[3]-windowText[6]*2,windowText[4]);
    this.bitmap.textColor = fontText[5];
    this.bitmap.fontFace = fontText[8];
		this.bitmap.fontSize = fontText[3];
    this.bitmap.outlineWidth = fontText[7];
    this.bitmap.outlineColor = fontText[6];
    this.bitmap.fontItalic = fontText[4];
		this.bitmap.drawText(inputCommand.join(''), fontText[0], fontText[1], windowText[2]-fontText[2], windowText[3]);
		if (inputCommand=='') {
 
			var hex = fontText[5].split('');
			hex.splice(0,1);
			var r = parseInt(''+hex[0]+hex[1], 16);
			var g = parseInt(''+hex[2]+hex[3], 16);
			var b = parseInt(''+hex[4]+hex[5], 16);
			this.bitmap.textColor = 'rgba('+ r +','+ g +','+ b +',.7)';
			console.log(this.bitmap.textColor);
			this.bitmap.drawText('введите команду', fontText[0], fontText[1], windowText[2]-fontText[2], windowText[3]);
		}
 
	}
};
 
 
 
Input.switchTriggered = function() { 
	if ($gameSwitches.value(switchCommand)) {
		Input.keyMapper = {
			8: 'backspace',	// backspace
  		9: 'tab',		// tab
  		13: 'ok',		// enter
  		16: 'shift',	// shift
  		17: 'control',	// control
			18: 'alt',  	// alt
			19: 'pause',	// pause
			20: 'capslock',	// capslock
			27: 'escape',   // escape
			32: 'space',	// space
			33: 'pageup',   // pageup
			34: 'pagedown', // pagedown
			35: 'end',		// end
			36: 'home',		// home
			37: 'left',       // left arrow
			38: 'up',       // up arrow
			39: 'right',    // right arrow
			40: 'down',     // down arrow
			44: 'printscreen',	// printscreen
			45: 'insert',   // insert
			46: 'delete',	// delete
			48: '0',		// 0
			49: '1',		// 1
			50: '2',		// 2
			51: '3',		// 3
			52: '4',		// 4
			53: '5',		// 5
			54: '6',		// 6
			55: '7',		// 7
			56: '8',		// 8
			57: '9',		// 9
			65: 'a',		// A ф
			66: 'b',		// B и
			67: 'c',		// C с
			68: 'd',		// D в
			69: 'e',		// E у
			70: 'f',		// F а
			71: 'g',		// G п
			72: 'h',		// H р
			73: 'i',		// I ш
			74: 'j',		// J о
			75: 'k',		// K л
			76: 'l',		// L д
			77: 'm',		// M ь
			78: 'n',		// N т
			79: 'o',		// O щ
			80: 'p',		// P з
			81: 'q',		// Q й
			82: 'r',		// R к
			83: 's',		// S ы
			84: 't',		// T е
			85: 'u',		// U г
			86: 'v',		// V м
			87: 'w',		// W ц
			88: 'x',		// X ч
			89: 'y',		// Y н
			90: 'z',		// Z я
			96: 'escape',   // numpad 0
			97: 'numpad1',	// numpad 1
			98: 'down',     // numpad 2
			99: 'numpad3',	// numpad 3
			100: 'left',    // numpad 4
			101: 'numpad5',	// numpad 5
			102: 'right',   // numpad 6
			103: 'numpad7',	// numpad 7
			104: 'up',      // numpad 8
			105: 'numpad9', // numpad 9
			106: '*',		// *
			107: '+',		// +
			109: '-',		// -
			110: '.',		// .
			111: '/',		// /
			112: 'f1',		// F1
			113: 'f2',		// F2
			114: 'f3',		// F3
			115: 'f4',		// F4
			116: 'f5',		// F5
			117: 'f6',		// F6
			118: 'f7',		// F7
			119: 'f8',		// F8
			120: 'debug',   // F9
			121: 'f10',		// F10
			122: 'f11',		// F11
			123: 'f12',		// F12
			144: 'numlock',	// numlock
			145: 'scrolllock',	// scrolllock
			186: ';',		// :;ж
			187: '=',		// +=
			188: '<',		// <,Б
			189: '-',		// -_
			190: '>',		// >.Ю
			191: '?',		// /?,/.
			192: '`',		// ~`ё
			219: '[',		// {[х
			220: '|',		// |
			221: ']',		// }]ъ
			222: '"'		// "'э
		} 
	} else {
		if ($gameSwitches.value(switchInput)) {
			Input.keyMapper = {
				8: 'backspace',	// backspace
				9: 'tab',		// tab
				13: 'ok',		// enter
				16: 'shift',	// shift
				17: 'control',	// control
				18: 'alt',  	// alt
				19: 'pause',	// pause
				20: 'capslock',	// capslock
				27: 'escape',   // escape
				32: ' ',	// space
				33: 'pageup',   // pageup
				34: 'pagedown', // pagedown
				35: 'end',		// end
				36: 'home',		// home
				37: 'left',       // left arrow
				38: 'up',       // up arrow
				39: 'right',    // right arrow
				40: 'down',     // down arrow
				44: 'printscreen',	// printscreen
				45: 'insert',   // insert
				46: 'delete',	// delete
				48: '0',		// 0
				49: '1',		// 1
				50: '2',		// 2
				51: '3',		// 3
				52: '4',		// 4
				53: '5',		// 5
				54: '6',		// 6
				55: '7',		// 7
				56: '8',		// 8
				57: '9',		// 9
				65: 'ф',		// A ф
				66: 'и',		// B и
				67: 'с',		// C с
				68: 'в',		// D в
				69: 'у',		// E у
				70: 'а',		// F а
				71: 'п',		// G п
				72: 'р',		// H р
				73: 'ш',		// I ш
				74: 'о',		// J о
				75: 'л',		// K л
				76: 'д',		// L д
				77: 'ь',		// M ь
				78: 'т',		// N т
				79: 'щ',		// O щ
				80: 'з',		// P з
				81: 'й',		// Q й
				82: 'к',		// R к
				83: 'ы',		// S ы
				84: 'е',		// T е
				85: 'г',		// U г
				86: 'м',		// V м
				87: 'ц',		// W ц
				88: 'x',		// X ч
				89: 'н',		// Y н
				90: 'я',		// Z я
				96: 'escape',   // numpad 0
				97: 'numpad1',	// numpad 1
				98: 'down',     // numpad 2
				99: 'numpad3',	// numpad 3
				100: 'left',    // numpad 4
				101: 'numpad5',	// numpad 5
				102: 'right',   // numpad 6
				103: 'numpad7',	// numpad 7
				104: 'up',      // numpad 8
				105: 'numpad9', // numpad 9
				106: '*',		// *
				107: '+',		// +
				109: '-',		// -
				110: 'ю',		// .
				111: '/',		// /
				112: 'f1',		// F1
				113: 'f2',		// F2
				114: 'f3',		// F3
				115: 'f4',		// F4
				116: 'f5',		// F5
				117: 'f6',		// F6
				118: 'f7',		// F7
				119: 'f8',		// F8
				120: 'debug',   // F9
				121: 'f10',		// F10
				122: 'f11',		// F11
				123: 'f12',		// F12
				144: 'numlock',	// numlock
				145: 'scrolllock',	// scrolllock
				186: 'ж',		// :;ж
				187: '+',		// +=
				188: 'б',		// <,Б
				189: '-',		// -_
				190: '>',		// >.Ю
				191: '?',		// /?,/.
				192: '`',		// ~`ё
				219: 'х',		// {[х
				220: '|',		// |
				221: 'ъ',		// }]ъ
				222: 'э'		// "'э  
			}
		} else {
			Input.keyMapper = {
					8: 'backspace',	// backspace
					13: 'ok',		// enter
					27: 'escape',   // escape
          32: ' ',	// space
					48: '0',		// 0
					49: '1',		// 1
					50: '2',		// 2
					51: '3',		// 3
					52: '4',		// 4
					53: '5',		// 5
					54: '6',		// 6
					55: '7',		// 7
					56: '8',		// 8
					57: '9',		// 9
					65: 'ф',		// A ф
					66: 'и',		// B и
					67: 'с',		// C с
					68: 'в',		// D в
					69: 'у',		// E у
					70: 'а',		// F а
					71: 'п',		// G п
					72: 'р',		// H р
					73: 'ш',		// I ш
					74: 'о',		// J о
					75: 'л',		// K л
					76: 'д',		// L д
					77: 'ь',		// M ь
					78: 'т',		// N т
					79: 'щ',		// O щ
					80: 'з',		// P з
					81: 'й',		// Q й
					82: 'к',		// R к
					83: 'ы',		// S ы
					84: 'е',		// T е
					85: 'г',		// U г
					86: 'м',		// V м
					87: 'ц',		// W ц
					88: 'x',		// X ч
					89: 'н',		// Y н
					90: 'я',		// Z я
					106: '*',		// *
					107: '+',		// +
					109: '-',		// -
					110: 'ю',		// .
					111: '/',		// /
					112: 'f1',		// F1
					113: 'f2',		// F2
					114: 'f3',		// F3
					115: 'f4',		// F4
					116: 'f5',		// F5
					117: 'f6',		// F6
					118: 'f7',		// F7
					119: 'f8',		// F8
					120: 'debug',   // F9
					121: 'f10',		// F10
					122: 'f11',		// F11
					123: 'f12',		// F12
					186: 'ж',		// :;ж
					187: '+',		// +=
					188: 'б',		// <,Б
					189: '-',		// -_
					191: '?',		// /?,/.
					192: '`',		// ~`ё
					219: 'х',		// {[х
					221: 'ъ',		// }]ъ
					222: 'э'		// "'э  
				}
		}
	}
}
 
})()