import { routeMeta } from '../utils/routeMeta.js';

export const navigation = routeMeta.map(({ label, path }) => ({ label, href: path }));
