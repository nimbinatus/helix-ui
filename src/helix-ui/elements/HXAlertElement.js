import { HXElement } from './HXElement';
import { KEYS } from '../util';
import shadowStyles from './_hx-alert.less';

const tagName = 'hx-alert';
const template = document.createElement('template');

template.innerHTML = `
  <style>${shadowStyles}</style>
  <hx-icon id="info" type="info-circle"></hx-icon>
  <hx-icon id="error" type="exclamation-circle"></hx-icon>
  <hx-icon id="success" type="checkmark-circle"></hx-icon>
  <hx-icon id="warning" type="exclamation-triangle"></hx-icon>
  <slot></slot>
  <button id="close">
    <hx-icon type="times"></hx-icon>
  </button>
`;

export class HXAlertElement extends HXElement {
    static get is () {
        return tagName;
    }

    static get observedAttributes () {
        return [ 'closable' , 'open' ];
    }

    constructor () {
        super(tagName, template);
        this._close = this._close.bind(this);
        this._keyUp = this._keyUp.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('closable');
        this.$upgradeProperty('open');

        this.$defaultAttribute('open', true);
        this.$defaultAttribute('role', 'status');
        this.$defaultAttribute('aria-live', 'polite');

        this._btnClose = this.shadowRoot.querySelector("#close");

        this._btnClose.addEventListener('click', this._close);
        document.addEventListener('keyup', this._keyUp);
    }

    disconnectedCallback () {
        this._btnClose.removeEventListener('click', this._close);
        document.removeEventListener('keyup', this._keyUp);
    }

    attributeChangedCallback (attr, oldValue, newValue) {
        this.setAttribute('aria-hidden', newValue !== '');
    }

    _close () {
        this.open = false;
    }

    _keyUp (event) {
        if (this.closable && event.keyCode === KEYS.Escape) {
            this._close();
        }
    }

    set closable (value) {
        if (value) {
            this.setAttribute('closable', '');
        } else {
            this.removeAttribute('closable');
        }
    }

    get closable () {
        return this.hasAttribute('closable');
    }

    set open (value) {
        if (value) {
            this.setAttribute('open', '');
            this.$emit('open');
        } else {
            this.removeAttribute('open');
            this.$emit('close');
        }
    }

    get open () {
        return this.hasAttribute('open');
    }
}
