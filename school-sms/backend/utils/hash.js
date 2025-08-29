import bcrypt from 'bcryptjs';
export const hash = (s) => bcrypt.hashSync(s, 10);
export const compare = (s, h) => bcrypt.compareSync(s, h);
