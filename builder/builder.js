"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var tranform_1 = require("./utils/tranform");

var analysis_1 = require("./utils/analysis");

var Path = require("path");

var Fs = require("fs"); // 构造器-销毁周期


function $Destory(_path, _isDir) {
  return new Promise(function (_$resolve, _$reject) {
    var $unlink = Fs.unlink,
        $rmdir = Fs.rmdir;

    if (_isDir) {
      $rmdir(Path.resolve(_path), {
        recursive: true
      }, function (_err) {
        if (_err) {
          _$reject();
        } else {
          _$resolve(_path);
        }
      });
    } else {
      $unlink(_path, function (_err) {
        if (_err) {
          _$reject();
        } else {
          _$resolve(_path);
        }
      });
    }
  });
}

function $Create(_path, _dir) {
  return __awaiter(this, void 0, void 0, function () {
    var $writeFile, $mkdir, $readFileSync, $resolve, format;
    return __generator(this, function (_a) {
      $writeFile = Fs.writeFile, $mkdir = Fs.mkdir, $readFileSync = Fs.readFileSync;
      $resolve = Path.resolve, format = Path.format;
      return [2
      /*return*/
      , new Promise(function (_$resolve, _$reject) {
        var writeInfo = tranform_1["default"](_path, _dir); // 向文件件写入文件

        $writeFile($resolve(format(writeInfo)), Buffer.from($readFileSync(_path)), function (_err) {
          if (_err) {
            // 先检测是否时目录不存在引起的错误
            // 如不存在就先创建文件夹
            if (_err.errno === -4058) {
              $mkdir($resolve(writeInfo.dir), function (_err) {
                if (_err) {
                  _$reject(_path);
                } else {
                  $Create(_path, _dir).then(function () {
                    _$resolve(_path);
                  });
                }
              });
            } else {
              _$reject(_path);
            }
          } else {
            _$resolve(_path);
          }
        });
      })];
    });
  });
}
/**
 * @param {对象} config 格式为
 */


function $Builder(_dir) {
  var profile = analysis_1["default"](); // 配置文件

  profile.build.forEach(function (_filepath, _index, _array) {
    // 创建环境
    $Create(_filepath, _dir) // 销毁源环境的每个单个文件
    .then(function (_path) {
      console.log("\u73AF\u5883\u6587\u4EF6[\u8DEF\u5F84:" + _path + "]\u521B\u5EFA\u6210\u529F");
      return $Destory(_path).then(function () {
        console.log("\u73AF\u5883\u6587\u4EF6[\u8DEF\u5F84:" + _path + "]\u5220\u9664\u6210\u529F");
      })["catch"](function () {
        console.log("\u73AF\u5883\u6587\u4EF6[\u8DEF\u5F84:" + _path + "]\u5220\u9664\u5931\u8D25");
      });
    }) // 销毁源环境
    .then(function (_path) {
      if (_index === _array.length - 1) {
        // 环境创建完成，准备删除源环境
        console.log("环境创建完成，准备删除源环境");
        setTimeout(function () {
          profile.config.forEach(function (_config, _configindex, _configlist) {
            $Destory(_config.dir, true).then(function (_path) {
              console.log("\u6E90\u73AF\u5883" + _path + "\u5220\u9664\u5B8C\u6BD5");

              if (void(0) && _configindex === _configlist.length - 1) {
                $Destory("builder", true)["catch"](function (_err) {
                  console.log("构建器删除完毕");
                })["catch"](function () {
                  console.log("构建器删除失败");
                });
              }
            })["catch"](function (_err) {
              console.log("源环境删除失败");
            });
          });
        }, 0);
      }
    })["catch"](function (_err) {
      console.log("\u73AF\u5883\u6587\u4EF6[" + _err + "]\u521B\u5EFA\u5931\u8D25");
    });
  });
}

exports["default"] = $Builder;