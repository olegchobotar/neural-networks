import React, { useState, useEffect, useRef } from 'react';
import { englishAlphabet } from '../../helpers/alphabet';

import styled from 'styled-components';
import Canvas from '../../models/Canvas';
import Trainer from '../../models/LetterReading/Trainer';
import TrainingSet from '../../models/LetterReading/TrainingSet';
import addNewLetter from '../../actions/addNewLetter';
import './styles.css';
import {connect} from "react-redux";

const CanvasView = props => {
    const canvasRef = useRef(null);
    const [canvasInstance, setCanvasInstance] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const [vector, setVector] = useState([]);
    const [letter, setLetter] = useState('');

    const handleClearing = () => {
        canvasInstance.clear();
    };

    const onChangeSelect = (event) => {
        const letterIndex = event.target.value;

        setVector(props.filledAlphabet[letterIndex].vector);
    };

    const handleCalculation = () => {
        const calculatedVector = canvasInstance.calculate(true);
        setVector(calculatedVector);
    };

    const handleGettingResult = () => {
        const calculatedVector = canvasInstance.calculate(true);
        setVector(calculatedVector);
        trainer.setInputs(vector);
        const outputs = trainer.getOutputs();
        let index = 0;
        for (let i = 0; i < outputs.length; i++) {
            if (outputs[i] > outputs[index])
                index = i;
        }
        console.log(outputs);
    };

    const handleSaving = () => {
        const calculatedVector = canvasInstance.calculate(true);
        setVector(calculatedVector);
        props.addNewLetter({letter, vector: calculatedVector});
    };

    const handleTraining = () => {
        const trainingSets = props.filledAlphabet.map(({letter, vector}) => {
            const goodOutput = props.filledAlphabet.map((innerLetter) => innerLetter.letter === letter ? 1 : 0);
            return new TrainingSet(vector, goodOutput);
        });

        trainer.setTrainingSets(trainingSets);
        trainer.train(5000);
    };

    const handleLetterChange = event => setLetter(event.target.value);

    useEffect(() => {
        const canvasEl = canvasRef.current;
        setCanvasInstance(new Canvas(canvasEl));

        const trainer = new Trainer();
        setTrainer(trainer);
    }, []);

    return (
        <>
            <div>
                <button onClick={handleClearing}> Clear </button>
                <button onClick={handleCalculation}> Calculate </button>
                <button onClick={handleTraining}> Train </button>
                <button onClick={handleGettingResult}> Result </button>
                <br/>
                <br/>
                <input type="text" onChange={handleLetterChange} defaultValue={letter} />
                <button onClick={handleSaving}> Save Letter </button>
                <br/>
                <br/>
                <select onChange={onChangeSelect}>
                    {props.filledAlphabet.map((letter, key) => (
                        <option key={key} value={key}>{letter.letter}</option>
                    ))};
                </select>
            </div>
            <Wrapper>
               <div className="canvas-wrapper">
                   <canvas
                       ref={canvasRef}
                       width="600"
                       height="600"
                   />
               </div>
            </Wrapper>
        </>
    )
};

const mapStateToProps = state => ({
    filledAlphabet: state.Alphabet.letters,
});

const mapDispatchToProps = { addNewLetter };

export default connect(
    mapStateToProps, mapDispatchToProps
) (CanvasView);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    height: 100%;
`;
