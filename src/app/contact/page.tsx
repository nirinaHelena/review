'use client'
import React, { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, 'name required'),
    email: z.string().email('invalid email'),
    num: z.string().min(10, 'valid num required'),
    message: z.string().min(1, 'message cannot be empty')
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({name: '', email: '',num: '', message: ''});
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            formSchema.parse(formData);
            console.log("valide data: ", formData);
            alert("Success submission");
        }catch(error){
            if (error instanceof z.ZodError) {
                const newErrors: Partial<FormData> = {};
                error.errors.forEach(({path, message}) => {
                    newErrors[path[0]] = message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div>{errors.name}</div>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div>{errors.email}</div>}
          </div>
          <div>
            <label>Numéro:</label>
            <input type="text" name="num" value={formData.num} onChange={handleChange} />
            {errors.num && <div>{errors.num}</div>}
          </div>
          <div>
            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} />
            {errors.message && <div>{errors.message}</div>}
          </div>
          <button type="submit">Envoyer</button>
        </form>
    );
}

export default Contact;