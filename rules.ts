import fs from 'fs'
import { KarabinerRules } from './types'
import { app, createHyperSubLayers, deeplink, switchToLanguage } from './utils'
import { workRules } from './workRules'
import { privateRules } from './privateRules'

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: 'Hyper Key (⌃⌥⇧⌘)',
    manipulators: [
      {
        description: 'Caps Lock -> Hyper Key',
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            set_variable: {
              name: 'hyper',
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: 'hyper',
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: 'escape',
          },
        ],
        type: 'basic',
      },
      // {
      //   type: 'basic',
      //   description: 'Disable CMD + Tab to force Hyper Key usage',
      //   from: {
      //     key_code: 'tab',
      //     modifiers: {
      //       mandatory: ['left_command'],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: 'tab',
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    // spacebar: deeplink(
    //   "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    // ),
    // b = "B"rowse
    b: {},

    // o = "Open" applications
    o: {
      a: app('Arc'),
      v: app('Visual Studio Code'),
      w: app('Webstorm'),
      t: app('TickTick'),
      // *s*hell
      s: app('Warp'),
      f: app('Finder'),
      // M*u*sic
      u: app('Spotify'),
      b: app('Bruno'),
    },

    // u = "University"
    u: {},

    // c = "Chat"
    c: {},

    // l = "Language"
    l: {
      e: switchToLanguage('en'),
      c: switchToLanguage('zh'),
      z: switchToLanguage('zh'),
      d: switchToLanguage('de'),
      g: switchToLanguage('de'),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: 'volume_increment',
          },
        ],
      },
      j: {
        to: [
          {
            key_code: 'volume_decrement',
          },
        ],
      },
      // m = "Mute"
      m: {
        to: [
          {
            key_code: 'mute',
          },
        ],
      },
      i: {
        to: [
          {
            key_code: 'display_brightness_increment',
          },
        ],
      },
      k: {
        to: [
          {
            key_code: 'display_brightness_decrement',
          },
        ],
      },
      // l = "Lock"
      l: {
        to: [
          {
            key_code: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: 'play_or_pause',
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: 'fastforward',
          },
        ],
      },
      c: deeplink('raycast://extensions/raycast/system/open-camera'),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: 'left_arrow' }],
      },
      j: {
        to: [{ key_code: 'down_arrow' }],
      },
      k: {
        to: [{ key_code: 'up_arrow' }],
      },
      l: {
        to: [{ key_code: 'right_arrow' }],
      },
      // Magicmove via homerow.app
      // m: {
      //   to: [{ key_code: "f", modifiers: ["right_control"] }],
      //   // TODO: Trigger Vim Easymotion when VSCode is focused
      // },
      // Scroll mode via homerow.app
      // s: {
      //   to: [{ key_code: "j", modifiers: ["right_control"] }],
      // },
      // d: {
      //   to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      // },
      u: {
        to: [{ key_code: 'page_down' }],
      },
      i: {
        to: [{ key_code: 'page_up' }],
      },
    },

    // m = "Music"
    m: {
      p: {
        to: [{ key_code: 'play_or_pause' }],
      },
      n: {
        to: [{ key_code: 'fastforward' }],
      },
      b: {
        to: [{ key_code: 'rewind' }],
      },
    },

    // r = "Raycast"
    r: {
      e: deeplink(
        'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols',
      ),
      p: deeplink('raycast://extensions/raycast/raycast/confetti'),
      // a: deeplink("raycast://extensions/raycast/raycast-ai/ai-chat"),
      h: deeplink(
        'raycast://extensions/raycast/clipboard-history/clipboard-history',
      ),
      // 1: deeplink(
      //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      // ),
      // 2: deeplink(
      //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      // ),
    },
  }),
  ...privateRules,
  // ...workRules,
]

fs.writeFileSync(
  'karabiner.json',
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: 'Default',
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2,
  ),
)
