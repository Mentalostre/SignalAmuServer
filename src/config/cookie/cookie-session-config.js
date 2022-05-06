import cookieSession from 'cookie-session';


const params = {
    name: 'session',
    secret: process.env.COOKIE_PASS_PHRASE || 'password'
};

export const cookieSessionConfig = cookieSession(params);