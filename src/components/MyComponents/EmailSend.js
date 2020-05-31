import React from 'react';
import emailjs from 'emailjs-com';


export default function EmailSend() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('corrona_watch', 'template_tsJRJGAm', e.target, 'user_ZhRyO8iRI7txG0nQXJQFE')
      .then((result) => {
          console.log(result.text);
          alert("success")
      }, (error) => {
          console.log(error.text);
          alert("ERROR")
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}