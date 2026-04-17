# 当前框架基线

将这份文档作为当前仓库的默认起点假设，再进一步验证当前分支是否已经发生变化。该基线面向 `C:\Users\ttelab\commApp\prod-explore-app` 当前工作区，而不是旧的通用 ArkUI demo 仓库。

## 1. 工程形态

- 平台：HarmonyOS ArkUI / ArkTS
- 工程性质：单模块内容消费仿真应用，主题是内容浏览、发现、发布、消息和个人主页
- 根模块：`entry`
- App 级配置：`AppScope/app.json5`
- 模块级配置：`entry/src/main/module.json5`
- 入口 Ability：`entry/src/main/ets/entryability/EntryAbility.ets`
- 主页面注册表：`entry/src/main/resources/base/profile/main_pages.json`
- 当前注册页面：仅 `pages/Index`
- 当前页面实现：`entry/src/main/ets/pages/Index.ets`
- 当前数据组织：页面直接引用 `entry/src/main/ets/mock/*.ets` 中的本地 mock 数据

## 2. 应用与构建元信息

- bundleName：`com.hauwei.arkUIdemo`
- app label 资源：`$string:app_name`
- 当前应用名称文案：`Explore Flow`
- vendor：`example`
- versionName：`1.0.0`
- versionCode：`1000000`
- deviceTypes：`phone`、`tablet`
- runtimeOS：`HarmonyOS`
- compatibleSdkVersion：`6.0.2(22)`
- targetSdkVersion：`6.0.2(22)`
- hvigor / plugin 版本：`6.0.1`
- buildMode：`debug`、`release`

## 3. 启动与页面装配方式

- 应用通过 `EntryAbility` 启动。
- `onWindowStageCreate` 中直接 `loadContent('pages/Index')`。
- 当前没有注册第二个页面，也没有独立 router 配置。
- 所有“首页 / 发现 / 发布 / 消息 / 我的”体验都内聚在 `Index.ets` 一个页面组件内部，通过本地状态切换实现。
- 当前导航不是系统路由跳转，而是单页内的底部 tab 切换。
- 当前详情面板不是独立详情页，而是同页内的浮层式 detail panel。

## 4. 当前页面与 UI 组成

当前唯一注册页面是 `Index.ets`，但它已经不是旧的静态 demo 首页，而是一个内容消费型仿真容器页面。

已确认页面结构：

- 底部主导航共 5 个 tab
  - `首页`
  - `发现`
  - `发布`
  - `消息`
  - `我的`
- 首页 tab
  - 顶部标题区 `Explore Flow`
  - 搜索栏
  - 频道切换：`推荐`、`关注`、`同城`、`热榜`
  - 内容卡片流
- 发现 tab
  - 热搜榜
  - 联想搜索
  - 主题分发区块，如“热门话题”“编辑精选”
- 发布 tab
  - 素材选择卡片
  - 标题输入
  - 描述输入
  - 标签输入
  - 发布按钮
- 消息 tab
  - 点赞、评论、粉丝、系统通知等消息列表
- 我的 tab
  - 用户资料摘要
  - 统计卡片
  - `作品 / 收藏 / 草稿` 三个子 tab
  - 草稿继续编辑入口
- 内容详情浮层
  - 封面区
  - 标题与摘要
  - 点赞 / 收藏操作
  - 评论列表
- Toast 提示
  - 页面底部轻提示，由本地状态控制显隐

已确认样式特征：

- 页面主背景色接近 `#F4F6F8`
- 启动窗口背景色资源为 `#F3F6FB`
- 主视觉以浅底卡片、较大圆角、强留白为主
- 颜色与字号主要硬编码在 `Index.ets`
- 当前没有独立公共 design token 文件，也没有封装通用业务组件库

## 5. 当前交互与状态模型

当前交互全部由页面内 `@State` 驱动，没有跨页状态层。

已确认状态包括：

- `currentTab`
  - 作用：切换 5 个底部主 tab
- `currentChannel`
  - 作用：切换首页频道
- `profileTab`
  - 作用：切换个人页中的作品 / 收藏 / 草稿
- `searchKeyword`
  - 作用：驱动首页筛选和发现页联动搜索
- `publishTitle`
- `publishDescription`
- `publishTag`
  - 作用：驱动发布页表单内容
- `feedItems`
  - 作用：首页、详情、个人作品/收藏的核心内容源
- `discoverSections`
- `searchSuggestions`
- `searchTrends`
- `messageItems`
- `profile`
  - 作用：驱动发现、消息、个人主页等模块
- `selectedContentId`
  - 作用：控制详情浮层打开与关闭
- `toastText`
  - 作用：控制轻提示内容

已确认交互能力：

- 首页频道筛选
- 关键词搜索过滤
- 内容卡片点击打开详情浮层
- 点赞切换
- 收藏切换
- 关注切换
- 发布新内容并插入推荐流
- 从草稿跳转回发布 tab 继续编辑
- 发现页热搜和联想词回填搜索关键词

当前状态管理边界：

- 仅页面内 `@State`
- 没有 `AppStorage`、`@StorageLink`、持久化存储或跨页面共享状态
- 没有 ViewModel、Store、Repository 或服务层抽象
- 没有真实异步请求驱动的 loading / success / error 状态切换

## 6. 当前数据层与 mock 基线

当前仓库已经具备明确的本地 mock 数据层，但仍然是纯前端内存数据，不是网络数据源。

已确认 mock 文件：

- `entry/src/main/ets/mock/FeedMock.ets`
  - 内容流与评论数据
- `entry/src/main/ets/mock/DiscoverMock.ets`
  - 发现页主题区块数据
- `entry/src/main/ets/mock/SearchMock.ets`
  - 热搜与联想搜索数据
- `entry/src/main/ets/mock/MessagesMock.ets`
  - 消息中心数据
- `entry/src/main/ets/mock/ProfileMock.ets`
  - 用户信息、统计与草稿数据

这些 mock 已经覆盖“内容消费型产品”的核心浏览骨架，因此不能再把当前仓库视为只有简单按钮和 checklist 的空壳 demo。

## 7. 当前资源与文案基线

- 字符串资源文件：`entry/src/main/resources/base/element/string.json`
- 颜色资源文件：`entry/src/main/resources/base/element/color.json`
- 当前字符串资源较少，主要包括 app 名称和模块描述
- 页面主要业务文案仍直接写在 `Index.ets` 与 mock 文件中
- 启动页背景色通过资源声明，其余大多数视觉常量仍是页面内硬编码
- 当前已经存在明确的“内容消费”业务词汇，例如推荐、热榜、发布、消息、草稿、关注、收藏等

## 8. 当前已经具备的能力

可以视为已存在的基础能力：

- 单页 ArkUI 声明式布局
- 单页内多 tab 视图切换
- 内容流卡片渲染
- 搜索与频道筛选
- 内容详情浮层
- 点赞 / 收藏 / 关注等本地交互
- 发布页表单录入与本地发布回流
- 个人主页与草稿管理的轻量演示
- 基于多个 mock 文件的本地数据驱动
- 使用 build 脚本和 hvigor 构建 HarmonyOS HAP

## 9. 当前缺失或未落地的能力

当前仍然默认缺失的框架能力包括：

- 没有真实多页面路由链路
- 没有网络请求层
- 没有接口封装、数据适配层或远端 mock 服务
- 没有本地持久化层
- 没有登录态、鉴权态或用户会话管理
- 没有服务端分页、刷新、下拉加载更多等真实列表机制
- 没有评论发布、消息已读回执、发布上传等真实提交能力
- 没有统一组件库、主题系统或样式 token 层
- 没有自动化测试、页面测试或业务验收脚本

## 10. 对场景 spec 生成的直接含义

针对当前 skill 的场景分析与 spec 生成，默认应做如下判断：

- 可以假设“内容消费型首页框架”已经存在，但它是单页内状态切换实现，不是多页面产品框架。
- 可以假设推荐流、发现页、发布页、消息页、个人页、详情浮层这些 UI 骨架已经存在。
- 不要假设真实后端、真实登录、真实上传、真实消息链路已经存在。
- 若场景要求新增独立页面、页面跳转链路、网络请求、持久化或系统能力接入，通常属于 `new feature` 或 `modify existing`。
- 若场景只是在现有 tab、卡片、详情浮层、mock 数据和本地交互之上扩展，通常属于在现有框架内演进，而不是从零开始。

## 11. spec 生成时的推荐映射规则

在把场景需求映射到当前分支时，优先按以下思路判断：

1. 页面壳是否已存在
   - 大概率已存在于 `Index.ets` 的某个 tab 或浮层结构中。
2. 数据源是否已存在
   - 若只需本地展示，可优先复用 `mock/*.ets`。
3. 交互模式是否已存在
   - 点赞、收藏、关注、搜索、tab 切换、草稿继续编辑、发布回流均已有参考实现。
4. 是否需要真实路由
   - 当前通常答案是否，因为现有实现主要是单页状态切换。
5. 是否需要真实后端能力
   - 当前通常答案是需要新增，因为现有数据源全部为本地 mock。

## 12. 基线更新触发条件

若当前分支后续发生以下变化，应同步更新本文档：

- `main_pages.json` 注册多个页面
- 引入 `router` 或其他显式导航链路
- 新增真实网络请求层、仓储层或持久化层
- 把 `Index.ets` 拆分成多个业务页面或公共组件
- 新增统一样式 token、主题系统或组件库
- 接入登录、上传、消息同步、评论发布等真实业务能力
- 增加测试脚本或自动化验收能力
