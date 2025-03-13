import fs from 'fs'
import { KarabinerRules } from './types'
import {
  app,
  createHyperSubLayers,
  deeplink,
  HyperKeyLayers,
  shell,
  switchToLanguage,
} from './utils'
import { workRules } from './workRules'
import { privateRules } from './privateRules'
import { telegramUsernames } from './secrets'

const commonLayers: HyperKeyLayers = {
  // spacebar: deeplink(
  //   "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
  // ),
  // b = "B"rowse
  b: {},

  // o = "Open" applications
  o: {
    a: app('Arc'),
    b: app('Bruno'),
    c: app('Cursor'),
    f: app('Finder'),
    i: app('IntelliJ IDEA Ultimate'),
    // *m*arkdown
    m: app('Obsidian'),
    p: app('PyCharm'),
    // *s*hell
    s: app('Ghostty'),
    t: app('TickTick'),
    // M*u*sic
    u: app('Spotify'),
    v: app('Visual Studio Code'),
    w: app('Warp'),
    x: app('XCode'),
    z: app('Zed'),
  },

  // n = "New"
  n: {
    t: {
      to: [
        // This shortcut is set in TickTick because the default
        // doesn't seem to work anymore.
        {
          key_code: 'a',
          modifiers: ['shift', 'control', 'command', 'option'],
        },
      ],
    },
    v: deeplink('raycast://extensions/thomas/visual-studio-code/index'),
  },

  // u = "University"
  u: {},

  // c = "Chat"
  c: {
    m: deeplink(`tg://resolve?domain=@${telegramUsernames.m}`),
  },

  // l = "Language"
  l: {
    c: switchToLanguage('zh'),
    d: switchToLanguage('de'),
    e: switchToLanguage('en'),
    g: switchToLanguage('de'),
    z: switchToLanguage('zh'),
  },

  // s = "System"
  s: {
    c: deeplink('raycast://extensions/raycast/system/open-camera'),
    // *A*ll *A*pps
    a: app('Mission Control'),
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
    // a: deeplink('raycast://extensions/raycast/raycast-ai/ai-chat'),
    // *C*onfetti
    c: deeplink('raycast://extensions/raycast/raycast/confetti'),
    e: deeplink(
      'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols',
    ),
    f: deeplink('raycast://extensions/raycast/navigation/search-menu-items'),
    g: deeplink('raycast://extensions/josephschmitt/gif-search/search'),
    h: deeplink(
      'raycast://extensions/raycast/clipboard-history/clipboard-history',
    ),
    // *P*arty
    p: deeplink('raycast://extensions/raycast/raycast/confetti'),
    // 1: deeplink(
    //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
    // ),
    // 2: deeplink(
    //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
    // ),
  },

  // w = "Window management"
  w: {
    l: deeplink('raycast://extensions/raycast/window-management/left-half'),
    b: deeplink('raycast://extensions/raycast/window-management/bottom-half'),
    t: deeplink('raycast://extensions/raycast/window-management/top-half'),
    r: deeplink('raycast://extensions/raycast/window-management/right-half'),

    m: deeplink('raycast://extensions/raycast/window-management/maximize'),
    // r: deeplink('raycast://extensions/raycast/window-management/restore'),
    f: deeplink(
      'raycast://extensions/raycast/window-management/toggle-fullscreen',
    ),
    p: deeplink(
      'raycast://extensions/raycast/window-management/previous-display',
    ),
    n: deeplink('raycast://extensions/raycast/window-management/next-display'),
  },
}

const mergeSublayers = (
  base: HyperKeyLayers,
  newLayers: HyperKeyLayers,
): HyperKeyLayers =>
  Object.entries(newLayers).reduce((acc, [key, subLayer]): HyperKeyLayers => {
    return { ...acc, [key]: { ...(base[key] ?? {}), ...subLayer } }
  }, {})

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
    ...commonLayers,
    ...mergeSublayers(commonLayers, privateRules),
    // ...mergeSublayers(commonLayers, workRules),
  }),
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
