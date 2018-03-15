import { Script, inject, EntityController, WebWorkerTransport, SoundController } from '../../../sdk'
import { EventSubscriber } from 'dcl-scripting'

export class CrocsGame extends Script {
  @inject('EntityController') entities: EntityController | null = null
  @inject('experimentalSoundController') sound: SoundController | null = null

  eventSubscriber: EventSubscriber | null = null

  difficulty: number = 0
  sequence: string[] = []
  choiceSequence: string[] = []
  choiceEnabled: boolean = false
  playing: boolean = false
  resetTimeout: NodeJS.Timer | null = null

  async systemDidEnable() {
    this.eventSubscriber = new EventSubscriber(this.entities!)
    await this.moveCrocsToSpawn()

    this.eventSubscriber.on('play_button_click', async () => {
      if (this.resetTimeout) {
        clearTimeout(this.resetTimeout)
      }
      this.resetTimeout = setTimeout(async () => {
        this.playing = true
        await this.sound!.playSound('sounds/button.ogg', {
          entity: 'play_button'
        })
        await this.resetGame()
        await this.newRound()
      }, 700)
    })

    await this.forEachCroc(async croc => {
      this.eventSubscriber!.on(`${croc}_click`, () => this.handleChoice(croc))
    })
  }

  async newRound() {
    this.choiceEnabled = false

    await this.entities!.setEntityAttributes('notice', {
      visible: 'false'
    })
    await this.entities!.setEntityAttributes('game_over', {
      visible: 'false'
    })
    await this.entities!.setEntityAttributes('instructions', {
      visible: 'true'
    })

    this.sequence = []
    this.choiceSequence = []
    this.difficulty++

    for (let i = 0; i < this.difficulty; i++) {
      this.sequence.push('croc_' + Math.floor(Math.random() * 4)) // crocs 0-4
    }

    await this.playSequence()
  }

  async playSequence() {
    for (let i = 0; i < this.sequence.length; i++) {
      const croc = this.sequence[i]
      await this.entities!.tweenTo(croc, {
        position: {
          value: '0.5 0 0',
          duration: 700,
          relative: true
        }
      })

      await this.wait(700)

      await this.entities!.tweenTo(croc, {
        position: {
          value: '-0.5 0 0',
          duration: 500,
          relative: true
        }
      })

      await this.wait(500)
    }

    await this.beginRound()
  }

  async beginRound() {
    await this.forEachCroc(async croc => {
      await this.entities!.tweenTo(croc, {
        position: {
          value: '0.5 0 0',
          duration: 700,
          relative: true
        }
      })
    })

    await this.wait(700)
    this.choiceEnabled = true
  }

  async handleChoice(croc: string) {
    if (!this.choiceEnabled) return
    this.choiceSequence.push(croc)
    this.choiceSequence.forEach(async (chosenCroc, i) => {
      if (chosenCroc !== this.sequence[i]) {
        await this.gameOver()
      }
      // await this.moveCrocsToSpawn(chosenCroc)
    })

    if (this.playing && this.choiceSequence.length === this.difficulty) {
      await this.sound!.playSound('sounds/win.ogg')

      await this.moveCrocsToSpawn()
      await this.newRound()
    }
  }

  async gameOver() {
    this.playing = false

    await this.sound!.playSound('sounds/gameover.ogg')

    await this.entities!.setEntityAttributes('game_over', {
      visible: 'true'
    })
    await this.entities!.setEntityAttributes('instructions', {
      visible: 'false'
    })
    await this.resetGame()
  }

  async resetGame() {
    this.difficulty = 0
    this.choiceEnabled = false
    await this.moveCrocsToSpawn()
  }

  moveCrocsToSpawn(croc?: string) {
    return new Promise(async resolve => {
      await this.forEachCroc(async c => {
        if (croc && croc !== c) return
        await this.entities!.tweenTo(c, {
          position: { value: '5 0 5', duration: 700 }
        })
      })
      await this.wait(700)
      return resolve()
    })
  }

  async forEachCroc(fn: (entityId: string) => Promise<void>) {
    for (let i = 0; i < 5; i++) {
      const croc = `croc_${i}`
      await fn(croc)
    }
  }

  wait(ms: number): Promise<void> {
    return new Promise(ok => {
      setTimeout(ok, ms)
    })
  }
}

export const theSystem = new CrocsGame(WebWorkerTransport(self as any))
