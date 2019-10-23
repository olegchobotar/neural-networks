export default class TrainingSet {

    constructor(inputs, goodOutput) {
        this.inputs = inputs;
        this.goodOutput = goodOutput;
    }

    getInputs() {
        return this.inputs;
    }

    getGoodOutput() {
        return this.goodOutput;
    }
}
