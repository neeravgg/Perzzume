import { Request, Response } from 'express';

interface modal_interface {
    token: Token;
    skill: Skill;
    project: Project;
    experience: Experience;
    contact: Contact;
    about: About;
    user: User;
}

interface Token {
    id?: number;
    user_id: number;
    token: string;
    ip: string;
    user_agent: string;
    valid_status?: boolean;
    user?: User;
}

interface Skill {
    id?: number;
    user_id?: number;
    title: string;
    user?: User;
}

interface Project {
    id?: number;
    user_id?: number;
    title: string;
    code_link: string;
    demo_link: string;
    description: string;
    user?: User;
}

interface Experience {
    id?: number;
    user_id?: number;
    company: string;
    job_title: string;
    description: string;
    user?: User;
}

interface Contact {
    id?: number;
    user_id?: number;
    name: string;
    email: string;
    message: string;
    user?: User;
}

interface About {
    id?: number;
    user_id?: number;
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