This is a simple horizontal [overlay](https://github.com/hibiyasleep/OverlayPlugin) to show party DPS based on [this post on reddit](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/).

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")


It's based of the amazing work [of this repo](https://github.com/billyvg/OverlayPlugin-themes) that tries to compile a whole bunch of [Overlay](https://github.com/hibiyasleep/OverlayPlugin) themes together. Thanks to its repo's `testing.js` file, I was able to mock the data that ACT throws and built this theme.

## Install
I'm still working on it. When it's ready it'll be available as an url to be pasted on ACT's Overlay plugin, just [like this]((https://github.com/hibiyasleep/kagerou).

## Usage
It'll show the name, class and DPS of players in your party. Resize the overlay window will make its items bigger/wider. Adjust as you see everyone fits as it's automatic, using Flexbox.

I made it to fit the screen [like the example in the post](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/) (I even worked with [this screenshot](https://puu.sh/x4Qhi/dcce1de30b.jpg) behind the overlay).

## Next steps
* Make it configurable ([look at this!](https://github.com/hibiyasleep/kagerou))
* About the above, maybe start with the things that will be shown: name, position, DPS, damage, etc.

## Known issues
Some files aren't used in this theme but I left here to make it more customizeable in the future: `CombatantCompact.js` and `Combatant.js`. In theory, `Encounter.js` isn't used either (but its component is used to keep semantics).

## Details
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
