
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Chagas Representações. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Produtos gerados pela API Gemini do Google.</p>
      </div>
    </footer>
  );
};

export default Footer;
