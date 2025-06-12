interface SquareProps {
    value: string | null;   // Puede ser "X", "O" o nulo
    onClick: () => void;    // Función ejecutada al hacer clic
    className: string;
}

const Square: React.FC<SquareProps> = ( {value, onClick, className} ) => {
    // Clases condicionales para el color del texto
  const textColorClass = value === 'x' ? 'text-red-500' : value === 'o' ? 'text-blue-500' : '';

    return (
        <button className={`${className} ${textColorClass}`} onClick={onClick}>
            {value}
        </button>
    )
}

export default Square