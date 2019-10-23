import Network from './Network';

export default class Trainer {
    static NEURON_COUNT = 26;

    constructor() {
        this.network = new Network();
        this.network.addNeurons(Trainer.NEURON_COUNT);
        this.trainingSets = [];
    }
    setTrainingSets(trainingSets) {
        this.trainingSets = trainingSets;
    }

    train = count => {
        console.log(this.trainingSets);
        for (let i = 0; i < count; i++) {
            const index = Number.parseInt(Math.random() * this.trainingSets.length);
            const set = this.trainingSets[index];
            this.network.setInputs(set.getInputs());
            this.network.adjustWages(set.getGoodOutput());
        }
    };

    setInputs(inputs) {
        this.network.setInputs(inputs);
    }

    addTrainingSet(newSet) {
        this.trainingSets.add(newSet);
    }

    getOutputs() {
        return this.network.getOutputs();
    }

    getTrainingSets() {
        return this.trainingSets;
    }
}
