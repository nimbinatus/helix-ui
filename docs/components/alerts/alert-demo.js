if (document.getElementById('vue-alertDemo')) {
    new Vue({
        el: '#vue-alertDemo',
        data: {
            isClosable: true,
            variant: {
                label: 'Default',
                value: '',
            },
            variants: [
                { value: '', label: 'Default' },
                { value: 'hxAlertError', label: 'Error' },
                { value: 'hxAlertSuccess', label: 'Success' },
                { value: 'hxAlertWarning', label: 'Warning' },
            ],
        },
        computed: {
            cssClasses: function () {
                var out = [];
                if (this.variant.value !== '') {
                    out.push(this.variant.value);
                }
                return out.join(' ');
            },
        },
    });
}
