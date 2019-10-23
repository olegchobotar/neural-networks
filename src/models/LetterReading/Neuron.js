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




    // evaluate = values => {
    //     const inputs = this.addAdditionalInputs(values);
    //     const expectedResult = this.generateExpectedResults(values);
    //
    //     // let errorsCount = 0;
    //     let errors = [];
    //     const output = inputs.map((input, key) => {
    //
    //     });
    //
    //                     // inputs.forEach((input, key) => {
    //                     //     const output = this.calculateSum(input.vector, this.weights[key]);
    //                     //     errors[key] = expectedResult[key] - output;
    //                     //     // if (output !== expectedResult[key]) {
    //                     //         // errorsCount++;
    //                     //         // output === 0 ? this.increaseWeights(input) : this.decreaseWeights(input);
    //                     //     // }
    //                     // });
    //     // return errorsCount;
    // };
    //
    // train = valuesForTrain => {
    //     let errors = null;
    //     if (!valuesForTrain.length) {
    //         return ;
    //     }
    //
    //     // do {
    //         errors = this.evaluate(valuesForTrain);
    //     // } while (errors !== 0);
    // };
    //
    // calculateSum = (vector, weights) => {
    //     console.log(vector)
    //     let sum = 0;
    //     for (let i = 1; i < vector.length; i++) {
    //         sum += vector[i] * weights[i];
    //     }
    //     console.log(vector, weights);
    //     return this.getResult(sum);
    // };
    //
    // getResult = sum => sum >= this.threshold ? 1 : 0;
    //
    // increaseWeights = input => {
    //     this.weights = this.weights.map((weight, key) => weight + input[key]);
    // };
    //
    // decreaseWeights = input => {
    //     this.weights = this.weights.map((weight, key) => weight - input[key])
    // };
    //
    //
    //
    // addAdditionalInputs = inputs => inputs.map(input => {
    //     input.vector.unshift(1);
    //     return input;
    // });
    //
    // generateExpectedResults = values => values.map((outsideValue, outIndex) =>
    //     values.map((innerValue, inIndex) => inIndex === outIndex ? 1 : 0));

}
