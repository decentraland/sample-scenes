import { createElement } from '../../../sdk/JSX'
import { Script, inject, EntityController, WebWorkerTransport } from '../../../sdk'
import { EventSubscriber } from 'dcl-scripting'

let isScaled = false

export class InteractiveText extends Script {
  @inject('EntityController') entityController: EntityController | null = null
  eventSubscriber: EventSubscriber | null = null

  steps = [
    {
      color: { value: 'red', duration: 750 },
      font: { value: 'fonts/dejavu-sdf.fnt', duration: 750 }
    },
    {
      color: { value: 'green', duration: 750 },
      font: { value: 'fonts/source-code-pro.fnt', duration: 750 }
    },
    {
      color: { value: 'blue', duration: 750 },
      font: { value: 'fonts/dejavu-sdf.fnt', duration: 750 }
    },
    {
      color: { value: 'yellow', duration: 750 },
      font: { value: 'fonts/source-code-pro.fnt', duration: 750 }
    }
  ]

  currentStep = 0

  async systemDidEnable() {
    this.eventSubscriber = new EventSubscriber(this.entityController!)
    await this.render()

    this.eventSubscriber.on('interactiveText_click', async (evt: any) => {
      isScaled = !isScaled
      await this.entityController!.setEntityAttributes('interactiveText', {
        scale: isScaled ? '3 3 3' : '1 1 1'
      })
    })

    setInterval(async () => {
      await this.entityController!.tweenTo('interactiveText', this.steps[this.currentStep])

      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      } else {
        this.currentStep = 0
      }
    }, 1000)
  }

  async render() {
    await this.entityController!.render(
      <a-scene>
        <a-text id="interactiveText" position="1 1 1" value="Hello world!" scale="1 1 1" side="both" />
      </a-scene>
    )
  }
}

export const theSystem = new InteractiveText(WebWorkerTransport(self as any))
