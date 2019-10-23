import { englishAlphabet } from '../helpers/alphabet';
const letters = englishAlphabet.map(letter => ({letter, vector: []}));

const defaultState = {
    letters,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_NEW_LETTER':
            return {
                ...state,
                letters: state.letters.map((item) => action.value.letter === item.letter ? action.value : item)
            };
        default:
            return state;
    }
};
