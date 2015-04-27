var util = {
   log : function(tag) {
    return {
      d : function() {
        var log = Array.prototype.slice.call(arguments)
        util.logger("DEBUG", tag, log);
      },
      i : function() {
        var log = Array.prototype.slice.call(arguments)
        util.logger("INFO", tag, log);
      },
      w : function() {
        var log = Array.prototype.slice.call(arguments)
        util.logger("WARNING", tag, log);
      },
      e : function() {
        var log = Array.prototype.slice.call(arguments)
        util.logger("ERROR", tag, log);
      },
      f : function() {
        var log = Array.prototype.slice.call(arguments)
        util.logger("FATAL", tag, log);
      }
    }
  },
  logger : function(level, tag, args) {
    args.unshift("", "("+level+") ["+tag+"]\t");
    console.log.apply(null, args);
  }
}
module.exports = util;
