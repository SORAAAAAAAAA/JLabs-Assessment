import bcrypt from 'bcrypt';
import { POOL } from '../config/database';

interface SeedUser {
  name: string;
  email: string;
  password: string;
}

const SEED_USERS: SeedUser[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123!',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Password123!',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'Password123!',
  },
];

const seedUsers = async () => {
  try {
    console.log('Starting user seeding...');

    for (const seedUser of SEED_USERS) {
      // Check if user already exists
      const existingUser = await POOL.query(
        'SELECT * FROM users WHERE email = $1',
        [seedUser.email]
      );

      if (existingUser.rowCount! > 0) {
        console.log(`Skipping ${seedUser.email} (already exists)`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(seedUser.password, 10);

      // Insert user
      const result = await POOL.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [seedUser.name, seedUser.email, hashedPassword]
      );

      console.log(`Created user: ${result.rows[0].email}`);
    }

    console.log('User seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

export { seedUsers };
