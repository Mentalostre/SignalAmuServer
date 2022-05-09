import crypto from 'crypto'

export const hash = (p) => {
    return crypto.createHash('sha256').update(p).digest("base64");
};
