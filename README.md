This is a simple horizontal Final Fantasy XIV damage meter [overlay](https://github.com/hibiyasleep/OverlayPlugin) to show party DPS based on [this post on reddit](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/).

![Horizontal overlay by https://www.twitch.tv/yuu_tayuun](https://i.redd.it/l1vfkfd2dccz.png "Horizontal Overlay by https://www.twitch.tv/yuu_tayuun")

It's based of the amazing work [of this repo](https://github.com/billyvg/OverlayPlugin-themes) that tries to compile a whole bunch of [Overlay](https://github.com/hibiyasleep/OverlayPlugin) themes together. Thanks to its repo's `testing.js` file (and [/u/rdmty](https://www.reddit.com/user/rdmty)), I was able to mock the data that ACT throws and built this theme.

## Example setup
This is how it should be showing for you after setup
![Horizoverlay](https://raw.githubusercontent.com/bsides/horizoverlay/master/example.jpg "Horizoverlay")

Also check [this other example](https://raw.githubusercontent.com/bsides/horizoverlay/master/example2.jpg) without the mock data.

## Install
Just paste this url into the overlay's url field:
`https://bsides.github.io/horizoverlay/`

Hit some dummy so you have data to actually see something so you can resize the window and stuff like that. I'm planning on leaving some mock data for this initial setup as it looks weird now.

Ispired by [this overlay](https://github.com/hibiyasleep/kagerou).

## Usage
It'll show the name, class and DPS of players in your party. Resize the overlay window ~~will make its items bigger/wider~~ -> I've set the width to a max-width or else with less people in the party it'd look too wide! Adjust the window so it fits everyone in your party, like 50-60% of your screen width.

The order of the items, from left to right, is based on the amount of damage given by the player so sometimes it's not the higher dps.

I made it to fit the screen [like the example in the post](https://www.reddit.com/r/ffxiv/comments/6q41r3/what_act_overlay_is_this_snipped_off_of_a_stream/) (I even worked with [this screenshot](https://puu.sh/x4Qhi/dcce1de30b.jpg) behind the overlay).

## Suggestion, bug report, critic, general questions, etc
Please, [open an issue](https://github.com/bsides/horizoverlay/issues). Also don't forget to search if it's alerady down here in the known issue section ;)

If you want to contact me in game, I currently play in Cactuar server as Guru Clef

## Next steps
* Make it configurable ([look at this!](https://github.com/hibiyasleep/kagerou))
* About the above, maybe start with the things that will be shown: name, position, DPS, damage, etc.

## Known issues
Some files aren't used in this theme but I left here to make it more customizeable in the future: `CombatantCompact.js` and `Combatant.js`. In theory, `Encounter.js` isn't used either (but its component is used to keep semantics).

## Other details
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).