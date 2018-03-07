import Util from '../../_util';

if (document.getElementById('vue-choiceDemo')) {
    new Vue({
        el: '#vue-choiceDemo',
        data: {
            size: {
                label: 'Default',
                value: '',
            },
            sizes: [
                { value: 'hxSm', label: 'Small' },
                { value: '', label: 'Default' },
                { value: 'hxLg', label: 'Large' },
            ],
            description: 'A couple of descriptive lines or a small bit of help text.',
            isChecked: false,
            isDisabled: false,
            isInvalid: false,
            isSubdued: false,
        },
        computed: {
            tileClasses: function () {
                let out = [];
                out.push(this.size.value);
                if (this.isSubdued) {
                    out.push('hxSubdued');
                }
                return out.join(' ').trim();
            },
            hasClasses: function () {
                return (this.tileClasses !== '');
            },
            snippet: function () {
                return Util.snippet(`
                  <div class="hxRow">
                    <label class="hxChoice">
                      <input type="radio"
                          ${this.isChecked ? 'checked' : ''}
                          ${this.isDisabled ? 'disabled' : ''}
                          ${this.isInvalid ? 'invalid' : ''}>
                      <hx-tile ${this.hasClasses ? `class="${this.tileClasses}"` : ''}>
                          <hx-tile-title>
                            Title here
                          </hx-tile-title>    
                          <hx-tile-description> 
                            ${this.description}
                          </hx-tile-description>
                      </hx-tile>
                    </label>
                  </div>
                `);
            },
        },
    });
}
