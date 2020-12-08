"use strict";

exports.__esModule = true;

var path_1 = require("path");

var order_1 = require("./order");

function $Transform(_path, _target) {
  var info = path_1.parse(_path); //替换文件分析中的文件目录

  info.dir = info.dir.replace(/^\.?\/(\w{1,})/, _target || order_1["default"]("build")[0] || "./");
  return info;
}

exports["default"] = $Transform;