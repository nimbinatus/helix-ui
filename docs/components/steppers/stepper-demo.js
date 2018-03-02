if (document.getElementById('vue-stepperDemo')) {
    new Vue({
        el: '#vue-stepperDemo',
        data: {
            selected : 0,
        },
        methods: {
            getAccordionElement: function (evt) {
                return evt.target.parentElement.parentElement;
            }, 
            nextStep: function (event) {
                let accordion = this.getAccordionElement(event);
                this.selected = Number (accordion.getAttribute('selected-panel')) || 0;
                this.selected += 1;
                accordion.getElementsByTagName('hx-accordion-panel')[this.selected].removeAttribute('disabled');
            },
            previousStep: function (event) {
                this.selected = Number (this.getAccordionElement(event).getAttribute('selected-panel'));
                this.selected = this.selected > 0 ? this.selected -= 1 : 0;
            },
            nextStepBindStepValue: function (event) {
                document.getElementById('selectedStepperValue').innerText = this.stepvalue;
                this.getAccordionElement(event).setAttribute('complete','');
                this.nextStep(event);
            },
        },
    });
}
