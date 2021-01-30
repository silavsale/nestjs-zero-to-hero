import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export default function getEnv(varName) {
    console.log('function getEnv');
    return process.env[varName];
}