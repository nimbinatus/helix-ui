if (document.getElementById('vue-choiceTileDemo')) {
    new Vue({
        el: '#vue-choiceTileDemo',
        data: {
            isHovered: false,
            variant: {
                label: 'Default',
                value: '',
            },
            variants: [
                { value: '', label: 'Default' },
                { value: 'checked', label: 'Selected' },
                { value: 'invalid', label: 'Invalid' },
            ],
        },
    });
}
