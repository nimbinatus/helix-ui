import { HXElement } from './HXElement';

export class HXAccordionElement extends HXElement {
    static get is () {
        return 'hx-accordion';
    }

    static get observedAttributes () {
        return [ 'selected-panel' ];
    }

    constructor () {
        super();
        this._$allowMuliplePanel = !this.hasAttribute('selected-panel');
        this._onPanelOpen = this._onPanelOpen.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('selected-panel');
        this.panels.forEach(panel => {
            panel.addEventListener('open', this._onPanelOpen);
        });
    }

    disconnectedCallback () {
        this.panels.forEach(panel => {
            panel.removeEventListener('open', this._onPanelOpen);
        });
    }

    get panels () {
        return Array.from(this.querySelectorAll('hx-accordion-panel'));
    }

    attributeChangedCallback (attr, oldValue, newVal) {
        if (newVal !== null) {
            this._openPanel(Number(newVal));
        }
    }

    _onPanelOpen (evt) {
        let idx = this.panels.indexOf(evt.target);
        this.selectedPanel = idx;
        this._openPanel(idx);
    }

    _openPanel (index) {
        if (this.hasAttribute('selected-panel')) {
            this.panels.forEach((panel, idx) => {
                if (index === idx) {
                    panel.open = true;
                    panel.focus();
                } else  {
                    panel.open = false;
                    panel.blur();
                }
            });
        }
    }

    set selectedPanel (idx) {
        this.setAttribute('selected-panel', idx);
    }

    get selectedPanel () {
        this.getAttribute('selected-panel');
    }

}
