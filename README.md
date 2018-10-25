# H O R I Z O V E R L A Y


![](https://api.travis-ci.org/bsides/horizoverlay.svg?branch=master)


## (ORIGINAL)`https://bsides.github.io/horizoverlay`
## (PERCENTILE)`https://unfaiyted.github.io/horizoverlay`
* BSides and I are working to figure out the best final solution as he cant currently test. 

## URL for [ActWebSocket Plugin](https://github.com/ZCube/ACTWebSocket): Self host it!

A simple horizontal damage meter [overlay](https://github.com/hibiyasleep/OverlayPlugin) for Final Fantasy XIV. It currently shows player dps, damage %, hps, encounter duration and total dps. Based on [this post on reddit](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/).

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")

## Example setup
This is how it should be showing for you after setup with everything checked
![Horizoverlay](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-allbyrole.jpg "Horizoverlay")

## Install
### __Please notice the URL has changed from v1!__
1. Please, be sure you are running version 0.3.3.13 or higher of hibiyasleep Overlay plugin: https://github.com/hibiyasleep/OverlayPlugin/releases | [Version x64](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x64-full.zip) | [Version x86](https://github.com/hibiyasleep/OverlayPlugin/releases/download/0.3.3.13/OverlayPlugin-0.3.3.13-x86-full.zip) |

2. Just paste this url into the overlay's url field:
`https://bsides.github.io/horizoverlay` and click in the _Reload Overlay_ button. You should see something like this:

![First Screen](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-initial.png "First Screen of Horizoverlay")

3. Now would be the right time to resize the window to something like 70% of your screen's width.

![Resize](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-resize.png)

4. Right click in the text to open Settings!

![Settings](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-window.png "Horizoverlay Settings")
If you can't see the Settings window, just alt tab until you do.

5. To tweak the settings without having to hit something, toggle Setup Mode. With it enabled you can see all changes you do live. All settings are saved automatically.

Congratulations, you have it installed and setup.

## Install locally
1. Install Yarn https://yarnpkg.com/en/
2. Download the project
3. Install serve yarn global add serve
4. Go to the terminal (cmd.exe) and to the project's folder
5. Once inside the project's folder, type yarn, wait for it to finish, then yarn build
6. Still inside the project's folder, type serve docs.
7. Leave the terminal open!
8. Then inside ACT, the url would be http://localhost:5000

## Screenshots
Color by Role and [@bmwang](https://github.com/bmwang)'s

![All By Role](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-byrole.png "Color by Role")
![By Role @bmwang](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/bmwang-setup.png "By Role @bmwang")

Black & White

![Black & White](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-colorbw.png "Black & White")

Minimalist AKA version 1

![Minimalist](https://raw.githubusercontent.com/bsides/horizoverlay/master/screenshots/config-minimalist.png "Minimalist AKA version 1")


## Suggestion, bug report, FAQ
Please, [open an issue](https://github.com/bsides/horizoverlay/issues). Also don't forget to search if it's alerady down here in the known issue section ;)

## Contributing
You are welcome to [open a PR](https://github.com/bsides/horizoverlay/pulls) with anything. Just please try to follow the mindset of what is done.

The project uses:
* React
* React Router
* ES6
* [Prettier](https://github.com/prettier/prettier) with ESLint (react defaults) to autoformat with ease

💲💲💲 If you're looking to donate, please do so [at my Patreon page](https://www.patreon.com/bsides) 👍

## Credits & other Magicked KnickerKnacks
It's based of the amazing work [of this repo](https://github.com/billyvg/OverlayPlugin-themes) that tries to compile a whole bunch of [Overlay](https://github.com/hibiyasleep/OverlayPlugin) themes together. Thanks to its repo's `testing.js` file (and [/u/rdmty](https://www.reddit.com/user/rdmty)), I was able to mock the data that ACT throws and built this theme.

The background image from the config window was made by [Richard Tabor](https://purtypixels.com/) and was taken from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/).

Thanks to [@bmwang](https://github.com/bmwang) for introducing more options and color themes.

A lot of inspiration from [Kagerou](https://github.com/hibiyasleep/kagerou) overlay by [@hibiyasleep](https://github.com/hibiyasleep).

A very special thanks for [@yorushika](https://github.com/yorushika) to translating into Simplified / Traditional Chinese!!!

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Special thanks to [my awesome boyfriend](http://na.finalfantasyxiv.com/lodestone/character/2834234/), who test everything everytime I ask ❤
