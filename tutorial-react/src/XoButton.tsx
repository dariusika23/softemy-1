import { XoState } from "./XoState"

export const XoButton = (props: {
    state: XoState,
    setState: (state: XoState) => void,
    idx: number
}) => {

    const handleClick = () => {
        const state = props.state;
        state.board[props.idx] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
        props.setState({...state});
    }

    const background = props.state.board[props.idx] !== '' ? 'yellow' : '';

    let imgSrc = 'empty.png';
    if (props.state.board[props.idx] === 'X') {
        imgSrc = 'x.png';
    } else if (props.state.board[props.idx] === 'O') {
        imgSrc = 'y.png';
    }

    return (
        <img src={imgSrc}
        onClick={handleClick}
        style={{
            background,
            width: '40px',
            height: '40px',
            fontSize: '30px',
            lineHeight: '40px',
            textAlign: 'center',
            borderStyle: 'solid',
            borderColor: 'black'
        }}
            /* {props.state.board[props.idx]}</div> */
            />
    )
}