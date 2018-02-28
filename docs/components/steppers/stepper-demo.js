if (document.getElementById('vue-stepperDemo')) {
    new Vue({
        el: '#vue-stepperDemo',
        data: {
            selected : 1,
            step : 1,
            step2 : 0,
            stepvalue: '',
        },
        methods: {
            nextStep: function (event) {
                this.selected = Number (event.target.parentElement.parentElement.getAttribute('selected-panel')) || 0;
                (-1 < this.selected && this.selected < 2) ? this.selected += 1 : this.selected = 0;
                //event.target.parentElement.parentElement.setAttribute('selected', this.step);
            },
            previousStep: function () {
                this.selected = Number (event.target.parentElement.parentElement.getAttribute('selected-panel'));
                this.selected = this.selected > 0 ? this.selected -= 1 : 0;
            },
            nextStep2: function (event) {
                this.example2StepArr =
                  Array.from(event.target.parentElement.parentElement.getElementsByTagName('hx-accordion-panel'));
                let currentStep = this.example2StepArr.indexOf(event.target.parentElement);
                this.step2 = (-1 < currentStep && currentStep < 2) ? currentStep + 1 :
                    this.example2StepArr.indexOf(event.target.parentElement) + 1 ;
                event.target.parentElement.parentElement.setAttribute('selected-panel', this.step2);
            },
            previousStep2: function (event) {
                this.example2StepArr =
                  Array.from(event.target.parentElement.parentElement.getElementsByTagName('hx-accordion-panel'));
                let currentStep = this.example2StepArr.indexOf(event.target.parentElement);
                this.step2 = currentStep > 0 ? currentStep - 1 : 0;
                event.target.parentElement.parentElement.setAttribute('selected-panel', this.step2);
            },
            nextStepBindStepValue: function (event) {
                const accordion = event.target.parentElement;
                // accordion.setAttribute('stepValue', this.stepValue);
                document.getElementById('selectedStepperValue').innerText = this.stepvalue;
                accordion.setAttribute('complete','');
                this.nextStep(event);
            },
        },
    });
}
