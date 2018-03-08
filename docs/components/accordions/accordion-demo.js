if (document.getElementById('vue-accordionDemo')) {
    new Vue({
        el: '#vue-accordionDemo',
        data: {
            variant: {
                label: 'Show one panel only',
                value: 0,
            },
            variants: [ { value: 0, label: 'Show one panel only' },{ value: null, label: 'show multi panel' } ],
        },
        computed: {
            selected: function () {
                return this.variant.value;              
            },
        },
    });
}
