import { LitElement } from '@lion/core';
import { storiesOf, html } from '@open-wc/demoing-storybook';
import { bug12 } from '@lion/icon/stories/icons/bugs-collection.js';
import '@lion/icon/lion-icon.js';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';

import '../lion-button.js';

storiesOf('Buttons|Button', module)
  .add(
    'Used on its own',
    () => html`
      <style>
        .demo-box {
          display: flex;
          padding: 8px;
        }

        lion-button {
          margin: 8px;
        }
      </style>
      <div class="demo-box">
        <lion-button>Default</lion-button>
        <lion-button><lion-icon .svg="${bug12}"></lion-icon>Debug</lion-button>
        <lion-button type="submit">Submit</lion-button>
        <lion-button aria-label="Debug"><lion-icon .svg="${bug12}"></lion-icon></lion-button>
        <lion-button @click="${e => console.log('clicked/spaced/entered', e)}">
          click/space/enter me and see log
        </lion-button>
        <lion-button disabled>Disabled</lion-button>
      </div>
    `,
  )
  .add('Within a form', () => {
    class formExample extends LitElement {
      constructor() {
        super();
        this.name = '';
      }

      static get properties() {
        return {
          name: {
            type: String,
          },
        };
      }

      setSubmittedButton(inputId, event) {
        event.preventDefault();
        this.name = this.shadowRoot.getElementById(inputId).value;
        console.log('My name is:', this.name);
      }

      render() {
        return html`
          <h1>Form Examples</h1>
          <h2>Native Form</h2>
          <form>
            <label for="name1">Click:</label>
            <input id="name1" name="name" value="123" />
            <lion-button @click="${this.setSubmittedButton.bind(this, 'name1')}"
              >Submit</lion-button
            >
          </form>
          <form @submit="${this.setSubmittedButton.bind(this, 'name2')}">
            <label for="name2">Submit:</label>
            <input id="name2" name="name" value="234" />
            <lion-button>Submit</lion-button>
          </form>
          <p>
            See the result:
            ${this.name
              ? html`
                  My name is ${this.name}
                `
              : html``}
          </p>

          <h2>Lion Form</h2>
          <lion-form
            ><form>
              <label for="name3">Click:</label>
              <input id="name3" name="name" value="345" />
              <lion-button @click="${this.setSubmittedButton.bind(this, 'name3')}"
                >Submit</lion-button
              >
            </form></lion-form
          >

          <lion-form @submit="${this.setSubmittedButton.bind(this, 'name4')}"
            ><form>
              <label for="name4">Submit:</label>
              <input id="name4" name="name" value="456" />
              <lion-button>Submit</lion-button>
            </form></lion-form
          >
          <p>
            See the result:
            ${this.name
              ? html`
                  My name is ${this.name}
                `
              : html``}
          </p>
        `;
      }
    }
    if (!customElements.get('form-example')) {
      customElements.define('form-example', formExample);
    }

    return html`
      <form-example></form-example>
    `;
  });
