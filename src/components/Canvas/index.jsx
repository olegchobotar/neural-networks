import React, { useState, useEffect, useRef } from 'react';
import { englishAlphabet } from '../../helpers/alphabet';

import styled from 'styled-components';
import Canvas from '../../models/Canvas';
import Perceptron from '../../models/Perceptron';
import addNewLetter from '../../actions/addNewLetter';
import './styles.css';
import {connect} from "react-redux";

const CanvasView = props => {
    const canvasRef = useRef(null);
    const [canvasInstance, setCanvasInstance] = useState(null);
    const [vector, setVector] = useState([]);
    const [letter, setLetter] = useState('');

    const handleClearing = () => {
        canvasInstance.clear();
    };

    const handleCalculation = () => {
        const calculatedVector = canvasInstance.calculate(true);
        setVector(calculatedVector);

    };

    const handleSaving = () => {
        props.addNewLetter({letter, vector});
    };

    const handleLetterChange = event => setLetter(event.target.value);

    useEffect(() => {
        const canvasEl = canvasRef.current;
        setCanvasInstance(new Canvas(canvasEl));

        const perceptron = new Perceptron(englishAlphabet, 30);
        console.log(props.filledAlphabet);
        perceptron.train(props.filledAlphabet);

    }, []);

    return (
        <>
            <div>
                <button onClick={handleClearing}> Clear </button>
                <button onClick={handleCalculation}> Calculate </button>
                <br/>
                <br/>
                <input type="text" onChange={handleLetterChange} defaultValue={letter} />
                <button onClick={handleSaving}> Save Letter </button>
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
