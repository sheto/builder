"use strict";

exports.__esModule = true;

function $GetPureCommandLine(_start) {
  if (_start === void 0) {
    _start = 2;
  }

  var argv = process.argv;
  return argv.slice(_start);
}

;

function $GetProcessCommand(_prefix) {
  // 无指定不执行
  if (!_prefix) {
    return [];
  }

  ;
  var sets = $GetPureCommandLine();

  if (sets.length > 0) {
    var name_1 = new RegExp("^" + _prefix, "i"); // 获取指令

    var command = sets.find(function (_command) {
      return name_1.test(_command);
    }); // 如果有指令

    if (command && command.split("=").length === 2) {
      var result = command.split("=")[1];
      return /,/gm.test(result) ? result.split(",") : [result];
    } else {
      return [];
    }
  } else {
    return [];
  }
}

exports["default"] = $GetProcessCommand;