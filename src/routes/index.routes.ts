import { Router } from 'express';
import { readdirSync } from 'fs';

const router = Router();
const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string): string => {
    return fileName.split('.').shift() || 'index';
} 

const buildRouter = () => {
    readdirSync(pathRouter).filter((file) => {
        const fileName = removeExtension(file);
        const skip = ['index'];
        const skipped = skip.includes(fileName);
    
        if (!skipped) {
            import(`./${fileName}.routes`).then((route) => {
                router.use(`/${fileName}`, route.default);
            });
        }
    
    });
    console.log('Routes loaded');
}

buildRouter();

export default router;