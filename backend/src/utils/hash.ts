import bcrypt from 'bcrypt';

const generateSalt = async () => {
    return await bcrypt.genSalt();
}

export const hashPassword = async (password: string) => {
    const salt = await generateSalt();
    return await bcrypt.hash(password, salt);
}

export const compareHash = async (hashedPassword: string, storedHashPassword: string) => {
    return await bcrypt.compare(hashedPassword, storedHashPassword);
}   