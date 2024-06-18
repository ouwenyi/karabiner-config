import { workSlackDeepLinks } from './secrets'
import { KarabinerRules } from './types'
import { app, createHyperSubLayers } from './utils'

export const workRules: KarabinerRules[] = [
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      w: app('IntelliJ IDEA Ultimate'),
      i: app('IntelliJ IDEA Ultimate'),
      l: app('Logseq'),
    },

    // c = "Chat"
    c: {
      s: app('Slack'),

      ...workSlackDeepLinks,
    },
  }),
]
