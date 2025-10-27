
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"
        role="status"
      >
      </div>
      <span className="text-indigo-600 font-medium">Carregando Produtos...</span>
    </div>
  );
};

export default Spinner;
