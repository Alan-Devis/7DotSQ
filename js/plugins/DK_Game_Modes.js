/*
Title: Game Modes
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 2.1.0
Release: 17.07.2021
First release: 10.10.2017
*/

/*ru
Название: Игровые Режимы
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 2.1.0
Релиз: 17.07.2021
Первый релиз: 10.10.2017
*/

/*:
 * @plugindesc v.2.1.0 [MV|MZ] Game modes. Adds a choice of game mode when the player selects a new game.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Game_Modes
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 2.1.0
 Release: 17.07.2021
 First release: 10.10.2017

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instruction
 ###=========================================================================
 The plugin is compatible with the DK Globals plugin and other similar plugins.
 Game modes have "Visibility Switch" and "Availability Switch" options.
 These options only work if the DK Globals plugin (or similar) is enabled.
 If you do not have any of these plugins installed
 then leave the parameter untouched (value 0).

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 To use the plugin in commercial projects, you must be my subscriber on patreon
 https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @param Modes
 * @text Game modes
 * @desc Game modes
 * @type struct<Mode>[]

 * @param Main Window
 * @default ---------------------------------

 * @param Offset X
 * @parent Main Window
 * @desc Offset Ч
 * @type number
 * @min -1000
 * @default 0

 * @param Offset Y
 * @parent Main Window
 * @desc Offset Y
 * @type number
 * @min -1000
 * @default 0

 * @param Description Window
 * @default ---------------------------------

 * @param Description Offset X
 * @parent Description Window
 * @desc Description window offset X
 * @type number
 * @min -1000
 * @default 0

 * @param Description Y
 * @parent Description Window
 * @desc Description window Y
 * @type number
 * @default 0

 * @param Description Width
 * @parent Description Window
 * @desc Description window width
 * @type number
 * @default 400

 * @param Description Text Align
 * @parent Description Window
 * @desc Description window text align
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center

*/

/*:ru
 * @plugindesc v.2.1.0 [MV|MZ] Игровые режимы. Добавляет выбор игрового режима, когда игрок выбирает новую игру.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Game_Modes
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 2.1.0
 Релиз: 17.07.2021
 Первый релиз: 10.10.2017

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкция
 ###=========================================================================
 Плагин совместим с плагином DK Globals и другими аналогичными плагинами.
 Игровые режимы имеют параметры "Переключатель видимости"
 и "Переключатель доступности".
 Эти параметры работают только в том случае, если включен плагин DK Globals
 или аналогичный ему.
 Если у Вас не установлен ни один из подобных плагинов,
 то оставьте параметр нетронутым (значение 0).

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @param Modes
 * @text Режимы игры
 * @desc Режимы игры
 * @type struct<Mode>[]

 * @param Main Window
 * @text Основное окно
 * @default ---------------------------------

 * @param Offset X
 * @text Отступ окна по X
 * @parent Main Window
 * @desc Отступ окна по X
 * @type number
 * @min -1000
 * @default 0

 * @param Offset Y
 * @text Отступ окна по Y
 * @parent Main Window
 * @desc Отступ окна по Y
 * @type number
 * @min -1000
 * @default 0

 * @param Description Window
 * @text Окно описания
 * @default ---------------------------------

 * @param Description Offset X
 * @text Отступ окна по X
 * @parent Description Window
 * @desc Отступ окна по X
 * @type number
 * @min -1000
 * @default 0

 * @param Description Y
 * @text Отступ окна по Y
 * @parent Description Window
 * @desc Отступ окна по Y
 * @type number
 * @default 0

 * @param Description Width
 * @text Ширина окна
 * @parent Description Window
 * @desc Ширина окна
 * @type number
 * @default 400

 * @param Description Text Align
 * @text Выравнивание текста
 * @parent Description Window
 * @desc Выравнивание текста
 * @type combo
 * @option По левому краю
 * @value left
 * @option По центру
 * @value center
 * @option По правому краю
 * @value right
 * @default center

*/

/*~struct~Mode:

 * @param Name
 * @desc Name of the mode

 * @param Disabled Name
 * @desc Name of the disabled mode

 * @param Description
 * @desc Description of the mode

 * @param Disabled Description
 * @desc Description of the disabled mode

 * @param Switch
 * @text Activated Switch
 * @desc Switch that turns on when selecting a mode
 * @type switch
 * @default 0

 * @param Visible Switch
 * @desc A switch that is responsible for the visibility of the mode
 * @type switch
 * @default 0

 * @param Enabled Switch
 * @text Availability Switch
 * @desc A switch that is responsible for the availability of the mode
 * @type switch
 * @default 0

 * @param Map Id
 * @text Map
 * @desc Map number to which the player is transferred when selecting a mode
 * @type number
 * @min 1
 * @default 1

 * @param Map X
 * @text Coordinate X
 * @desc Coordinate X on the map where the player is transferred
 * @type number
 * @min 1
 * @default 1

 * @param Map Y
 * @text Coordinate Y
 * @desc Coordinate Y on the map where the player is transferred
 * @type number
 * @min 1
 * @default 1

 */

/*~struct~Mode:ru

 * @param Name
 * @text Название
 * @desc Название режима

 * @param Disabled Name
 * @text Название отключенного режима
 * @desc Название отключенного режима

 * @param Description
 * @text Описание
 * @desc Описание режима

 * @param Disabled Description
 * @text Описание отключенного режима
 * @desc Описание отключенного режима

 * @param Switch
 * @text Активируемый переключатель
 * @desc Переключатель, который включается при выборе режима
 * @type switch
 * @default 0

 * @param Visible Switch
 * @text Переключатель видимости
 * @desc Переключатель, который отвечает за видимость режима
 * @type switch
 * @default 0

 * @param Enabled Switch
 * @text Переключатель доступности
 * @desc Переключатель, который отвечает за доступность режима
 * @type switch
 * @default 0

 * @param Map Id
 * @text Карта
 * @desc Номер карты, на которую переносится игрок при выборе режима
 * @type number
 * @min 1
 * @default 1

 * @param Map X
 * @text Координата X
 * @desc Координата X на карте, куда переносится игрок
 * @type number
 * @min 0
 * @default 0

 * @param Map Y
 * @text Координата Y
 * @desc Координата Y на карте, куда переносится игрок
 * @type number
 * @min 0
 * @default 0

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Game_Modes'] = '2.1.0';

(function() {

    const parameters = PluginManager.parameters('DK_Game_Modes');
    const modes = JSON.parse(parameters['Modes']);
    const offsetX = parseInt(parameters['Offset X']) || 0;
    const offsetY = parseInt(parameters['Offset Y']) || 0;
    const descriptionWindowOffsetX = parseInt(parameters['Description Offset X']) || 0;
    const descriptionWindowY = parseInt(parameters['Description Y']) || 0;
    const descriptionWindowWidth = parseInt(parameters['Description Width']) || 400;
    const descriptionWindowAlign = parameters['Description Text Align'] || 'center';

    //===========================================================================
    // Scene_Title
    //===========================================================================

    const Game_Modes_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        Game_Modes_Scene_Title_create.apply(this, arguments);
        this.createGameModesWindow();
        this.createGameModesHelpWindow();
    };

    const Game_Modes_Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        DataManager.createGameObjects();

        this._gameModesWindow.refresh();

        if (this._gameModesWindow.maxItems() === 0) {
            console.warn(`Game modes: none of the modes are available`);

            Game_Modes_Scene_Title_commandNewGame.apply(this, arguments);
        } else {
            DataManager.setupNewGame();

            this._commandWindow.close();
            this._commandWindow.hide();
            this._gameModesWindow.show();
            this._gameModesWindow.activate();
            this._gameModesHelpWindow.show();
            this._gameModesHelpWindow.refresh();
        }
    };

    Scene_Title.prototype.createGameModesWindow = function() {
        const x = this._commandWindow.x + offsetX;
        const y = this._commandWindow.y + offsetY;

        this._gameModesWindow = new Window_GameModes(x, y, this._commandWindow);

        this._gameModesWindow.hide();
        this._gameModesWindow.setHandler('ok', this.onGameModeOk.bind(this));
        this._gameModesWindow.setHandler('cancel', this.onGameModeCancel.bind(this));

        this.addWindow(this._gameModesWindow);
    };

    Scene_Title.prototype.createGameModesHelpWindow = function() {
        this._gameModesHelpWindow = new Window_GameModesHelp();
        this._gameModesHelpWindow.hide();
        this._gameModesHelpWindow.refresh();
        this._gameModesHelpWindow.x =
            (Graphics.width - this._gameModesHelpWindow.width) / 2 + descriptionWindowOffsetX;
        this._gameModesHelpWindow.y = descriptionWindowY;

        this._gameModesWindow.setDescriptionWindow(this._gameModesHelpWindow);

        this.addWindow(this._gameModesHelpWindow);
    };

    Scene_Title.prototype.onGameModeOk = function() {
        const ext = this._gameModesWindow.currentExt();
        const switchId = parseInt(ext['Switch']);
        const mapId = parseInt(ext['Map Id']);
        const mapX = parseInt(ext['Map X']);
        const mapY = parseInt(ext['Map Y']);

        if (switchId > 0) {
            $gameSwitches.setValue(switchId, true);
        }

        $gamePlayer.reserveTransfer(mapId, mapX, mapY);

        this._gameModesWindow.close();

        this.fadeOutAll();

        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.onGameModeCancel = function() {
        this._gameModesWindow.hide();
        this._gameModesWindow.deactivate();
        this._gameModesHelpWindow.hide();

        this._commandWindow.show();
        this._commandWindow.activate();
    };

    //===========================================================================
    // Window_GameModes
    //===========================================================================

    class Window_GameModes extends Window_Command {

        initialize(x, y, commandWindow) {
            this._commandWindow = commandWindow;

            this.clearCommandList();
            this.makeCommandList();

            if (Utils.RPGMAKER_NAME === 'MV') {
                super.initialize(x, y);
            } else {
                super.initialize(new Rectangle(x, y, this.windowWidth(), this.windowHeight()));
            }
        }

        windowWidth() {
            return this._commandWindow.width;
        }

        windowHeight() {
            return Math.min(
                this.fittingHeight(this.maxRows()),
                this.fittingHeight(3),
                this._commandWindow.height);
        }

        makeCommandList() {
            modes.forEach((json) => {
                const mode = JSON.parse(json);
                const visibleSwitch = parseInt(mode['Visible Switch']);
                const enabledSwitch = parseInt(mode['Enabled Switch']);

                if (visibleSwitch === 0 || $gameSwitches.value(visibleSwitch)) {
                    const enabled = (enabledSwitch === 0 || $gameSwitches.value(enabledSwitch));
                    const name = (enabled ? mode['Name'] : mode['Disabled Name']);

                    this.addCommand(name || mode['Name'], 'ok', enabled, mode);
                }
            });
        }

        itemTextAlign() {
            return this._commandWindow.itemTextAlign();
        }

        setDescriptionWindow(window) {
            this._descriptionWindow = window;
        }

        select(index) {
            super.select(index);

            if (this._descriptionWindow) {
                this._descriptionWindow.setMode(this.currentExt(), this.isCurrentItemEnabled());
            }
        }

    }

    //===========================================================================
    // Window_GameModesHelp
    //===========================================================================

    class Window_GameModesHelp extends Window_Base {

        initialize() {
            const width = descriptionWindowWidth;
            const height = this.fittingHeight(1);

            if (Utils.RPGMAKER_NAME === 'MV') {
                super.initialize(0, 0, width, height);
            } else {
                super.initialize(new Rectangle(0, 0, width, height));
            }
        }

        setMode(mode, enabled) {
            if (this._mode !== mode || this._modeEnabled !== enabled) {
                this._mode = mode;
                this._modeEnabled = enabled;
                this.refresh();
            }
        }

        refresh() {
            let description;

            if (this._mode) {
                if (this._modeEnabled) {
                    if (this._mode['Description']) {
                        description = this._mode['Description'];
                    }
                } else if (this._mode['Disabled Description']) {
                    description = this._mode['Disabled Description'];
                }
            }

            if (this._mode && description) {
                this.contents.clear();
                this.drawText(description, 0, 0, this.contents.width, descriptionWindowAlign);
                this.open();
            } else {
                this.contents.clear();
                this.close();
            }
        }

    }

}());
