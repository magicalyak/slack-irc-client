'use strict';

var EventEmitter = require('events');

function TerminalListener() {
};

TerminalListener.prototype.listen = function listen(context) {
  context.logger.verbose('Starting terminal listener');

  // Add event emitter
  context.terminal.events = new EventEmitter();
  context.domain.add(context.terminal.events);

  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk) {
      var command = chunk.toString('ascii').replace('\n', '');
      var handled = context.terminal.events.emit(command);
      if (!handled) {
        context.logger.warn('Unknown command: \'%s\'', command);
      }
    }
  }.bind(this));

  // Add handler
  context.terminal.handler.handle(context);
};

module.exports = TerminalListener;