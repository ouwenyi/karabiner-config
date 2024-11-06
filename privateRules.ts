import { telegramUsernames } from './secrets'
import { app, deeplink, HyperKeyLayers } from './utils'

export const privateRules: HyperKeyLayers = {
  // o = "Open" applications
  o: {
    // *m*arkdown
    m: app('Obsidian'),
    n: app('Notion'),
    p: app('Preview'),
  },

  // c = "Chat"
  c: {
    d: app('Discord'),
    w: app('WhatsApp'),
    t: app('Telegram'),
    s: app('Signal'),
    m: app('Mail'),

    // Individual people
    o: deeplink(`tg://resolve?domain=@${telegramUsernames.o}`),
    y: deeplink(`tg://resolve?domain=@${telegramUsernames.y}`),
  },
}
