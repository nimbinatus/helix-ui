import { HXElement } from './HXElement';
import Icons from '../icons';
import shadowStyles from './_hx-accordion-panel.less';

const tagName = 'hx-accordion-panel';
const template = document.createElement('template');
template.innerHTML = `
  <style>${shadowStyles}</style>
  <button class="hx-accordion-btn" id="toggle" aria-controls="body" aria-expanded="false">
    <slot name="header"></slot>
    <span class="hxStepArrow" id="hx-angle-up-down"> </span>
  </button>
  <div id="body" aria-expanded="false" class="hx-accordion-pnl-body">
    <slot></slot>
  </div>
`;

export class HXAccordionPanelElement extends HXElement {
    static get is () {
        return tagName;
    }

    static get observedAttributes () {
        return [ 'open' ];
    }

    constructor () {
        super(tagName, template);

        this._btnToggle = this.shadowRoot.getElementById('toggle');
        this._elBody = this.shadowRoot.getElementById('body');
        this._arrSpan = this.shadowRoot.getElementById('hx-angle-up-down');
        this._onClick = this._onClick.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('open');
        if (this.open) {
            this._arrSpan.innerHTML = Icons['angle-up'];
        } else {
            this._arrSpan.innerHTML = Icons['angle-down'];
        }
        this._btnToggle.addEventListener('click', this._onClick);
    }

    disconnectedCallback () {
        this._btnToggle.removeEventListner('click', this._onClick);
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        let isOpen = (newVal !== null);

        if (newVal !== oldVal) {
            this._btnToggle.setAttribute('aria-expanded', isOpen);
            this._elBody.setAttribute('aria-expanded', isOpen);
            if (isOpen) {
                if (!this.parentElement._$allowMuliplePanel) {
                    this.$emit('open');
                }
                this._arrSpan.innerHTML = Icons['angle-up'];
                this._elBody.setAttribute('open', '');
            } else {
                this._arrSpan.innerHTML = Icons['angle-down'];
                this._elBody.removeAttribute('open');
            }
        }

    }

    _onClick () {
        if (!this.disabled) {
            this.open = !this.open;
        }
    }

    get open () {
        return this.hasAttribute('open');
    }

    set open (newVal) {
        if (newVal) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

}
