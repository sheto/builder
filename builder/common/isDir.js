"use strict";

exports.__esModule = true;

var path_1 = require("path");

function $IsDir(_url, _$cb) {
  var fileInfo = path_1.parse(_url); // 先检测文件夹是否存在
  // 如不存在就先创建文件夹

  return _$cb(fileInfo.ext === "" && !/^\./.test(fileInfo.name), fileInfo);
}

exports["default"] = $IsDir;