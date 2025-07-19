import { compare, hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

// hash user's password
export async function hashPassword(password) {
    const result = await hash(password, 12);
    return result;
}

// verify user's password
export async function verifyPassword(password, hashedPassword) {
    const result = await compare(password, hashedPassword);
    return result;
}

// verify user's token
export function verifyToken(token) {
    if (!token) return false;
    try {
        return verify(token, process.env.JWT_SECRET);
    } catch {
        return false;
    }
}
