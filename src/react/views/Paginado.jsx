import React from "react";

const Paginado = ({ pokemonsTotal, paginado }) => {
  let pageNumber = [];

  for (let i = 1; i <= Math.ceil(pokemonsTotal / 12); i++) {
    pageNumber.push(i-1);
  }

  return (
    <div>
      {pageNumber?.map((num) => (
        <button key={num} onClick={() => paginado(num)}>
          {num + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginado;
