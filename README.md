# HarmonyArkUIDemo

仓库现在采用两层工程结构：

- `baseApp/`：基线工程，只保存可复用的基础版本
- `scenarios/scenarioxxx/`：具体场景工程副本，每个目录独立保存 spec、mock、输出、日志和状态

## 构建

命令行构建入口统一为 `build/build.ps1`，必须显式指定目标工程：

```powershell
powershell -ExecutionPolicy Bypass -File .\build\build.ps1 -Target baseApp
powershell -ExecutionPolicy Bypass -File .\build\build.ps1 -Target scenarios/scenario001
```

可选参数：

- `-Clean`
- `-BuildMode release`
- `-ConfigPath .\build\build.config.json`

构建脚本会：

- 优先读取 `build/build.config.json`，不存在时回退到 `build/build_new.config.json`，再回退到 `build/build.config.example.json`
- 将目标工程源码复制到 `tmp/<target>/`
- 将共享 `build/` 资源一并复制到同一个 `tmp/` 工作区
- 在 `tmp/` 工作区内执行 `hvigor assembleHap`
- 从 `tmp/<target>/entry/build/default/outputs/default/` 探测 `.hap` 产物

`build/build.bat` 只是对 `build.ps1` 的透传包装，因此同样支持 `-Target`。

## 场景流水线

自动化入口：

```powershell
python dev/scripts/run_pipeline.py --input scenario1.json
python dev/scripts/run_pipeline.py --input scenario1.json --no-web
python dev/scripts/run_pipeline.py --input scenario1.json --wait
```

当前行为：

- 脚本只会同步并切换到匹配的基线分支，不再创建新的场景分支
- 场景目录默认创建或复用为 `scenarios/scenarioxxx/`
- 运行态文件全部写入目标场景目录：
  - `spec/`
  - `mock-data/`
  - `output/`
  - `logs/`
  - `state/`
- 自动提交与推送目标为当前匹配分支，提交白名单按当前场景目录动态生成

## Web 控制台

`run_pipeline.py` 默认会启动本地 Web 控制台。控制台会扫描当前分支工作区中的：

- `baseApp`
- `scenarios/scenarioxxx`

页面支持切换查看不同 pipeline 的状态、日志、产物下载和终止动作。

## 目录约定

```text
baseApp/
scenarios/
  scenario001/
    spec/
    mock-data/
    output/
    logs/
    state/
build/
dev/
tmp/
```

## 配置

主配置文件为 `dev/config/pipeline.config.json`，重点字段：

- `paths.base_app_root`
- `paths.scenarios_root`
- `paths.build_root`
- `git.app_types`
- `agent.definitions`
- `scheduler`

首次使用时请复制 `build/build.config.example.json` 为 `build/build.config.json`。`devEcoStudioRoot` 默认通过环境变量 `DEVECO_STUDIO_ROOT` 注入，例如先执行 `$env:DEVECO_STUDIO_ROOT = 'C:\Program Files\Huawei\DevEco Studio'`，再运行构建脚本。