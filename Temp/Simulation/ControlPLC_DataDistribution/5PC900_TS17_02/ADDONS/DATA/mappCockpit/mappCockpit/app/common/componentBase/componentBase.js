var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./componentSettings", "../persistence/persistDataProvider", "../componentFactory/componentDefinition", "../../framework/componentHub/bindings/bindings", "../../framework/events", "./eventSubComponentsLoadedArgs", "./eventComponentSettingsLoadedArgs"], function (require, exports, componentSettings_1, persistDataProvider_1, componentDefinition_1, bindings_1, events_1, eventSubComponentsLoadedArgs_1, eventComponentSettingsLoadedArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSubComponentsLoaded = /** @class */ (function (_super) {
        __extends(EventSubComponentsLoaded, _super);
        function EventSubComponentsLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSubComponentsLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentSettingsLoaded = /** @class */ (function (_super) {
        __extends(EventComponentSettingsLoaded, _super);
        function EventComponentSettingsLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentSettingsLoaded;
    }(events_1.TypedEvent));
    ;
    var ComponentBase = /** @class */ (function () {
        /**
         * Creates an instance of ComponentBase
         * @param {(IComponentFactory|undefined)} componentFactory
         * @param {*} owner
         * @memberof ComponentBase
         */
        function ComponentBase(componentFactory, owner) {
            this.eventSubComponentsLoaded = new EventSubComponentsLoaded();
            this.eventComponentSettingsLoaded = new EventComponentSettingsLoaded();
            /**
             * Main definition of this component(e.g. type, id, default settings data id)
             *
             * @type {ComponentDefinition}
             * @memberof ComponentBase
             */
            this._definition = new componentDefinition_1.ComponentDefinition("", "", ""); // Create default component definition
            /**
             * List of all created sub components after loading settings data
             *
             * @protected
             * @type {{ [id: string]: any; }}
             * @memberof ComponentBase
             */
            this._subComponents = {};
            /**
             * Data of this component will not be persisted if this flag is false
             *
             * @memberof ComponentBase
             */
            this._persistData = true;
            this._componentSettings = new componentSettings_1.ComponentSettings();
            this._componentFactory = componentFactory;
            this._owner = owner;
        }
        Object.defineProperty(ComponentBase.prototype, "componentFactory", {
            /**
             * Returns the component factory
             *
             * @readonly
             * @type {(IComponentFactory | undefined)}
             * @memberof ComponentBase
             */
            get: function () {
                return this._componentFactory;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Disable persisting of data for this component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.disablePersisting = function () {
            this._persistData = false;
        };
        /**
         * Returns persist state of component
         *
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getPersistency = function () {
            return this._persistData;
        };
        /**
         * Initialize the component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.initialize = function () {
            this._owner.initializeComponent();
            //this.logComponentDependencies();
            this.addDefaultComponentSettings();
            this.addAdditionalDefaultComponentSettings();
        };
        /**
         * Logs the default component dependencies(subcomponents, bindings, ...)
         *
         * @private
         * @memberof ComponentBase
         */
        /*private logComponentDependencies(){
            if(this._defaultDefinition != undefined){
                let defaultComponentSettings = this._defaultDefinition.getDefaultComponentSettings();
                if(defaultComponentSettings != undefined){
                    let dependencies = "";
                    let bindingsInfo = "";
    
                    let subComponents = defaultComponentSettings.getSubComponentSettings();
                    if(subComponents != undefined){
                        subComponents.forEach(subComponent => {
                            dependencies += subComponent.type + "; ";
                        });
                    }
                    let bindings = defaultComponentSettings.getBindingSettings();
                    if(bindings != undefined){
                        bindings.forEach(binding => {
                            bindingsInfo += binding.id + "; ";
                        });
                    }
                    if(bindingsInfo != ""){
                        console.error("Comp: " + this._owner.constructor.name + "; CompDeps: " + dependencies + "=> Bdgs: " + bindingsInfo);
                    }
                    else{
                        console.error("Comp: " + this._owner.constructor.name + "; CompDeps: " + dependencies);
                    }
                }
            }
            
        }*/
        /**
         * Raises the subComponentsLoaded event
         *
         * @param {ComponentBase} sender
         * @param {EventSubComponentsLoadedArgs} data
         * @memberof ComponentBase
         */
        ComponentBase.prototype.onSubComponentsLoaded = function (sender, data) {
            this.eventSubComponentsLoaded.raise(sender, data);
        };
        /**
         * Raises the componentSettingsLoaded event
         *
         * @param {ComponentBase} sender
         * @param {EventComponentSettingsLoadedArgs} data
         * @memberof ComponentBase
         */
        ComponentBase.prototype.onComponentSettingsLoaded = function (sender, data) {
            this.eventComponentSettingsLoaded.raise(sender, data);
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getComponentSettings = function (onlyModified) {
            if (onlyModified === void 0) { onlyModified = false; }
            return this._componentSettings.getSettings(onlyModified);
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this._componentSettings.setSettings(settings);
                var defaultSettingsData = this.getDefaultSettingsData();
                if (defaultSettingsData != undefined) {
                    // Currently SubComponent and Binding settings are static and were not saved, therefore the default settings must be used
                    var defaultSubComponentSettings = defaultSettingsData.getSubComponentSettings();
                    var subComponentSettings = this._componentSettings.getSubComponentSettings();
                    if (subComponentSettings == undefined && defaultSubComponentSettings != undefined) {
                        // Use default sub component settings if no sub component settings are available
                        this._componentSettings.setSubComponentSettings(defaultSubComponentSettings);
                    }
                    var defaultBindingSettings = defaultSettingsData.getBindingSettings();
                    var bindingSettings = this._componentSettings.getBindingSettings();
                    if (bindingSettings == undefined && defaultBindingSettings != undefined) {
                        // Use default binding settings if no sub component settings are available
                        this._componentSettings.setBindingSettings(defaultBindingSettings);
                    }
                }
            }
        };
        /**
         * Saves the component settings to the persisting data provider
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.saveComponentSettings = function () {
            if (this._persistData == true) {
                if (this.id != "") {
                    // Only persist if data was modified
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.id, this._owner.getComponentSettings(true));
                }
                else {
                    console.warn("No id for persisting data available!(ComponentBase) => " + this.type);
                    console.warn(this);
                }
            }
        };
        /**
         * Loads the component settings from the persisting data provider(default or persisted data if available) to the component base,
         * and creates the subcomponents
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.loadComponentSettings = function () {
            var componentSettings = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(this.id);
            if (this.useDefaultComponentSettings(componentSettings) == true) {
                componentSettings = this.getDefaultSettingsData();
            }
            // Get sub component settings of the component settings object or default if not available
            var subComponentSettings = this.getSubComponentSettings(componentSettings);
            // Create sub component before set settings to the owner of this component base (because sub components are sometimes needed in the owner setComponentSettings method)
            this.createSubComponents(subComponentSettings);
            // Raise sub components loaded event
            this.onSubComponentsLoaded(this, new eventSubComponentsLoadedArgs_1.EventSubComponentsLoadedArgs(this.getSubComponentsArray()));
            // Set the component settings
            this._owner.setComponentSettings(componentSettings);
            // Raise components settings loaded event
            this.onComponentSettingsLoaded(this, new eventComponentSettingsLoadedArgs_1.EventComponentSettingsLoadedArgs());
        };
        /**
         * Returns an array with the current sub components
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponentsArray = function () {
            var _this = this;
            var subComponents = new Array();
            var keys = Object.keys(this._subComponents);
            keys.forEach(function (key) {
                subComponents.push(_this._subComponents[key]);
            });
            return subComponents;
        };
        /**
         * Returns the sub component settings of the component settings object or default if not available
         *
         * @private
         * @param {(ComponentSettings|undefined)} componentSettings
         * @returns {(ComponentDefinition[]|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponentSettings = function (componentSettings) {
            var subComponentSettings;
            if (componentSettings != undefined) {
                // Complete ComponentSetting object not available so we have to use the data array and the id to get the subcomponents data => getSubComponentSettings is not working here
                subComponentSettings = componentSettings.data[componentSettings_1.ComponentSettings.SubComponentsSettingId];
                if (subComponentSettings == undefined) {
                    var defaultSettingsData = this.getDefaultSettingsData();
                    if (defaultSettingsData != undefined) {
                        // Currently SubComponent and Binding settings are static and were not saved, therefore the default settings must be used
                        subComponentSettings = defaultSettingsData.getSubComponentSettings();
                    }
                }
            }
            return subComponentSettings;
        };
        /**
         * Returns true if no components settings are defined, or if persisting is deactivated, or version of component settings is not supported
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.useDefaultComponentSettings = function (componentSettings) {
            if (componentSettings == undefined) {
                return true;
            }
            if (this._persistData == false) {
                return true;
            }
            if (this.isComponentSupportingSettings(componentSettings) == false) {
                return true;
            }
            return false;
        };
        /**
         * Check if the settings version is supported in this component version (equal versions are supported => only major version is checked)
         * major.minor => x.y (e.g)
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.isComponentSupportingSettings = function (componentSettings) {
            var splittedSettingsVersion = componentSettings.version.split(".");
            var splittedComponentVersion = this._componentSettings.version.split(".");
            var settingVersionNumber = parseInt(splittedSettingsVersion[0], 10);
            var settingComponentNumber = parseInt(splittedComponentVersion[0], 10);
            // Currently only equal versions are allowed
            if (settingVersionNumber == settingComponentNumber) {
                return true;
            }
            return false;
        };
        /**
         * Adds the default component settings to the default settings provider
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addDefaultComponentSettings = function () {
            // Is a default persisting data id definied
            if (this.defaultSettingsDataId != "") {
                // Is some default persisting data defined
                if (this._defaultDefinition != undefined) {
                    var defaultComponentSettings = this._defaultDefinition.getDefaultComponentSettings();
                    if (defaultComponentSettings != undefined) {
                        // Add default persisting definition to the default persisting data provider
                        this.addComponentDefaultDefinitionToProvider(this.defaultSettingsDataId, defaultComponentSettings);
                    }
                }
            }
        };
        /**
         * Adds the addiional defined default definitions which are defined in the defaultDefiniton to the defaultDefinitionProvider
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addAdditionalDefaultComponentSettings = function () {
            var _this = this;
            if (this._defaultDefinition != undefined) {
                var additionalDefaultComponentSettingsPackages = this._defaultDefinition.getAdditionalDefaultComponentSettings();
                if (additionalDefaultComponentSettingsPackages != undefined) {
                    additionalDefaultComponentSettingsPackages.forEach(function (settingsPackage) {
                        _this.addComponentDefaultDefinitionToProvider(settingsPackage.id, settingsPackage.defaultSettings);
                    });
                }
            }
        };
        /**
         * Adds the given default component settings to the default persisting data provider(TODO: should be a seperated default componentSettings provider)
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addComponentDefaultDefinitionToProvider = function (id, settings) {
            if (settings == undefined) {
                console.error("No default persisting data available for id: " + id);
            }
            else {
                persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(id, settings);
            }
        };
        ComponentBase.prototype.addSubComponent = function (type, id, defaultSettingsDataId, context) {
            if (defaultSettingsDataId === void 0) { defaultSettingsDataId = ""; }
            if (context === void 0) { context = undefined; }
            // Only add dynamic sub components to component settings if they should be persisted
            // this.getComponentSettings().addSubComponent(type, id, defaultInstanceDataId);
            var instance = this.createComponentInstance(new componentDefinition_1.ComponentDefinition(type, id, defaultSettingsDataId), context);
            if (instance != undefined) {
                this._subComponents[instance.component._definition.id] = instance;
            }
            return instance;
        };
        /**
         * Returns subcomponent for the given id
         *
         * @param {string} id
         * @returns {IComponent}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponent = function (id) {
            return this._subComponents[id];
        };
        ComponentBase.prototype.setBindingsData = function () {
            // Set bindings needed for this component
            var bindings = this.getSetting(componentSettings_1.ComponentSettings.BindingsSettingId);
            this.createBindings(bindings);
        };
        Object.defineProperty(ComponentBase.prototype, "type", {
            get: function () {
                return this._definition.type;
            },
            set: function (value) {
                this._definition.type = value;
                // Additionaly set type in componentSettings
                this._componentSettings.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "id", {
            get: function () {
                return this._definition.id;
            },
            set: function (value) {
                this._definition.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "defaultSettingsDataId", {
            /**
             * Returns the defaultSettingsData id (the component uses this data at startup if no persited data is available for this component)
             *
             * @type {string}
             * @memberof ComponentBase
             */
            get: function () {
                return this._definition.defaultSettingsDataId;
            },
            /**
             * Sets the defaultSettingsDataid (the component uses this data at startup if no persited data is available for this component)
             *
             * @memberof ComponentBase
             */
            set: function (value) {
                this._definition.defaultSettingsDataId = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the componentDefaultDefinition
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setDefaultDefinition = function (value) {
            if (value != undefined) {
                this.defaultSettingsDataId = value.defaultComponentSettingsId;
            }
            else {
                this.defaultSettingsDataId = "";
            }
            this._defaultDefinition = value;
        };
        /**
         * Returns the setting for the given key
         *
         * @param {string} key
         * @returns {(any|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSetting = function (key) {
            var setting = undefined;
            if (this._componentSettings != undefined) {
                setting = this._componentSettings.getValue(key);
            }
            return setting;
        };
        /**
         * Sets a new setting with the given key and value to the componentSettings
         *
         * @param {string} key
         * @param {*} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setSetting = function (key, value) {
            if (this._componentSettings != undefined) {
                this._componentSettings.setValue(key, value);
            }
            else {
                console.error("ComponentSettings not available for setting data!");
            }
        };
        /**
         * Returns the coomponentDefinition of this component(type, id, defaultDataId)
         *
         * @returns {ComponentDefinition}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefinition = function () {
            return this._definition;
        };
        /**
         * Sets the componentDefinition of this component(type, id, defaultDataId)
         *
         * @param {ComponentDefinition} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setDefinition = function (value) {
            var defaultSettingsDataId = this._definition.defaultSettingsDataId;
            this._definition = value;
            if (this._definition.defaultSettingsDataId == "") {
                this._definition.defaultSettingsDataId = defaultSettingsDataId; // Use old settings data id if not defined in the new one
            }
            // set type also to the component settings
            this._componentSettings.type = this._definition.type;
        };
        /**
         * Creates components for the given component definitions and add them to the sub components list of this component
         *
         * @protected
         * @param {Array<ComponentDefinition>} componentDefinitions
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createSubComponents = function (componentDefinitions) {
            if (componentDefinitions != undefined) {
                for (var i = 0; i < componentDefinitions.length; i++) {
                    var componentDef = componentDefinitions[i];
                    var instance = this.createComponentInstance(componentDef, this.context);
                    if (instance != undefined) {
                        this._subComponents[instance.component._definition.id] = instance;
                    }
                }
            }
        };
        /**
         * Creates a component instance with the given component definition if the component factory is available
         *
         * @private
         * @param {ComponentDefinition} componentDef
         * @returns {(IComponent|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createComponentInstance = function (componentDef, context) {
            if (this._componentFactory != undefined) {
                var instance = this._componentFactory.create(componentDef, context);
                if (instance != undefined) {
                    return instance;
                }
            }
            else {
                console.error("ComponentFactory not available!");
            }
            return undefined;
        };
        /**
         * Creates the bindings an binds them
         *
         * @protected
         * @param {Array<Binding>} bindings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createBindings = function (bindings) {
            if (bindings != undefined) {
                for (var i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    // create new binding for this component (binding component = this.owner => e.g. widget, datamodel, ...)
                    bindings_1.Bindings.create(binding.type, binding.dataType, this._owner, binding.scope, binding.id, binding.targetKey, binding.sourceKey, binding.passByValue, this.context);
                }
            }
        };
        /**
         * Returns the default settings data which should be used for default startup of this component or undefined if not available
         *
         * @private
         * @returns {(ComponentSettings|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefaultSettingsData = function () {
            if (this._definition.defaultSettingsDataId != "") {
                return persistDataProvider_1.PersistDataProvider.getInstance().getDefaultDataWithId(this._definition.defaultSettingsDataId);
            }
            return undefined;
        };
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBdUMsNENBQXVEO1FBQTlGOztRQUFnRyxDQUFDO1FBQUQsK0JBQUM7SUFBRCxDQUFDLEFBQWpHLENBQXVDLG1CQUFVLEdBQWdEO0lBQUEsQ0FBQztJQUNsRztRQUEyQyxnREFBMkQ7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCxtQ0FBQztJQUFELENBQUMsQUFBekcsQ0FBMkMsbUJBQVUsR0FBb0Q7SUFBQSxDQUFDO0lBRTFHO1FBdUdJOzs7OztXQUtHO1FBQ0gsdUJBQVksZ0JBQTZDLEVBQUUsS0FBVTtZQTNHckUsNkJBQXdCLEdBQTZCLElBQUksd0JBQXdCLEVBQUUsQ0FBQztZQUNwRixpQ0FBNEIsR0FBaUMsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBOEJoRzs7Ozs7ZUFLRztZQUNLLGdCQUFXLEdBQXdCLElBQUkseUNBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztZQVd0SDs7Ozs7O2VBTUc7WUFDSyxtQkFBYyxHQUFrQyxFQUFFLENBQUM7WUFvQjNEOzs7O2VBSUc7WUFDSyxpQkFBWSxHQUFZLElBQUksQ0FBQztZQTRCakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQXBGRCxzQkFBVywyQ0FBZ0I7WUFQM0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7OztXQUFBO1FBcURE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RSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDbkMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQix3R0FBd0c7b0JBQ3hHLG1CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JLO2FBQ1Q7UUFDRixDQUFDO1FBRUU7Ozs7OztXQU1HO1FBQ0ssOENBQXNCLEdBQTlCO1lBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsRUFBQztnQkFDNUMsT0FBTyx5Q0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDekc7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBcG1CRCxJQW9tQkM7SUFwbUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2JpbmRpbmdcIjtcclxuaW1wb3J0IHsgQmluZGluZ3MgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9iaW5kaW5nc1wiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2ludGVyZmFjZXMvY29tcG9uZW50RmFjdG9yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuL2NvbXBvbmVudENvbnRleHRcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50U3ViQ29tcG9uZW50c0xvYWRlZEFyZ3MgfSBmcm9tIFwiLi9ldmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzXCI7XHJcbmltcG9ydCB7IEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnREZWZhdWx0RGVmaW5pdGlvbkludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxDb21wb25lbnRCYXNlLCBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8Q29tcG9uZW50QmFzZSwgRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xyXG4gICAgIFxyXG4gICAgZXZlbnRTdWJDb21wb25lbnRzTG9hZGVkOiBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWQgPSBuZXcgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkKCk7XHJcbiAgICBldmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkOiBFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkID0gbmV3IEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudEZhY3RvcnkgaW5zdGFuY2UgbmVlZGVkIGZvciBjcmVhdGluZyBuZXcgc3ViIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeTogSUNvbXBvbmVudEZhY3RvcnkgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyBzb21lIGNvbnRleHQgaW5mb3JtYXRpb25zKGUuZy4gaWQgaWYgY29tcG9uZW50ID0+IGdBeGlzMDEpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IGZhY3RvcnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoSUNvbXBvbmVudEZhY3RvcnkgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRGYWN0b3J5KCk6IElDb21wb25lbnRGYWN0b3J5IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50RmFjdG9yeTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIGRlZmluaXRpb24gb2YgdGhpcyBjb21wb25lbnQoZS5nLiB0eXBlLCBpZCwgZGVmYXVsdCBzZXR0aW5ncyBkYXRhIGlkKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtDb21wb25lbnREZWZpbml0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGVmaW5pdGlvbjogQ29tcG9uZW50RGVmaW5pdGlvbiA9IG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiXCIsIFwiXCIsIFwiXCIpOyAvLyBDcmVhdGUgZGVmYXVsdCBjb21wb25lbnQgZGVmaW5pdGlvblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBkZWZpbml0aW9uIGluZm9ybWF0aW9uIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RGVmaW5pdGlvbjogSUNvbXBvbmVudERlZmF1bHREZWZpbml0aW9ufHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgYWxsIGNyZWF0ZWQgc3ViIGNvbXBvbmVudHMgYWZ0ZXIgbG9hZGluZyBzZXR0aW5ncyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge3sgW2lkOiBzdHJpbmddOiBhbnk7IH19XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdWJDb21wb25lbnRzOiB7IFtpZDogc3RyaW5nXTogSUNvbXBvbmVudDsgfSA9IHt9OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvd25lciBvZiB0aGlzIGNvbXBvbmVudCBvYmplY3QoZS5nLiBhIHdpZGdldCwgYSBkYXRhbW9kZWwsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lDb21wb25lbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vd25lcjogSUNvbXBvbmVudDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudFNldHRpbmdzITogQ29tcG9uZW50U2V0dGluZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIG9mIHRoaXMgY29tcG9uZW50IHdpbGwgbm90IGJlIHBlcnNpc3RlZCBpZiB0aGlzIGZsYWcgaXMgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wZXJzaXN0RGF0YTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIHBlcnNpc3Rpbmcgb2YgZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZVBlcnNpc3RpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdERhdGEgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcGVyc2lzdCBzdGF0ZSBvZiBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXJzaXN0ZW5jeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGVyc2lzdERhdGE7XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKiBAcGFyYW0geyhJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQpfSBjb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKiBAcGFyYW0geyp9IG93bmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQsIG93bmVyOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5fb3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLl9vd25lci5pbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgLy90aGlzLmxvZ0NvbXBvbmVudERlcGVuZGVuY2llcygpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2dzIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBkZXBlbmRlbmNpZXMoc3ViY29tcG9uZW50cywgYmluZGluZ3MsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgLypwcml2YXRlIGxvZ0NvbXBvbmVudERlcGVuZGVuY2llcygpe1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZmF1bHREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgPSB0aGlzLl9kZWZhdWx0RGVmaW5pdGlvbi5nZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgaWYoZGVmYXVsdENvbXBvbmVudFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVwZW5kZW5jaWVzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5kaW5nc0luZm8gPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzdWJDb21wb25lbnRzID0gZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldFN1YkNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdWJDb21wb25lbnRzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViQ29tcG9uZW50cy5mb3JFYWNoKHN1YkNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llcyArPSBzdWJDb21wb25lbnQudHlwZSArIFwiOyBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBiaW5kaW5ncyA9IGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRCaW5kaW5nU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIGlmKGJpbmRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3NJbmZvICs9IGJpbmRpbmcuaWQgKyBcIjsgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihiaW5kaW5nc0luZm8gIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXA6IFwiICsgdGhpcy5fb3duZXIuY29uc3RydWN0b3IubmFtZSArIFwiOyBDb21wRGVwczogXCIgKyBkZXBlbmRlbmNpZXMgKyBcIj0+IEJkZ3M6IFwiICsgYmluZGluZ3NJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXA6IFwiICsgdGhpcy5fb3duZXIuY29uc3RydWN0b3IubmFtZSArIFwiOyBDb21wRGVwczogXCIgKyBkZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIHN1YkNvbXBvbmVudHNMb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBvblN1YkNvbXBvbmVudHNMb2FkZWQoc2VuZGVyOiBDb21wb25lbnRCYXNlLCBkYXRhOiBFdmVudFN1YkNvbXBvbmVudHNMb2FkZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFN1YkNvbXBvbmVudHNMb2FkZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgY29tcG9uZW50U2V0dGluZ3NMb2FkZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJhc2V9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgb25Db21wb25lbnRTZXR0aW5nc0xvYWRlZChzZW5kZXI6IENvbXBvbmVudEJhc2UsIGRhdGE6IEV2ZW50Q29tcG9uZW50U2V0dGluZ3NMb2FkZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudFNldHRpbmdzTG9hZGVkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbiA9IGZhbHNlKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLmdldFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIFNldHMgc2V0dGluZ3MgdG8gdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzRGF0YSA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzRGF0YSgpO1xyXG4gICAgICAgICAgICBpZihkZWZhdWx0U2V0dGluZ3NEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBDdXJyZW50bHkgU3ViQ29tcG9uZW50IGFuZCBCaW5kaW5nIHNldHRpbmdzIGFyZSBzdGF0aWMgYW5kIHdlcmUgbm90IHNhdmVkLCB0aGVyZWZvcmUgdGhlIGRlZmF1bHQgc2V0dGluZ3MgbXVzdCBiZSB1c2VkXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFN1YkNvbXBvbmVudFNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzRGF0YS5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YkNvbXBvbmVudFNldHRpbmdzID0gdGhpcy5fY29tcG9uZW50U2V0dGluZ3MuZ2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1YkNvbXBvbmVudFNldHRpbmdzID09IHVuZGVmaW5lZCAmJiBkZWZhdWx0U3ViQ29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgZGVmYXVsdCBzdWIgY29tcG9uZW50IHNldHRpbmdzIGlmIG5vIHN1YiBjb21wb25lbnQgc2V0dGluZ3MgYXJlIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnNldFN1YkNvbXBvbmVudFNldHRpbmdzKGRlZmF1bHRTdWJDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRCaW5kaW5nU2V0dGluZ3MgPSBkZWZhdWx0U2V0dGluZ3NEYXRhLmdldEJpbmRpbmdTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmRpbmdTZXR0aW5ncyA9IHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLmdldEJpbmRpbmdTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ1NldHRpbmdzID09IHVuZGVmaW5lZCAmJiBkZWZhdWx0QmluZGluZ1NldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIGRlZmF1bHQgYmluZGluZyBzZXR0aW5ncyBpZiBubyBzdWIgY29tcG9uZW50IHNldHRpbmdzIGFyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRCaW5kaW5nU2V0dGluZ3MoZGVmYXVsdEJpbmRpbmdTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSBjb21wb25lbnQgc2V0dGluZ3MgdG8gdGhlIHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlQ29tcG9uZW50U2V0dGluZ3MoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fcGVyc2lzdERhdGEgPT0gdHJ1ZSl7ICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5pZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgcGVyc2lzdCBpZiBkYXRhIHdhcyBtb2RpZmllZFxyXG4gICAgICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQodGhpcy5pZCwgdGhpcy5fb3duZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3ModHJ1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJObyBpZCBmb3IgcGVyc2lzdGluZyBkYXRhIGF2YWlsYWJsZSEoQ29tcG9uZW50QmFzZSkgPT4gXCIgKyB0aGlzLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBmcm9tIHRoZSBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXIoZGVmYXVsdCBvciBwZXJzaXN0ZWQgZGF0YSBpZiBhdmFpbGFibGUpIHRvIHRoZSBjb21wb25lbnQgYmFzZSxcclxuICAgICAqIGFuZCBjcmVhdGVzIHRoZSBzdWJjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRDb21wb25lbnRTZXR0aW5ncygpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCA9IFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhV2l0aElkKHRoaXMuaWQpIGFzIENvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgICAgIGlmKHRoaXMudXNlRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgY29tcG9uZW50U2V0dGluZ3MgPSB0aGlzLmdldERlZmF1bHRTZXR0aW5nc0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR2V0IHN1YiBjb21wb25lbnQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBvYmplY3Qgb3IgZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IHN1YkNvbXBvbmVudFNldHRpbmdzID0gdGhpcy5nZXRTdWJDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIHN1YiBjb21wb25lbnQgYmVmb3JlIHNldCBzZXR0aW5ncyB0byB0aGUgb3duZXIgb2YgdGhpcyBjb21wb25lbnQgYmFzZSAoYmVjYXVzZSBzdWIgY29tcG9uZW50cyBhcmUgc29tZXRpbWVzIG5lZWRlZCBpbiB0aGUgb3duZXIgc2V0Q29tcG9uZW50U2V0dGluZ3MgbWV0aG9kKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3ViQ29tcG9uZW50cyhzdWJDb21wb25lbnRTZXR0aW5ncyk7IFxyXG5cclxuICAgICAgICAvLyBSYWlzZSBzdWIgY29tcG9uZW50cyBsb2FkZWQgZXZlbnRcclxuICAgICAgICB0aGlzLm9uU3ViQ29tcG9uZW50c0xvYWRlZCh0aGlzLCBuZXcgRXZlbnRTdWJDb21wb25lbnRzTG9hZGVkQXJncyh0aGlzLmdldFN1YkNvbXBvbmVudHNBcnJheSgpKSk7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5fb3duZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG5cclxuICAgICAgICAvLyBSYWlzZSBjb21wb25lbnRzIHNldHRpbmdzIGxvYWRlZCBldmVudFxyXG4gICAgICAgIHRoaXMub25Db21wb25lbnRTZXR0aW5nc0xvYWRlZCh0aGlzLCBuZXcgRXZlbnRDb21wb25lbnRTZXR0aW5nc0xvYWRlZEFyZ3MoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGN1cnJlbnQgc3ViIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJDb21wb25lbnRzQXJyYXkoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcbiAgICAgICAgbGV0IHN1YkNvbXBvbmVudHMgPSBuZXcgQXJyYXk8SUNvbXBvbmVudD4oKTtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3N1YkNvbXBvbmVudHMpO1xyXG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBzdWJDb21wb25lbnRzLnB1c2godGhpcy5fc3ViQ29tcG9uZW50c1trZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3ViQ29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1YiBjb21wb25lbnQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyBvYmplY3Qgb3IgZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudERlZmluaXRpb25bXXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKTogQ29tcG9uZW50RGVmaW5pdGlvbltdfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc3ViQ29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudERlZmluaXRpb25bXXx1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQ29tcGxldGUgQ29tcG9uZW50U2V0dGluZyBvYmplY3Qgbm90IGF2YWlsYWJsZSBzbyB3ZSBoYXZlIHRvIHVzZSB0aGUgZGF0YSBhcnJheSBhbmQgdGhlIGlkIHRvIGdldCB0aGUgc3ViY29tcG9uZW50cyBkYXRhID0+IGdldFN1YkNvbXBvbmVudFNldHRpbmdzIGlzIG5vdCB3b3JraW5nIGhlcmVcclxuICAgICAgICAgICAgc3ViQ29tcG9uZW50U2V0dGluZ3MgPSAgY29tcG9uZW50U2V0dGluZ3MuZGF0YVtDb21wb25lbnRTZXR0aW5ncy5TdWJDb21wb25lbnRzU2V0dGluZ0lkXTtcclxuICAgICAgICAgICAgaWYoc3ViQ29tcG9uZW50U2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NEYXRhID0gdGhpcy5nZXREZWZhdWx0U2V0dGluZ3NEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkZWZhdWx0U2V0dGluZ3NEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudGx5IFN1YkNvbXBvbmVudCBhbmQgQmluZGluZyBzZXR0aW5ncyBhcmUgc3RhdGljIGFuZCB3ZXJlIG5vdCBzYXZlZCwgdGhlcmVmb3JlIHRoZSBkZWZhdWx0IHNldHRpbmdzIG11c3QgYmUgdXNlZFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YkNvbXBvbmVudFNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzRGF0YS5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBubyBjb21wb25lbnRzIHNldHRpbmdzIGFyZSBkZWZpbmVkLCBvciBpZiBwZXJzaXN0aW5nIGlzIGRlYWN0aXZhdGVkLCBvciB2ZXJzaW9uIG9mIGNvbXBvbmVudCBzZXR0aW5ncyBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXNlRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpOiBib29sZWFue1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFNldHRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzQ29tcG9uZW50U3VwcG9ydGluZ1NldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgc2V0dGluZ3MgdmVyc2lvbiBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBjb21wb25lbnQgdmVyc2lvbiAoZXF1YWwgdmVyc2lvbnMgYXJlIHN1cHBvcnRlZCA9PiBvbmx5IG1ham9yIHZlcnNpb24gaXMgY2hlY2tlZClcclxuICAgICAqIG1ham9yLm1pbm9yID0+IHgueSAoZS5nKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudFNldHRpbmdzfSBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzQ29tcG9uZW50U3VwcG9ydGluZ1NldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzcGxpdHRlZFNldHRpbmdzVmVyc2lvbiA9IGNvbXBvbmVudFNldHRpbmdzLnZlcnNpb24uc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBzcGxpdHRlZENvbXBvbmVudFZlcnNpb24gPSB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdWZXJzaW9uTnVtYmVyID0gcGFyc2VJbnQoc3BsaXR0ZWRTZXR0aW5nc1ZlcnNpb25bMF0sIDEwKTtcclxuICAgICAgICBsZXQgc2V0dGluZ0NvbXBvbmVudE51bWJlciA9IHBhcnNlSW50KHNwbGl0dGVkQ29tcG9uZW50VmVyc2lvblswXSwgMTApO1xyXG4gICAgICAgIC8vIEN1cnJlbnRseSBvbmx5IGVxdWFsIHZlcnNpb25zIGFyZSBhbGxvd2VkXHJcbiAgICAgICAgaWYoc2V0dGluZ1ZlcnNpb25OdW1iZXIgPT0gc2V0dGluZ0NvbXBvbmVudE51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgdG8gdGhlIGRlZmF1bHQgc2V0dGluZ3MgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIC8vIElzIGEgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgaWQgZGVmaW5pZWRcclxuICAgICAgICBpZih0aGlzLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgLy8gSXMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBkZWZpbmVkXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RlZmF1bHREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzID0gdGhpcy5fZGVmYXVsdERlZmluaXRpb24uZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVmYXVsdCBwZXJzaXN0aW5nIGRlZmluaXRpb24gdG8gdGhlIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnREZWZhdWx0RGVmaW5pdGlvblRvUHJvdmlkZXIodGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQsIGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBhZGRpaW9uYWwgZGVmaW5lZCBkZWZhdWx0IGRlZmluaXRpb25zIHdoaWNoIGFyZSBkZWZpbmVkIGluIHRoZSBkZWZhdWx0RGVmaW5pdG9uIHRvIHRoZSBkZWZhdWx0RGVmaW5pdGlvblByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZmF1bHREZWZpbml0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzUGFja2FnZXMgPSB0aGlzLl9kZWZhdWx0RGVmaW5pdGlvbi5nZXRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGlmKGFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NQYWNrYWdlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1BhY2thZ2VzLmZvckVhY2goc2V0dGluZ3NQYWNrYWdlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uVG9Qcm92aWRlcihzZXR0aW5nc1BhY2thZ2UuaWQsIHNldHRpbmdzUGFja2FnZS5kZWZhdWx0U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyB0byB0aGUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXIoVE9ETzogc2hvdWxkIGJlIGEgc2VwZXJhdGVkIGRlZmF1bHQgY29tcG9uZW50U2V0dGluZ3MgcHJvdmlkZXIpXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZENvbXBvbmVudERlZmF1bHREZWZpbml0aW9uVG9Qcm92aWRlcihpZDogc3RyaW5nLCBzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3Mpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBhdmFpbGFibGUgZm9yIGlkOiBcIiArIGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERlZmF1bHREYXRhV2l0aElkKGlkLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgYWRkU3ViQ29tcG9uZW50KHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdFNldHRpbmdzRGF0YUlkOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIC8vIE9ubHkgYWRkIGR5bmFtaWMgc3ViIGNvbXBvbmVudHMgdG8gY29tcG9uZW50IHNldHRpbmdzIGlmIHRoZXkgc2hvdWxkIGJlIHBlcnNpc3RlZFxyXG4gICAgICAgIC8vIHRoaXMuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKS5hZGRTdWJDb21wb25lbnQodHlwZSwgaWQsIGRlZmF1bHRJbnN0YW5jZURhdGFJZCk7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbih0eXBlLCBpZCwgZGVmYXVsdFNldHRpbmdzRGF0YUlkKSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYoaW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc3ViY29tcG9uZW50IGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtJQ29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YkNvbXBvbmVudChpZDogc3RyaW5nKTogSUNvbXBvbmVudHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViQ29tcG9uZW50c1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJpbmRpbmdzRGF0YSgpe1xyXG4gICAgICAgIC8vIFNldCBiaW5kaW5ncyBuZWVkZWQgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5nZXRTZXR0aW5nKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKGJpbmRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi50eXBlID0gdmFsdWU7XHJcbiAgICAgICAgLy8gQWRkaXRpb25hbHkgc2V0IHR5cGUgaW4gY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uLmlkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0U2V0dGluZ3NEYXRhIGlkICh0aGUgY29tcG9uZW50IHVzZXMgdGhpcyBkYXRhIGF0IHN0YXJ0dXAgaWYgbm8gcGVyc2l0ZWQgZGF0YSBpcyBhdmFpbGFibGUgZm9yIHRoaXMgY29tcG9uZW50KVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHRTZXR0aW5nc0RhdGFpZCAodGhlIGNvbXBvbmVudCB1c2VzIHRoaXMgZGF0YSBhdCBzdGFydHVwIGlmIG5vIHBlcnNpdGVkIGRhdGEgaXMgYXZhaWxhYmxlIGZvciB0aGlzIGNvbXBvbmVudClcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbXBvbmVudERlZmF1bHREZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERlZmF1bHREZWZpbml0aW9uKHZhbHVlOiBJQ29tcG9uZW50RGVmYXVsdERlZmluaXRpb258dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZS5kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RGVmaW5pdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmcgZm9yIHRoZSBnaXZlbiBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7KGFueXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNldHRpbmcoa2V5OiBzdHJpbmcpOiBhbnl8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBzZXR0aW5nID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNldHRpbmcgPSB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5nZXRWYWx1ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYSBuZXcgc2V0dGluZyB3aXRoIHRoZSBnaXZlbiBrZXkgYW5kIHZhbHVlIHRvIHRoZSBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZXR0aW5nKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KXtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5zZXRWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudFNldHRpbmdzIG5vdCBhdmFpbGFibGUgZm9yIHNldHRpbmcgZGF0YSFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb29tcG9uZW50RGVmaW5pdGlvbiBvZiB0aGlzIGNvbXBvbmVudCh0eXBlLCBpZCwgZGVmYXVsdERhdGFJZClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50RGVmaW5pdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZpbml0aW9uKCk6IENvbXBvbmVudERlZmluaXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29tcG9uZW50RGVmaW5pdGlvbiBvZiB0aGlzIGNvbXBvbmVudCh0eXBlLCBpZCwgZGVmYXVsdERhdGFJZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVmaW5pdGlvbih2YWx1ZTogQ29tcG9uZW50RGVmaW5pdGlvbikge1xyXG4gICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gZGVmYXVsdFNldHRpbmdzRGF0YUlkOyAvLyBVc2Ugb2xkIHNldHRpbmdzIGRhdGEgaWQgaWYgbm90IGRlZmluZWQgaW4gdGhlIG5ldyBvbmVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IHR5cGUgYWxzbyB0byB0aGUgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3MudHlwZSA9IHRoaXMuX2RlZmluaXRpb24udHlwZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGNvbXBvbmVudHMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgZGVmaW5pdGlvbnMgYW5kIGFkZCB0aGVtIHRvIHRoZSBzdWIgY29tcG9uZW50cyBsaXN0IG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDb21wb25lbnREZWZpbml0aW9uPn0gY29tcG9uZW50RGVmaW5pdGlvbnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU3ViQ29tcG9uZW50cyhjb21wb25lbnREZWZpbml0aW9uczogQXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj58dW5kZWZpbmVkKXtcclxuXHRcdGlmKGNvbXBvbmVudERlZmluaXRpb25zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudERlZmluaXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWYgPSBjb21wb25lbnREZWZpbml0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudERlZiwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvbXBvbmVudCBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiBjb21wb25lbnQgZGVmaW5pdGlvbiBpZiB0aGUgY29tcG9uZW50IGZhY3RvcnkgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50RGVmaW5pdGlvbn0gY29tcG9uZW50RGVmXHJcbiAgICAgKiBAcmV0dXJucyB7KElDb21wb25lbnR8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UoY29tcG9uZW50RGVmOiBDb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudEZhY3RvcnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlOiBJQ29tcG9uZW50fHVuZGVmaW5lZCA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNvbXBvbmVudERlZiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudEZhY3Rvcnkgbm90IGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5ncyBhbiBiaW5kcyB0aGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCaW5kaW5nPn0gYmluZGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQmluZGluZ3MoYmluZGluZ3M6IEFycmF5PEJpbmRpbmc+KXtcclxuXHRcdGlmKGJpbmRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5kaW5nID0gYmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGJpbmRpbmcgZm9yIHRoaXMgY29tcG9uZW50IChiaW5kaW5nIGNvbXBvbmVudCA9IHRoaXMub3duZXIgPT4gZS5nLiB3aWRnZXQsIGRhdGFtb2RlbCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgQmluZGluZ3MuY3JlYXRlKGJpbmRpbmcudHlwZSwgYmluZGluZy5kYXRhVHlwZSwgdGhpcy5fb3duZXIsIGJpbmRpbmcuc2NvcGUsIGJpbmRpbmcuaWQsIGJpbmRpbmcudGFyZ2V0S2V5LCBiaW5kaW5nLnNvdXJjZUtleSwgYmluZGluZy5wYXNzQnlWYWx1ZSwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBzZXR0aW5ncyBkYXRhIHdoaWNoIHNob3VsZCBiZSB1c2VkIGZvciBkZWZhdWx0IHN0YXJ0dXAgb2YgdGhpcyBjb21wb25lbnQgb3IgdW5kZWZpbmVkIGlmIG5vdCBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0U2V0dGluZ3NEYXRhKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RGVmYXVsdERhdGFXaXRoSWQodGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBcclxufSJdfQ==