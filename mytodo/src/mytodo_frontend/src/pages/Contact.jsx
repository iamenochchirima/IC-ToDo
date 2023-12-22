import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_515ffkj', 'template_mev2i6v', form.current, 'ni25KjXycoHjn-cD1')
      .then((result) => {
        console.log(result.text);
        console.log("message was sent")
      }, (error) => {
        console.log(error.text);
      });
  };

  const sendToSomeone = () => {
    const templateParams = {
      from_name: 'Enoch Chirima',
      to_name: 'Mr Enoch Tswaanda',
      to_user_email: 'enoch@tswaanda.com',
      message: "Wassup"
  };

    emailjs.send('service_515ffkj', 'template_mev2i6v',  templateParams, 'ni25KjXycoHjn-cD1')
     .then((result) => {
      console.log('SUCCESS!', result.status, result.text);
        console.log("message was sent")
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <div className="">
      <div className="mt-5 flex justify-center mb-5">
        <button onClick={sendToSomeone} className='bg-blue-500 rounded p-2'>
          Send to someone
        </button>
      </div>

      <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="user_name" name="from_name" className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>


        <div className="mb-4 hidden">
          <label htmlFor="to_name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="to_name" name="to_name" value={"Enoch Chirima"} className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>


        <div className="mb-4 ">
          <label htmlFor="user_email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="user_email" name="user_email" className="w-full  text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea id="message" name="message" className="w-full px-3  text-gray-700 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Send</button>
      </form>
    </div>

  )
}

export default Contact