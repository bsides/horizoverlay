# H O R I Z O V E R L A Y

![](https://api.travis-ci.org/bsides/horizoverlay.svg?branch=master)

## 加载路径再次改变了，请改为 `https://bsides.github.io/horizoverlay`

这是一个FF14 轻量级的 DPS 统计 [模版](https://github.com/hibiyasleep/OverlayPlugin)。当前支持 DPS、伤害比例、HPS、战斗时间和总 DPS 统计。创意源于 [Reddit 上的这篇文章](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/)。

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")

## 样例设置

如果设置中的所有复选框都被激活，下面应该是模版正常显示的样子
![Horizoverlay](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-allbyrole.jpg "Horizoverlay")

## 安装

### __请注意，现在的加载 URL 和 V1 版本不一样！__

1. 请确保你在使用 0.3.3.13 或更高版本的 hibiyasleep OverlayPlugin 插件： https://github.com/hibiyasleep/OverlayPlugin/releases | [64位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x64-full.zip) | [32位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x86-full.zip) |

2. 将此 URL 复制进 OverlayPlugin 的加载路径中。

`https://bsides.github.io/horizoverlay` 并点击 _重新加载_ 按钮，然后你应该看到类似这样的东西：

![First Screen](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-initial.png "Horizoverlay 的初始界面")

3. 现在要做的是把模版大小调整到大概你屏幕宽度的 70% 左右。

![Resize](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-resize.png)

4. 右击显示文本来打开设置窗口！

![Settings](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-window.png "Horizoverlay 设置")
如果你看不到设置窗口，使用 Alt+Tab 将它切换出来。

5. 要便捷地微调各项设置，在设置窗口中勾选 “配置模式”。在这个状态下，你可以实时地预览你所更改的设置。所有动作都将自动地保存。

恭喜，你已经完成了安装和配置。

## 本地安装

1. 安装Yarn https://yarnpkg.com/en/
2. 下载本项目
3. 执行命令安装serve：yarn global add serve
4. 打开终端（cmd.exe），切入项目目录
5. 在项目目录中执行yarn，等待它自动操作结束，执行yarn build
6. 待在项目目录中，输入serve docs
7. 保持终端运行！
8. 进入ACT，加载路径应该是 http://localhost:5000

## 截图

“职业特有”色调，以及来自 [@bmwang](https://github.com/bmwang) 的截图

![All By Role](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-byrole.png "职业特有")
![By Role @bmwang](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/bmwang-setup.png "来自 @bmwang")

黑白色调

![Black & White](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-colorbw.png "黑白色调")

第一版的 AKA 极简主义

![Minimalist](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-minimalist.png "第一版的 AKA 极简主义")

## 建议，回报 bug 以及 FAQ

请打开一个 [issue](https://github.com/bsides/horizoverlay/issues)。另外别忘了先搜索看是不是已经有人提过了。;)

## 贡献

任何变动都非常欢迎提交一个 [Pull Request](https://github.com/bsides/horizoverlay/pulls)。随从你的心意。

这个项目使用了：

* React
* React Router
* ES6
* ESLint 提供的 [Prettier](https://github.com/prettier/prettier) (react defaults) 来轻松自动排版。

💲💲💲 如果您想要捐助支持我们，请前往 [我的 Patreon](https://www.patreon.com/bsides) 👍

## 感谢 & 其他小玩意儿

这个项目基于 [这个 repo](https://github.com/billyvg/OverlayPlugin-themes) 上收集整组[模版](https://github.com/hibiyasleep/OverlayPlugin)主题的惊艳工作。感谢这个 repo 的 `testing.js` 文件（以及[/u/rdmty](https://www.reddit.com/user/rdmty)），有了这些我才能摆弄 ACT 输出的数据并做成这个模版。

设置窗口的背景图像是由 [Richard Tabor](https://purtypixels.com/) 制作的，来自于[Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)。

感谢 [@bmwang](https://github.com/bmwang) 提供更多功能和颜色主题的意见。

很多灵感来自于 [@hibiyasleep](https://github.com/hibiyasleep) 上的 [Kagerou](https://github.com/hibiyasleep/kagerou) 模版。

特别感谢[@yorushika](https://github.com/yorushika)提供简繁中文版翻译！！！

这个项目得力于 [Create React App](https://github.com/facebookincubator/create-react-app)。

非常感谢 [我的大胸弟](http://na.finalfantasyxiv.com/lodestone/character/2834234/)，满足我的每个测试要求❤
