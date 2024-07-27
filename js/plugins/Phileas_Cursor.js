//=============================================================================
// Phileas_Cursor.js
//=============================================================================
// [Update History]
// 2023.August.20 Ver1.0.0 First Release
// 2023.August.21 Ver1.1.0 Added show/hide parameters and commands
// 2023.August.24 Ver1.1.1 Fixed gamepad

/*:
 * @target MZ
 * @plugindesc Changes the cursor picture
 * @author Phileas
 *
 * @param defaultPicture
 * @text Default picture
 * @type file
 * @dir img/system/
 * @desc It is set at the start of the game
 *
 * @param hideAtStartup
 * @text Hide at startup?
 * @type boolean
 * @default false
 * @desc If true, the cursor will be invisible when the game starts
 *
 * @param keyboardHideKey
 * @text Keyboard key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param keyboardHideKeyNumber
 * @text Keyboard key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Keyboard key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param mouseHideKey
 * @text Mouse key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param mouseHideKeyNumber
 * @text Mouse key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Mouse key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @param gamepadHideKey
 * @text Gamepad key to hide
 * @desc The invisibility of the cursor will switch when the specified key is pressed
 *
 * @param gamepadHideKeyNumber
 * @text Gamepad key to hide (number)
 * @type number
 * @default 0
 * @desc The alternative to the "Gamepad key to hide" parameter, if it is more convenient for you to use a numeric key code
 *
 * @command setPicture
 * @text Change the picture
 * @desc Changes the cursor image
 * @arg pictureFile
 * @text Cursor picture
 * @type file
 * @dir img/system/
 *
 * @command hide
 * @text Hide cursor
 * @desc Makes the cursor invisible
 *
 * @command show
 * @text Show cursor
 * @desc Makes the cursor visible
 *
 * 
 * @help
 * Changes the cursor image to any of the img/system.
 * Use png format!
 * Write to the author if you think it is more convenient to store cursor images in another folder.
 *
 * To change the cursor to the standard one, do not select an image in the parameter/argument (option "(None)").
 * 
 * Plugin commands:
 * - "Change the picture"
 * - "Hide cursor"
 * - "Show cursor"
 *
 * You can also switch the invisibility of the cursor by pressing the keyboard, mouse and gamepad keys.
 * To do this, configure the plugin settings. If you want to specify a key by a string name, set 0 to the number value.
 *
 * If the cursor image is not displayed, try to reduce its size.
 * 
 * You can always write to the author if you need other features or even plugins.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * This means that you can freely use the plugin in non-commercial and commercial games and even edit it.
 * But be sure to include me in the credits!
 */
 
/*:ru
 * @target MZ
 * @plugindesc Изменяет картинку курсора
 * @author Phileas
 *
 * @param defaultPicture
 * @text Картинка по умолчанию
 * @type file
 * @dir img/system/
 * @desc Устанавливается при запуске игры
 *
 * @param hideAtStartup
 * @text Скрывать при запуске?
 * @type boolean
 * @default false
 * @desc Если true, курсор будет невидимым при запуске игры
 *
 * @param keyboardHideKey
 * @text Клавиша клавиатуры для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param keyboardHideKeyNumber
 * @text Клавиша клавиатуры для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param mouseHideKey
 * @text Клавиша мыши для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param mouseHideKeyNumber
 * @text Клавиша мыши для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @param gamepadHideKey
 * @text Клавиша геймпада для скрытия
 * @desc Невидимость курсора будет переключаться при нажатии на заданную клавишу
 *
 * @param gamepadHideKeyNumber
 * @text Клавиша геймпада для скрытия (номер)
 * @type number
 * @default 0
 * @desc Альтернатива параметру "Клавиша скрытия", если вам удобнее использовать числовой код клавиши
 *
 * @command setPicture
 * @text Изменить картинку
 * @desc Изменяет картинку курсора
 * @arg pictureFile
 * @text Картинка курсора
 * @type file
 * @dir img/system/
 *
 * @command hide
 * @text Скрыть курсор
 * @desc Делает курсор невидимым
 *
 * @command show
 * @text Показать курсор
 * @desc Делает курсор видимым
 *
 * 
 * @help
 * Изменяет картинку курсора на любую из img/system.
 * Используйте формат png!
 * Напишите автору, если вы считаете, что удобнее хранить картинки курсора в другой папке.
 *
 * Чтобы изменить курсор на стандартный, в параметре/аргументе не выбирайте картинку (вариант "(Нет)").
 * 
 * Команды плагина: 
 * - "Изменить картинку"
 * - "Скрыть курсор"
 * - "Показать курсор"
 *
 * Также вы можете переключать невидимость курсора по нажатию на клавишу клавиатуры, мыши и геймпада.
 * Для этого настройте параметры плагина. Если вы хотите указать клавишу по строковому имени, установите 0 в значение номера.
 *
 * Если картинка курсора не отображается, попробуйте уменьшить её размер.
 *
 * Вы всегда можете написать автору, если вам нужны другие функции или даже плагины.
 * Boosty: https://boosty.to/phileas
 * RPG Maker Web: https://forums.rpgmakerweb.com/index.php?members/phileas.176075/
 * RPG Maker Union: https://rpgmakerunion.ru/id/phileas
 * Email: olek.olegovich gmail.com
 * Telegram: olekolegovich
 *
 * [License]
 * Этот плагин распространяется по лицензии MIT.
 * http://opensource.org/licenses/mit-license.php
 *
 * Это означает, что вы можете свободно использовать плагин в некоммерческих и коммерческих играх и даже редактировать его.
 * Но обязательно укажите меня в титрах!
 */

(function() {

//--------MY CODE:
    const base_url = "./img/system/";
    const x_offset = 0;
    const y_offset = 0;
    const fallbackStyle = "pointer";
    const phileasMouseKeyMap = {
        "left": 0,
        "middle": 1,
        "right": 2
    }
    
    var parameters = PluginManager.parameters("Phileas_Cursor");
    var defaultPicture = parameters["defaultPicture"] || "";
    var hideAtStartup = parameters["hideAtStartup"] == "true";
    var keyboardHideKey = parameters["keyboardHideKey"] || "";
    var keyboardHideKeyNumber = Number(parameters["keyboardHideKeyNumber"] || 0);
    var mouseHideKey = parameters["mouseHideKey"] || "";
    var mouseHideKeyNumber = Number(parameters["mouseHideKeyNumber"] || 0);
    var gamepadHideKey = parameters["gamepadHideKey"] || "";
    var gamepadHideKeyNumber = Number(parameters["gamepadHideKeyNumber"] || 0);
    var currentPicture = "";
    var currentHidden = false;
    
    PluginManager.registerCommand("Phileas_Cursor", "setPicture", setPicture);
    PluginManager.registerCommand("Phileas_Cursor", "hide", hide);
    PluginManager.registerCommand("Phileas_Cursor", "show", show);
    
    function changePicture(file) {
        currentPicture = file;
        document.body.style.cursor = file == "" 
            ? "default"
            : `url("${base_url}${file}.png") ${x_offset} ${y_offset}, ${fallbackStyle}`;
    }

    function setPicture(params) {
        let pictureFile = params["pictureFile"] || "";
        changePicture(pictureFile);
    }
    
    function hide() {
        currentHidden = true;
        document.body.style.cursor = "none";
    }
    
    function show() {
        currentHidden = false;
        changePicture(currentPicture);
    }
    
    function switchHide() {
        if (currentHidden) {
            show();
        }
        else {
            hide();
        }
    }
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    
    function phileasCursorDownHandler(event) {
        if (event.keyCode == keyboardHideKeyNumber) {
            switchHide();
        }
    }
    
    function phileasCursorMouseDownHandler(event) {
        if (event.button == mouseHideKeyNumber) {
            switchHide();
        }
    }
    
    changePicture(defaultPicture);
    if (hideAtStartup) {
        hide();
    }
    if (keyboardHideKeyNumber == 0) {
        keyboardHideKeyNumber = getKeyByValue(Input.keyMapper, keyboardHideKey);
    }
    if (mouseHideKeyNumber == 0) {
        mouseHideKeyNumber = phileasMouseKeyMap[mouseHideKey];
    }
    if (gamepadHideKeyNumber == 0) {
        gamepadHideKeyNumber = getKeyByValue(Input.gamepadMapper, gamepadHideKey);
    }
    if (keyboardHideKeyNumber != 0) {
        document.addEventListener("keydown", phileasCursorDownHandler);
    }
    if (mouseHideKeyNumber != 0) {
        document.addEventListener("mousedown", phileasCursorMouseDownHandler);
    }

//--------CHANGED CORE:
    const Origin_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Origin_setupNewGame.call(this);
        changePicture(defaultPicture);
    };
    
    const Origin_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = Origin_makeSaveContents.call(this);
        contents.phileasCursorPicture = currentPicture;
        contents.phileasCursorHidden = currentHidden;
        return contents;
    };
    
    const Origin_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        Origin_extractSaveContents.call(this, contents);
        changePicture(contents.phileasStopPlayer || "");
        if (contents.phileasCursorHidden || false) {
            hide();
        }
        else {
            show();
        }
    };
    
    if (gamepadHideKeyNumber != 0) {
        Origin_updateGamepadState = Input._updateGamepadState;
        Input._updateGamepadState = function(gamepad) {
            Origin_updateGamepadState.call(this, gamepad);
            const lastState = this._gamepadStates[gamepad.index] || [];
            let state = this._gamepadStates[gamepad.index];
            for (let i = 0; i < state.length; ++i) {
                if (state[i] == true && lastState[i] != true && i == gamepadHideKeyNumber) {
                    switchHide();
                }
            }
        };
    }
}());
