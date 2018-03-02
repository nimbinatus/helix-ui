if (document.getElementById('vue-stepperDemo')) {
    new Vue({
        el: '#vue-stepperDemo',
        data: {
            selected: 0,
            stepvalue: '',
        },
        methods: {
            getAccordionElement: function (evt) {
                return evt.target.parentElement.parentElement;
            }, 
            getPanelArray: function (evt) {
                return Array.from(this.getAccordionElement(evt).getElementsByTagName('hx-accordion-panel'));
            },
            nextStep: function (event) {
                this.selected = Number(event.currentTarget.parentElement.getAttribute('index')) + 1;
                this.getPanelArray(event)[this.selected].removeAttribute('disabled');
            },
            previousStep: function () {
                this.selected = Number(event.currentTarget.parentElement.getAttribute('index')) - 1;
            },
            nextStepBindStepValue: function (event) {
                document.getElementById('selectedStepperValue').innerText = this.stepvalue;
                this.getAccordionElement(event).setAttribute('complete','');
                this.nextStep(event);
            },
            updateStepValue: function () {
                let panel = event.currentTarget.parentElement;
                if (!panel.getAttribute('disabled')) {
                    this.selected = Number(panel.getAttribute('index'));
                }
                event.stopPropagation();
            },
        },
    });
}
