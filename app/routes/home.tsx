import { useState } from "react";
import type { Route } from "./+types/home";
import Square from "../components/Square";

type turnos = {
  X: string;
  O: string;
};
const TURNOS: turnos = {
  X: "x",
  O: "o",
};

const WINNER_COMBO = [
  [0, 1, 2], // Horizontales
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 5], // Verticales
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonales
  [2, 4, 6],
];

export function loader() {
  return { name: "React Router" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // Aquí va código Javascript

  // Estado del tablero, tiene 9 cuadrículas, el estado de cada una es: ["x", "o", null]
  const [tablero, setTablero] = useState<Array<string | null>>(
    Array(9).fill(null)
  );

  // Estado del turno actual
  const [turno, setTurno] = useState<string>(TURNOS.X);

  // Estado del ganador
  const [winner, setWinner] = useState<string | boolean | null>(null);

  // Función para manejar los clics de las celdas
  const handleClick = (index: number) => {
    // Si la celda ya tiene contenido o si el juego ya fue ganado, salir de la función
    if (tablero[index] !== null || winner !== null) {
      console.log(
        "entró en condicional que verifica casillas nulas y existencia de ganador"
      );
      return;
    }

    // Crear copia del tablero por seguridad
    const copiaTablero = [...tablero];
    copiaTablero[index] = turno; // Asigna turno al tablero
    setTablero(copiaTablero);

    // Verificar si hay ganador
    const newWinner = checkWinner(copiaTablero);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(copiaTablero)) {
      setWinner(false); // Establece el ganador como false para indicar un empate
    } else {
      const nuevoTurno = turno == TURNOS.O ? TURNOS.X : TURNOS.O;
      setTurno(nuevoTurno); // Actualiza el turno
    }
  };

  // Función para revisar si hay ganador
  const checkWinner = (tablero: any[]) => {
    for (const combo of WINNER_COMBO) {
      const [pos1, pos2, pos3] = combo;
      if (
        tablero[pos1] && // Verifica si las tres casillas consecutivas tienen el mismo símbolo
        tablero[pos1] === tablero[pos2] &&
        tablero[pos2] === tablero[pos3]
      ) {
        return tablero[pos1]; // Retorna el símbolo ganador ubicado en la primera posición
      }
    }
    return null;
  };

  // Función para verificar el fin del juego
  const checkEndGame = (tablero: Array<string | null>) => {
    return tablero.every((cuadricula) => cuadricula !== null);
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.X);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold my-4">Bienvenido al juego triqui</h1>
      {/* Mostrar el turno actual */}
      <section className="mb-2 font-stretch-75% text-2xl ">
        Turno de: {turno.toUpperCase()}
      </section>
      {/*Contenedor de las celdas de ajedrez */}
      <div className="grid grid-cols-3 grid-rows-3 border-5 size-50 my-24 mx-30">
        {tablero.map((celda, index) => (
          <Square
            key={index}
            value={celda}
            onClick={() => handleClick(index)}
            className="w-full h-full border-2 border-indigo-600 text-5xl cursor-pointer hover:bg-emerald-300"
          ></Square>
        ))}
      </div>
      {/* Ventana modal/mensaje de fin de juego */}
      {winner !== null && (
        <section>
          <h2 className="text-5xl">
            {winner === false ? (
              "Empate"
            ) : (
              <>
                Ganó {""}
                <span
                  className={
                    winner === TURNOS.X ? "text-red-500" : "text-blue-500"
                  }
                >
                  {winner.toString().toUpperCase()}
                </span>
              </>
            )}
          </h2>
          <button
            className="mt-6 text-xl border-4 border-solid border-amber-600 hover:bg-amber-300 rounded-lg"
            onClick={resetGame}
          >
            Empezar nuevamente
          </button>
        </section>
      )}
    </div>
  );
}
