import { HXElement } from './HXElement';
import shadowStyles from './_hx-error.less';

const template = document.createElement('template');

template.innerHTML = `
  <style>${shadowStyles}</style>
  <hx-icon type="exclamation-circle"></hx-icon>
  <slot></slot>
`;

export class HXErrorElement extends HXElement {
    static get is () {
        return 'hx-error';
    }

    constructor () {
        super('hx-error', template);
    }
}//HXErrorElement
