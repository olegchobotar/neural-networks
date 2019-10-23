import Neuron from './Neuron';
export default class Network {

    constructor() {
       this.neurons = [];
    }

    addNeurons = count => {
        for (let i = 0; i < count; i++) {
            this.neurons.push(new Neuron());
        }
    };

    setInputs = (inputs) => {
        this.neurons.forEach((neuron) => {
            neuron.setInputs(inputs);
        });
    };

    getOutputs = () => {
        let outputs = [];
            this.neurons.forEach((neuron) => {
                outputs.push(neuron.getOutput());
            });

        return outputs;
    };

    adjustWages(goodOutput) {
        for (let i = 0; i < this.neurons.length; i++) {
            const delta = goodOutput[i] - this.neurons[i].getOutput();
            this.neurons[i].adjustWeights(delta);
        }
    }

}
