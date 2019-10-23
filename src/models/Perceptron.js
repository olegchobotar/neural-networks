export default class Perceptron {
    constructor(alphabet, arraySize) {
        this.weights = this.generateWeights(alphabet.length, arraySize);
        this.threshold = Math.random();
    }

    evaluate = values => {
        const inputs = this.addAdditionalInputs(values);k
        const expectedResult = this.generateExpectedResults(values);

        // let errorsCount = 0;
        let errors = [];
        const output = inputs.map((input, key) => {

        });

                        // inputs.forEach((input, key) => {
                        //     const output = this.calculateSum(input.vector, this.weights[key]);
                        //     errors[key] = expectedResult[key] - output;
                        //     // if (output !== expectedResult[key]) {
                        //         // errorsCount++;
                        //         // output === 0 ? this.increaseWeights(input) : this.decreaseWeights(input);
                        //     // }
                        // });
        // return errorsCount;
    };

    train = valuesForTrain => {
        let errors = null;
        if (!valuesForTrain.length) {
            return ;
        }

        // do {
            errors = this.evaluate(valuesForTrain);
        // } while (errors !== 0);
    };

    calculateSum = (vector, weights) => {
        console.log(vector)
        let sum = 0;
        for (let i = 1; i < vector.length; i++) {
            sum += vector[i] * weights[i];
        }
        console.log(vector, weights);
        return this.getResult(sum);
    };

    getResult = sum => sum >= this.threshold ? 1 : 0;

    increaseWeights = input => {
        this.weights = this.weights.map((weight, key) => weight + input[key]);
    };

    decreaseWeights = input => {
        this.weights = this.weights.map((weight, key) => weight - input[key])
    };

    generateWeights = (lettersCount, size) => {
        let generatedWeights = [[]];
        for (let i = 0; i < lettersCount; i++) {
            generatedWeights[i] = [];
            for (let j = 0; j < size * size + 1; j++) {
               generatedWeights[i][j] = Math.random();
           }
        }
        return generatedWeights;
    };

    addAdditionalInputs = inputs => inputs.map(input => {
        input.vector.unshift(1);
        return input;
    });

    generateExpectedResults = values => values.map((outsideValue, outIndex) =>
        values.map((innerValue, inIndex) => inIndex === outIndex ? 1 : 0));

}
