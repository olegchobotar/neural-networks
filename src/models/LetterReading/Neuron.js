export default class Neuron {
    static BIAS = 1;
    static LEARNING_RATIO = 0.01;

    constructor() {
        this.inputs = [];
        this.weights = [];
        this.biasWeight = Math.random();
    }

    setInputs = inputs => {
        if (this.inputs.length === 0) {
            this.inputs = inputs;
            this.generateWeights();
        }
        this.inputs = inputs;

    };

    generateWeights = () => {
       for (let i = 0; i < this.inputs.length; i++) {
           this.weights.push(Math.random());
       }
    };

    calculateOutput = () => {
        let sum = 0;

        for (let i = 0; i < this.inputs.length; i++) {
            sum += this.inputs[i] * this.weights[i];
        }
        sum += Neuron.BIAS * this.biasWeight;
        this.output = sum >= 0 ? 1 : 0;
    };

    adjustWeights = delta => {
        for (let i = 0; i < this.inputs.length; i++) {
            let d = this.weights[i];
            d += Neuron.LEARNING_RATIO * delta * this.inputs[i];
            this.weights[i] = d;
        }
        this.biasWeight += Neuron.LEARNING_RATIO * delta * Neuron.BIAS ;
    };

    getOutput = () => {
        this.calculateOutput();

        return this.output;
    };
}
