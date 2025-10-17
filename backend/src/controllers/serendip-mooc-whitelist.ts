import { Router, Request, Response } from 'express';
import { getCloudSave, updateCloudSave } from '../services/accelbyte.js';
import config from '../config.js';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization?.trim();
    const expectedToken = `Bearer ${config.SERENDIP_WHITELIST_TOKEN}`.trim();
    if (authHeader !== expectedToken) {
        console.log("Unauthorized, the token was: ", authHeader, "' expected: ", expectedToken);
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    console.log("Auth successfull, trying to access cloudsave");
    let result = await getCloudSave('permissions');
    console.log("result", result);

    res.json(result);
});

router.post('/', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization?.trim();
    const expectedToken = `Bearer ${config.SERENDIP_WHITELIST_TOKEN}`.trim();
    if (authHeader !== expectedToken) {
        console.log("Unauthorized, the token was: ", authHeader, "' expected: ", expectedToken);
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    console.log("req.body", req.body)
    if (!req.body) {
        res.status(400).json({ message: 'Missing permissions data' });
        return;
    }
    let old = await getCloudSave('permissions');
    if (old.value) {
        let newPermissions = req.body;
        old.value.value.episode_1 = [...(new Set([...old.value.value.episode_1, ...newPermissions]))];
        let result = await updateCloudSave('permissions', old.value);
        res.json(result);
    } else {
        res.status(500).json({ message: 'Failed to get permissions' });
    }
});

export default router;
