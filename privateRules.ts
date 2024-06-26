import { telegramUsernames } from './secrets'
import { KarabinerRules } from './types'
import { app, createHyperSubLayers, deeplink } from './utils'

export const privateRules: KarabinerRules[] = [
  // ...createHyperSubLayers({
  //   // o = "Open" applications
  //   o: {
  //     // *m*arkdown
  //     m: app('Obsidian'),
  //   },

  //   // c = "Chat"
  //   c: {
  //     d: app('Discord'),
  //     w: app('WhatsApp'),
  //     t: app('Telegram'),
  //     s: app('Signal'),
  //     m: app('Mail'),

  //     // Individual people
  //     o: deeplink(`tg://resolve?domain=@${telegramUsernames.o}`),
  //     y: deeplink(`tg://resolve?domain=@${telegramUsernames.y}`),
  //   },
  // }),
]
