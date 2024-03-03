import * as jwt from 'jsonwebtoken';

const createJWT = (payload: Record<string, unknown>, expiresIn: string = '15d'): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
    return token;
};

const isTokenValid = async (token: string): Promise<any | false> => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (err) {
        return false;
    }
};

export {
    createJWT,
    isTokenValid,
};
