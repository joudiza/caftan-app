import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ استيراد أيقونة واتساب

const ContactSection = () => {
  return (
    <div className="bg-[#fbf6ef] text-[#4b3621] py-16 px-6">
      <h2 className="text-2xl md:text-3xl font-[Cinzel] font-bold uppercase text-center text-[#3f904e] mb-8">
        Contact
      </h2>

      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Nom</label>
          <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <button type="submit" className="w-full bg-[#3f904e] text-white font-bold py-2 px-4 rounded-md hover:bg-[#3f904e]/80 transition duration-300">
          Envoyer
        </button>
      </form>

      {/* ✅ زر واتساب */}
      <div className="flex justify-center mt-10">
        <a
          href="https://wa.me/359877312928" // <-- غيري الرقم هنا
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1ebd5a] transition duration-300"
        >
          <FaWhatsapp className="text-xl" />
          Envoyer un message sur WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
