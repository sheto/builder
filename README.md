<center>环境构造器</center>
<center>v1.0.0</center>

## 使用说明
构建器是将你的环境写入到当前目录，而且会删除版本管理文件夹。
完成后会删除环境

### 步骤1：安装
```shell
npm install element-ui -S
```
### 步骤2（配置文件方式）：创建配置文件
配置文件名字是builder.json
```json
{
	"dir":"需要构建的目录",
	"build":"需要构建的文件"
}
```
或者多个
```json
[
	{
		"dir":"需要构建的目录",
		"build":"需要构建的文件"
	}
]
```
### 步骤2（命令行方式）：直接执行，不执行第三步了
这种方式目前只可指定目录，默认全部构建
```shell
npx build path=构建目录
```

### 步骤3：开始创建
```shell
npx build
```
或者指定执行文件
```shell
node 执行文件.js
```
