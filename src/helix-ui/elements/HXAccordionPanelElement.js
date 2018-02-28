import { HXElement } from './HXElement';
import shadowStyles from './_hx-accordion-panel.less';

const tagName = 'hx-accordion-panel';
const template = document.createElement('template');
template.innerHTML = `
  <style>${shadowStyles}</style>
  <hx-disclosure id="hx-accordion-header" aria-controls="hx-accordion-body">
    <slot name="header"></slot>
    <hx-icon class="hxPrimary" type="angle-down"></hx-icon>
  </hx-disclosure>
  <hx-reveal id="hx-accordion-body">
    <slot></slot>
  </hx-reveal>
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
        this._$disclosure = this.shadowRoot.querySelector('hx-disclosure');
        this._$reveal = this.shadowRoot.querySelector('hx-reveal');
        this._$disclosure.expanded = this.open;
        this._$reveal.open = this.open;
    }

    connectedCallback () {
        this.$upgradeProperty('open');
        // logic to expand and show current-step by default
        if (this.parentElement.panels[this.parentElement.getAttribute('selected-panel')] === this) {
            this._$disclosure.expanded = this.open;
            //this.shadowRoot.querySelector('hx-reveal').setAttribute('open', '');
        }
        console.log('panel -> connectedCallback');
        //this._$reveal.addEventListener('open', this._onOpen);
    }

    disconnectedCallback () {
        this._$reveal.removeEventListener('open', this._onOpen);
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        if (newVal !== null) {
            
            //this._$disclosure.setAttribute('aria-expanded', true);
            console.log('panel -> attributeChangedCallback');
            this._$disclosure.expanded = this.open;
            if (oldVal !== newVal) {
                this.$emit('open');
            }
        } else {
            this._$disclosure.expanded = false;
        }
    }
        
    _onOpen (evt) {
        this.open = true;
        evt.stopPropagation();
    }

    get open () {
        return this.hasAttribute('open');
    }

    set open (newVal) {
        newVal ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

}
