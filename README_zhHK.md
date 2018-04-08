# H O R I Z O V E R L A Y

![build status](https://api.travis-ci.org/bsides/horizoverlay.svg?branch=master)

FF14 輕量級的 DPS 統計 [模版](https://github.com/hibiyasleep/OverlayPlugin)。當前支持 DPS、傷害比例、HPS、戰鬥時間和總 DPS 統計。創意源於 [Reddit 上的這篇文章](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/).

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")

## 設置示例

如果設置中的所有選項都被激活，下面應該是模版正常顯示的樣子
![Horizoverlay](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-allbyrole.jpg "Horizoverlay")

## 安裝

### __請注意，現在的加載 URL 和 V1 版本不一樣！__

1. 請確保你在使用 0.3.3.13 或更高版本的 hibiyasleep OverlayPlugin 插件：https://github.com/hibiyasleep/OverlayPlugin/releases | [64 位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x64-full.zip) | [32 位版本](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x86-full.zip) |

2. 將這個 URL 複製進 OverlayPlugin 的加載路徑中。

`https://horizoverlay.now.sh` 並點擊 _重新加載_ 按鈕，你應該看到類似這樣的東西：

![First Screen](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-initial.png "Horizoverlay 的首頁")

3. 現在要做的是把模版大小調整到大概你屏幕寬度的 70% 左右。

![Resize](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-resize.png)

4. 右擊顯示文本來打開設置窗口！

![Settings](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-window.png "Horizoverlay 設置")
如果你看不到設置窗口，使用 Alt+Tab 將它切換出來。

5. 要便捷地微調各項設置，在設置窗口中勾選 “配置模式”。之後你可以實時地預覽你所更改的設置。所有動作都將自動地保存。

恭喜你，你已經完成了安裝和配置。

## 本地安裝

下載 [build 文件夾](https://github.com/bsides/horizoverlay/tree/master/build) 並把 “index.html” 填進 OverlayPlugin 加載路徑。

## 我想要第一版！

它還在之前的 URL 裏 `https://bsides.github.io/horizoverlay` 但我不會再對其做任何更新。並且，你也可以 [在這裏](https://github.com/bsides/horizoverlay/tree/version-1) 隨意下載第一版，並從本地加載。它應該可以正常運行。我建議這樣做，因為我不知道這個 URL 還能用多久。

## 截圖

“職業特有”色調，以及來自 [@bmwang](https://github.com/bmwang) 的截圖

![All By Role](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-byrole.png "職業特有")
![By Role @bmwang](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/bmwang-setup.png "來自 @bmwang")

黑白色調

![Black & White](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-colorbw.png "黑白色調")

Minimalist AKA version 1

![Minimalist](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-minimalist.png "第一版 AKA 極簡主義")

## 建議，回報 bug 以及 FAQ

請打開一個 [issue](https://github.com/bsides/horizoverlay/issues)。另外別忘了先搜索看是不是已經有人提過了。;)

## 貢獻

任何變動都非常歡迎提交一個 [Pull Request](https://github.com/bsides/horizoverlay/pulls)。隨從你的心意。

這個項目使用了：

* React
* React Router
* ES6
* ESLint 提供的 [Prettier](https://github.com/prettier/prettier) (react defaults) 來輕鬆自動排版。

💲💲💲 如果您想捐贈，請前往 [我的 Patreon](https://www.patreon.com/bsides) 👍

## 感謝 & 其他小玩意兒 Credits & other Magicked KnickerKnacks

這個項目基於 [這個 repo](https://github.com/billyvg/OverlayPlugin-themes) 上意圖組合整組 that tries to compile a whole bunch of [Overlay](https://github.com/hibiyasleep/OverlayPlugin)主題的驚豔工作。感謝這個 repo 的 `testing.js` 文件（以及[/u/rdmty](https://www.reddit.com/user/rdmty)），有了這些我才能擺弄 ACT 輸出的數據並做成這個模版。

設置窗口的背景圖像是由 [Richard Tabor](https://purtypixels.com/) 製作的，來自於[Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)。

感謝 [@bmwang](https://github.com/bmwang) 提供更多選項和顏色主題的意見。

很多靈感來自於 [@hibiyasleep](https://github.com/hibiyasleep) 上的 [Kagerou](https://github.com/hibiyasleep/kagerou) 模版。

這個項目得力於 [Create React App](https://github.com/facebookincubator/create-react-app)。

非常感謝 [我的大胸弟](http://na.finalfantasyxiv.com/lodestone/character/2834234/)，滿足我的每個測試要求❤
