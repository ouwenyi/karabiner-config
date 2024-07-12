import { workSlackDeepLinks } from './secrets'
import { KarabinerRules } from './types'
import { app, createHyperSubLayers, deeplink } from './utils'

export const workRules: KarabinerRules[] = [
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      w: app('IntelliJ IDEA Ultimate'),
      l: app('Logseq'),
    },

    // c = "Chat"
    c: {
      s: app('Slack'),
      m: deeplink('raycast://script-commands/open-work-gmail'),
      // *V*ideo chat
      v: deeplink('raycast://extensions/vitoorgomes/google-meet/default-profile'),

      ...workSlackDeepLinks,
    },
  }),
]
