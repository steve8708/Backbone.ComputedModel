/* backbone.computedmodel.js v0.0.2 (coffeescript output) */ 

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.ComputedModel = (function(_super) {
    __extends(ComputedModel, _super);

    function ComputedModel(items, options) {
      var key, value, _ref;
      if (options == null) {
        options = {};
      }
      ComputedModel.__super__.constructor.apply(this, arguments);
      _ref = _.extend(options.compute || {}, this.compute);
      for (key in _ref) {
        value = _ref[key];
        this.computeProperty(key, value);
      }
      this.blacklist || (this.blacklist = []);
    }

    ComputedModel.prototype.computeProperty = function(name, args) {
      var callback, obj, split, trigger, _i, _len, _ref,
        _this = this;
      args = _.clone(args);
      switch (type(args)) {
        case "object":
          obj = args;
          break;
        case "array":
          obj = {
            fn: args.pop(),
            triggers: args
          };
      }
      this.blacklist.push(name);
      callback = function() {
        var result, values;
        values = obj.triggers.map(function(trigger) {
          return _this.get(trigger);
        });
        result = obj.fn.apply(_this, values);
        return _this.set(name, result);
      };
      _ref = obj.triggers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        trigger = _ref[_i];
        this.on("change:" + trigger, callback);
        split = trigger.split('.');
      }
      try {
        return callback();
      } catch (_error) {}
    };

    ComputedModel.prototype.toJSON = function(withBlacklist) {
      var json;
      json = Backbone.Model.prototype.toJSON.call(this, withBlacklist);
      if (withBlacklist) {
        return json;
      } else {
        return _.omit(json, this.blacklist);
      }
    };

    return ComputedModel;

  })(Backbone.Model);

}).call(this);
