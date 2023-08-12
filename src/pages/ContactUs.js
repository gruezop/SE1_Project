import React, {useState} from "react";


export const ContactUs = () => {

    const contactUserDetails = {
        name: '',
        email: '',
        message: '',
    }

    const [contactDetails, setContactDetails] = useState(contactUserDetails);

    const onFormUpdate = (category, value) => {
        setContactDetails({
            ...contactDetails,
            [category]: value
        })
    }

    const [submit, setSubmit] = useState(false);
    const handleSubmit = () => {
        alert("Thank you! We received your message.")
        setSubmit(true);
    }


    return (
        <article>

                <h2>Send Us A Message</h2>
                <p className="p-contact">We'll get back to you within 24 hours. </p>
                <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                    <label for="name">Name
                    <input type="text" 
                    className="form-input"
                    placeholder="Your Name"
                    value={contactDetails.name}  
                    onChange={e => onFormUpdate('name', e.target.value)}/>
                    </label>
                    <label for="email">Email
                    <input type="email" 
                    className="form-input"
                    placeholder="Email Address"
                    value={contactDetails.email}  
                    onChange={e => onFormUpdate('email', e.target.value)}/>
                    </label>
                    <label for="message"> Message
                    <textarea 
                    className="form-message"
                    placeholder="Your Message"
                    value={contactDetails.message}  
                    onChange={(e)=> onFormUpdate('message', e.target.value)}/>
                    <button value={submit} type="submit" >Send</button>
                    </label>
                    </fieldset>
                </form>
                </div>
        </article>
    )

}

export default ContactUs;