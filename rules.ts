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
    c: deeplink('raycast://script-commands/open-calendar'),
    f: app('Finder'),
    i: app('IntelliJ IDEA Ultimate'),
    p: app('Preview'),
    // *s*hell
    s: app('Warp'),
    t: app('TickTick'),
    // M*u*sic
    u: app('Spotify'),
    v: app('Visual Studio Code'),
    w: app('Webstorm'),
    z: app('Zed'),
  },

  // n = "New"
  n: {
    z: deeplink('raycast://extensions/ewgenius/zed-recent-projects/search'),
    v: deeplink('raycast://extensions/thomas/visual-studio-code/index'),
    t: deeplink('raycast://extensions/appest/ticktick/create'),
  },

  // u = "University"
  u: {},

  // l = "Language"
  l: {
    e: switchToLanguage('en'),
    c: switchToLanguage('zh'),
    z: switchToLanguage('zh'),
    d: switchToLanguage('de'),
    g: switchToLanguage('de'),
  },

  // f = "Focus"
  f: {
    // *C*lear
    c: shell`shortcuts run "Turn off Focus"`,
    // *O*ff
    o: shell`shortcuts run "Turn off Focus"`,
    w: shell`shortcuts run "Activate Work Focus"`,
    u: shell`shortcuts run "Activate Uni Focus"`,
    p: shell`shortcuts run "Activate Personal Focus"`,
    t: shell`shortcuts run "Activate Tutorial Focus"`,
    s: shell`shortcuts run "Activate Sleep Focus"`,
    d: shell`shortcuts run "Activate Do Not Disturb Focus"`,
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
    a: deeplink('raycast://extensions/raycast/raycast-ai/ai-chat'),
    h: deeplink(
      'raycast://extensions/raycast/clipboard-history/clipboard-history',
    ),
    m: deeplink('raycast://extensions/raycast/navigation/search-menu-items'),
    g: deeplink('raycast://extensions/josephschmitt/gif-search/search'),
    // 1: deeplink(
    //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
    // ),
    // 2: deeplink(
    //   "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
    // ),
  },

  // w = "Window management"
  w: {
    // these mimic vim motions
    h: deeplink('raycast://extensions/raycast/window-management/left-half'),
    j: deeplink('raycast://extensions/raycast/window-management/bottom-half'),
    k: deeplink('raycast://extensions/raycast/window-management/top-half'),
    l: deeplink('raycast://extensions/raycast/window-management/right-half'),

    m: deeplink('raycast://extensions/raycast/window-management/maximize'),
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
