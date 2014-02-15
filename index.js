// Generated by CoffeeScript 1.7.0
(function() {
  var EventEmitter, Use,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = (require('events')).EventEmitter;

  module.exports = function(game, opts) {
    return new Use(game, opts);
  };

  module.exports.pluginInfo = {
    loadAfter: ['voxel-reach', 'voxel-registry', 'voxel-inventory-hotbar']
  };

  Use = (function(_super) {
    __extends(Use, _super);

    function Use(game, opts) {
      var _ref, _ref1, _ref2;
      this.game = game;
      this.reach = (function() {
        var _ref1;
        if ((_ref = (_ref1 = game.plugins) != null ? _ref1.get('voxel-reach') : void 0) != null) {
          return _ref;
        } else {
          throw 'voxel-use requires "voxel-reach" plugin';
        }
      })();
      this.registry = (function() {
        var _ref2;
        if ((_ref1 = (_ref2 = game.plugins) != null ? _ref2.get('voxel-registry') : void 0) != null) {
          return _ref1;
        } else {
          throw 'voxel-use requires "voxel-registry" plugin';
        }
      })();
      this.inventoryHotbar = (function() {
        var _ref3;
        if ((_ref2 = (_ref3 = game.plugins) != null ? _ref3.get('voxel-inventory-hotbar') : void 0) != null) {
          return _ref2;
        } else {
          throw 'voxel-use requires "voxel-inventory-hotbar" plugin';
        }
      })();
      this.enable();
    }

    Use.prototype.enable = function() {
      return this.reach.on('use', this.onInteract = (function(_this) {
        return function(target) {
          var clickedBlock, clickedBlockID, currentBlockID, preventDefault, props, taken, _ref;
          if (!target) {
            console.log('waving');
            return;
          }
          if ((target.voxel != null) && !_this.game.buttons.crouch) {
            clickedBlockID = _this.game.getBlock(target.voxel);
            clickedBlock = _this.registry.getBlockName(clickedBlockID);
            props = _this.registry.getBlockProps(clickedBlock);
            if (props.onInteract != null) {
              preventDefault = props.onInteract(target);
              if (preventDefault) {
                return;
              }
            }
          }
          if (_this.registry.isBlock((_ref = _this.inventoryHotbar.held()) != null ? _ref.item : void 0)) {
            if (!_this.game.canCreateBlock(target.adjacent)) {
              console.log('blocked');
              return;
            }
            taken = _this.inventoryHotbar.takeHeld(1);
            if (taken == null) {
              console.log('nothing in this inventory slot to use');
              return;
            }
            currentBlockID = _this.registry.getBlockID(taken.item);
            return _this.game.setBlock(target.adjacent, currentBlockID);
          } else {
            return console.log('use item', _this.inventoryHotbar.held());
          }
        };
      })(this));
    };

    Use.prototype.disable = function() {
      return this.reach.removeListener('use', this.onInteract);
    };

    return Use;

  })(EventEmitter);

}).call(this);
