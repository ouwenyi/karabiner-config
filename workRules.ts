import { workSlackDeepLinks } from './secrets'
import { app, deeplink, HyperKeyLayers } from './utils'

export const workRules: HyperKeyLayers = {
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

  // j = "Jira"
  j: {
    // *F*ind
    f: deeplink('raycast://extensions/raycast/jira/search-issues'),
  },
}
