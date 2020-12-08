"use strict";

exports.__esModule = true;

var isDir_1 = require("../common/isDir");

var order_1 = require("./order");

var path_1 = require("path");

var fs_1 = require("fs");

var Convert = {
  $relative: function $relative(_path) {
    return "./" + _path;
  },
  $join: function $join(_dir, _glob) {
    return _dir + (/^\//.test(_glob) ? _glob : "/" + _glob);
  },
  $array: function $array(_item) {
    var array = [];

    _item.forEach(function (_child) {
      if (Array.isArray(_child)) {
        /* concat是链接n个数组并返回新数组，不改变任何已知数组 */
        array = array.concat(Convert.$array(_child));
      } else {
        array.push(_child);
      }
    });

    return array;
  }
};
/**
 *
 * @param _config
 * @returns 返回根据glob表达式匹配到的路径数组
 */

function $GetFliePath(_url, _rootdir) {
  return fs_1.readdirSync(_url).map(function (_match) {
    return isDir_1["default"](_match, function (_is, _dir) {
      if (_is) {
        return $Rebuild({
          dir: Convert.$join(_rootdir || _dir.dir, _dir.base),
          build: "/"
        }, function (_children) {
          return _children.map(function (_path) {
            return _dir.base + "/" + _path;
          });
        });
      } else {
        return _match;
      }
    });
  });
}
/**
 * @param {configType} _config 配置文件
 * @param {pathFuncType} _$callback 转换函数
 * @returns {Array}
 * 返回所有匹配到并重构的路径
 */


function $Rebuild(_config, _$callback, _regexp) {
  return Array // 先将配置文件统一转换成数组格式
  .from(Array.isArray(_config.build) ? _config.build : [_config.build]) // 目录和模式结合
  .map(function (_glob) {
    return Convert.$join(_config.dir, _glob);
  }) // 获取匹配的路由
  .map(function (_url) {
    return $GetFliePath(_url, _config.dir);
  }) // 将多维数组转换为单数组模式
  .map(function (_item) {
    return Convert.$array(_item);
  }) // 根据传入函数进行转换
  .map(function (_item) {
    return _$callback ? _$callback(_item) : _item;
  }) // 根据过滤规则过滤不合格函数（内置过滤.git文件）
  .map(function (_item) {
    return _item.filter(function (_child) {
      return _regexp && _regexp.test(_child) || !/(\.git)$/.test(_child);
    });
  });
}
/**
 * @example
 * 查看是否有构造器的配置文件
 * 如果没有看看是否传入了配置文件
 * 配置文件格式一个数组，指定需要加载哪些文间，采用glob查找法，根目录为当前项目
 */


function $Packing(_config) {
  var config = []; // 读取参数配置

  if (_config) {
    if (Array.isArray(_config)) {
      config = config.concat(_config);
    } else {
      config.push(_config);
    }
  }

  ; // 读取自定义文件配置

  try {
    var rootConfig = require(path_1.resolve("./builder.json"));

    if (rootConfig) {
      config = config.concat(rootConfig);
    }
  } catch (_a) {}

  ; // 读取命令行配置

  if (order_1["default"]("path").length > 0) {
    order_1["default"]("path").forEach(function (_runtime) {
      config.push({
        dir: _runtime,
        build: "/"
      });
    });
  } // 检测配置文件


  if (config.length === 0) {
    throw new Error("没有配置文件");
  } // 返回重构之后的配置文件


  return {
    build: Convert.$array(config.map(function (_config) {
      return $Rebuild(_config, function (_children) {
        return _children.map(function (_child) {
          return _config.dir + "/" + _child;
        });
      });
    })).map(Convert.$relative),
    config: config
  };
}

exports["default"] = $Packing;