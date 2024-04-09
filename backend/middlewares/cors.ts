import cors, { CorsOptions } from 'cors';

const ACCEPTED_ORIGINS: string[] = [
    'http://localhost:3001',
    'http://localhost:3000'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: { acceptedOrigins?: string[] } = {}): ReturnType<typeof cors> => cors({
    origin: (origin: any, callback: any) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    }
} as CorsOptions);
