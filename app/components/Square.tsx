interface SquareProps {
    value: string | null;   // Puede ser "X", "O" o nulo
    onClick: () => void;    // Función ejecutada al hacer clic
    className: string;
    xColor: string;
    oColor: string;
}

const Square: React.FC<SquareProps> = ( {value, onClick, className, xColor, oColor} ) => {
    // Clases condicionales para el color del texto
  const textColorClass = value === 'x' ? xColor : value === 'o' ? oColor : '';

    return (
        <button className={`${className} ${textColorClass}`} onClick={onClick}>
            {value}
        </button>
    )
}

export default Square