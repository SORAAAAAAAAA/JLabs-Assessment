import dotenv from 'dotenv';
import { POOL } from './config/database';
import { seedUsers } from './seeders/userSeeder';

dotenv.config();

const runSeed = async () => {
  try {
    await seedUsers();
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await POOL.end();
  }
};

runSeed();
