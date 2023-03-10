import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function ErrorModal({ isOpen, onClose}) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario y registrar al usuario
    onClose(); // Cerrar la modal después de registrar al usuario
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="flex w-screen justify-center bg-red-800 mt-[40vh] text-white">
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-bold mb-4">Contraseñas deben coincidir</h2>
        <button
          className="rounded-lg px-6 py-3 bg-gradient-to-r from-black text-white hover:to-black"
          onClick={handleFormSubmit}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

export default ErrorModal;