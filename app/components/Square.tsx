interface SquareProps {
    value: string | null;   // Puede ser "X", "O" o nulo
    onClick: () => void;    // Función ejecutada al hacer clic
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}

export default Square