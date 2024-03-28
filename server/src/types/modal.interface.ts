import { Request, Response } from 'express';

interface modal_interface {
    token: Token;
    skill: Skill;
    project: Project;
    experience: Experience;
    contact: Contact;
    about: About;
    user?: User;
}

interface Token {
    id: string;
    user_id: string;
    token: string;
    ip: string;
    user_agent: string;
    valid_status?: boolean;
    user?: User;
}

interface Skill {
    id: string;
    user_id?: string;
    title: string;
    user?: User;
}

interface Project {
    id: string;
    user_id?: string;
    title: string;
    code_link: string;
    demo_link: string;
    description: string;
    user?: User;
}

interface Experience {
    id: string;
    user_id?: string;
    company: string;
    job_title: string;
    description: string;
    user?: User;
}

interface Contact {
    id?: string;
    user_id: string;
    name: string;
    email: string;
    message: string;
    user?: User;
}

interface About {
    id?: string;
    user_id: string;
    name: string;
    title: string;
    description: string;
    user?: User;
}

interface User {
    id?: number;
    email: string;
    password?: string;
    token?: Token;
    about?: About;
    contact?: Contact;
    skill?: Skill;
    project?: Project;
    experience?: Experience;
}

export { modal_interface }