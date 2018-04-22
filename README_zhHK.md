# H O R I Z O V E R L A Y

![](https://api.travis-ci.org/bsides/horizoverlay.svg?branch=master)

## 加載路徑再次改變了，請改為 `https://bsides.github.io/horizoverlay`

這是一個FF14 輕量級的 DPS 統計 [模版](https://github.com/hibiyasleep/OverlayPlugin)。當前支持 DPS、傷害比例、HPS、戰鬥時間和總 DPS 統計。創意源於 [Reddit 上的這篇文章](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/)。

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")

## 樣例設置

如果設置中的所有複選框都被激活，下面應該是模版正常顯示的樣子
![Horizoverlay](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-allbyrole.jpg "Horizoverlay")

## 安裝

### __請注意，現在的加載 URL 和 V1 版本不一樣！__

1. 請確保你在使用 0.3.3.13 或更高版本的 hibiyasleep OverlayPlugin 插件： https://github.com/hibiyasleep/OverlayPlugin/releases | [64位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x64-full.zip) | [32位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x86-full.zip) |

2. 將此 URL 複製進 OverlayPlugin 的加載路徑中。

`https://bsides.github.io/horizoverlay` 並點擊 _重新加載_ 按鈕，然後你應該看到類似這樣的東西：

![First Screen](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-initial.png "Horizoverlay 的初始界面")

3. 現在要做的是把模版大小調整到大概你屏幕寬度的 70% 左右。

![Resize](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-resize.png)

4. 右擊顯示文本來打開設置窗口！

![Settings](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-window.png "Horizoverlay 設置")
如果你看不到設置窗口，使用 Alt+Tab 將它切換出來。

5. 要便捷地微調各項設置，在設置窗口中勾選 “配置模式”。在這個狀態下，你可以實時地預覽你所更改的設置。所有動作都將自動地保存。

恭喜，你已經完成了安裝和配置。

## 本地安裝

1. 安裝Yarn https://yarnpkg.com/en/
2. 下載本項目
3. 執行命令安裝serve：yarn global add serve
4. 打開終端（cmd.exe），切入項目目錄
5. 在項目目錄中執行yarn，等待它自動操作結束，執行yarn build
6. 待在項目目錄中，輸入serve docs
7. 保持終端運行！
8. 進入ACT，加載路徑應該是 http://localhost:5000

## 截圖

“職業特有”色調，以及來自 [@bmwang](https://github.com/bmwang) 的截圖

![All By Role](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-byrole.png "職業特有")
![By Role @bmwang](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/bmwang-setup.png "來自 @bmwang")

黑白色調

![Black & White](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-colorbw.png "黑白色調")

第一版的 AKA 極簡主義

![Minimalist](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-minimalist.png "第一版的 AKA 極簡主義")

## 建議，回報 bug 以及 FAQ

請打開一個 [issue](https://github.com/bsides/horizoverlay/issues)。另外別忘了先搜索看是不是已經有人提過了。;)

## 貢獻

任何變動都非常歡迎提交一個 [Pull Request](https://github.com/bsides/horizoverlay/pulls)。隨從你的心意。

這個項目使用了：

* React
* React Router
* ES6
* ESLint 提供的 [Prettier](https://github.com/prettier/prettier) (react defaults) 來輕鬆自動排版。

💲💲💲 如果您想要捐助支持我們，請前往 [我的 Patreon](https://www.patreon.com/bsides) 👍

## 感謝 & 其他小玩意兒

這個項目基於 [這個 repo](https://github.com/billyvg/OverlayPlugin-themes) 上收集整組[模版](https://github.com/hibiyasleep/OverlayPlugin)主題的驚豔工作。感謝這個 repo 的 `testing.js` 文件（以及[/u/rdmty](https://www.reddit.com/user/rdmty)），有了這些我才能擺弄 ACT 輸出的數據並做成這個模版。

設置窗口的背景圖像是由 [Richard Tabor](https://purtypixels.com/) 製作的，來自於[Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)。

感謝 [@bmwang](https://github.com/bmwang) 提供更多功能和顏色主題的意見。

很多靈感來自於 [@hibiyasleep](https://github.com/hibiyasleep) 上的 [Kagerou](https://github.com/hibiyasleep/kagerou) 模版。

特別感謝[@yorushika](https://github.com/yorushika)提供簡繁中文版翻譯！！！

這個項目得力於 [Create React App](https://github.com/facebookincubator/create-react-app)。

非常感謝 [我的大胸弟](http://na.finalfantasyxiv.com/lodestone/character/2834234/)，滿足我的每個測試要求❤
