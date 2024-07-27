//=============================================================================
// UserProfile v1.01
//=============================================================================
/*:
 *@plugindesc Привязка профиля игрока к файлу сохранения
 *@author Noxmils
 *@help Отключите в своем проекте возможность сохранения в ходе игрового процесса через
 * меню. Данный плагин предусматривает автоматическое сохранение через команду
 * плагина "Autosave" (без кавычек), а также, при выходе на титульный экран.
 * В начале игрового процесса следует дать имя профилю игрока. Имя профиля хранится 
 * в $gameSystem._userName. Через команду "Скрипт" присвойте этой переменной имя
 * профиля.
 *
 * Пример присвоения имени профиля:
 * В Базе Данных создайте технического персонажа. Создайте автоматическое событие,
 * запускающееся при начале новой игр, первой строкой которого идет ввод имени для 
 * технического персонажа. Второй строкой присвойте переменной $gameSystem._userName 
 * имя этого персонажа с помощью следующего Скрипта:
 * $gameSystem._userName = $gameActors.actor(id).name();
 * где id - это номер технического персонажа в Базе Данных.
 * Далее сохраните прогресс с помощью команды плагина "Autosave" и озаботьтесь
 * тем, чтобы автоматическое событие не начало выполняться повторно.
 *
 * Вы можете использовать другие способы присвоения имени профилю игрока.
 *
 *@param ProfileTitle
 *@text Заголовок экрана выбора Профиля
 *@desc Введите текст, показываемый в заголовке экрана с выбором профиля
 *@default Выберите профиль
 *@type text
 *
 *@param PlayerCalled
 *@text Наименование игрока
 *@desc Наименование игрока, указываемое вместо номера файла сохранения в листе сохранений
 *@default Игрок
 *@type text
 *
 *@param SaveBeforeQuit
 *@text Сохранение перед выходом в заглавное меню
 *@desc Сохранять ли игру перед выходом из игры в заглавное меню?
 *@default false
 *@type boolean
 */

(function () {
    
    var ProfileTitle = PluginManager.parameters('UserProfile v01')['ProfileTitle'];
    var PlayerCalled = PluginManager.parameters('UserProfile v01')['PlayerCalled'];
    var SaveBeforeQuit = PluginManager.parameters('UserProfile v01')['SaveBeforeQuit'];
    
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        if (command === 'Autosave') {
            $gameSystem.onBeforeSave();
            if (DataManager.saveGame($gameSystem._saveFile)) {
                StorageManager.cleanBackup($gameSystem._saveFile);
            }
        }
    };
    
    var DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        var info = DataManager_makeSavefileInfo.call(this);
        info.userName = $gameSystem._userName;
        return info;
    };
    
    Window_SavefileList.prototype.drawFileId = function(id, x, y) {
        var info = DataManager.loadSavefileInfo(id);
        //console.log(info);
        if (info) {
            this.drawText(PlayerCalled + ' ' + id, x, y, 180);
        } else {
            this.drawText('Пусто', x, y, 180);
        }
    };
    
    Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
        if (info.userName) {
            this.drawText(info.userName, x, y, width);
        }
    };
    
    Scene_Load.prototype.helpWindowText = function() {
    return ProfileTitle;
};
    
    var Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Game_System_initialize.call(this);
        this._saveFile = 0;
        this._userName = '';
    };
    
    DataManager.latestSavefileId = function() {
    var globalInfo = this.loadGlobalInfo();
    var savefileId = 0;
    var timestamp = 0;
    if (globalInfo) {
        for (var i = 1; i < globalInfo.length; i++) {
            if (this.isThisGameFile(i) && globalInfo[i].timestamp > timestamp) {
                timestamp = globalInfo[i].timestamp;
                savefileId = i;
            }
        }
    }
    return savefileId;
    };
    
    var DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        DataManager_setupNewGame.call(this);
        $gameSystem._saveFile = DataManager.latestSavefileId() + 1;
        console.log();
    };

    var Scene_Menu_commandGameEnd = Scene_Menu.prototype.commandGameEnd;
    Scene_Menu.prototype.commandGameEnd = function() {
        if (SaveBeforeQuit) {
            $gameSystem.onBeforeSave();
            if (DataManager.saveGame($gameSystem._saveFile)) {
                StorageManager.cleanBackup($gameSystem._saveFile);
            };
            Scene_Menu_commandGameEnd.call(this);
        } else {
            Scene_Menu_commandGameEnd.call(this);
        };
    };

})()