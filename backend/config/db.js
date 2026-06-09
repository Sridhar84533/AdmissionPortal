import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Ensure data folder exists
const dataDir = path.dirname(JSON_DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/applicant_portal';
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000 // Quick timeout to fallback fast
    });
    isMongoConnected = true;
    console.log('MongoDB Connected successfully.');
  } catch (err) {
    console.warn('MongoDB connection failed. Falling back to Local JSON File Database.', err.message);
    isMongoConnected = false;
    // Initialize file database if not present
    if (!fs.existsSync(JSON_DB_PATH)) {
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify({
        users: [],
        applications: [],
        appointments: [],
        supportTickets: [],
        notifications: []
      }, null, 2));
    }
  }
};

export const getDbMode = () => isMongoConnected ? 'mongodb' : 'json';

// Local JSON DB Engine
export const jsonDb = {
  read: () => {
    try {
      if (!fs.existsSync(JSON_DB_PATH)) {
        return { users: [], applications: [], appointments: [], supportTickets: [], notifications: [] };
      }
      const data = fs.readFileSync(JSON_DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON DB', error);
      return { users: [], applications: [], appointments: [], supportTickets: [], notifications: [] };
    }
  },

  write: (data) => {
    try {
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Error writing to JSON DB', error);
      return false;
    }
  },

  getCollection: (name) => {
    const db = jsonDb.read();
    return db[name] || [];
  },

  saveCollection: (name, items) => {
    const db = jsonDb.read();
    db[name] = items;
    jsonDb.write(db);
  },

  find: (collectionName, query = {}) => {
    const items = jsonDb.getCollection(collectionName);
    return items.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  findOne: (collectionName, query = {}) => {
    const items = jsonDb.getCollection(collectionName);
    return items.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  insert: (collectionName, item) => {
    const items = jsonDb.getCollection(collectionName);
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item
    };
    items.push(newItem);
    jsonDb.saveCollection(collectionName, items);
    return newItem;
  },

  update: (collectionName, query = {}, updates = {}) => {
    const items = jsonDb.getCollection(collectionName);
    let updatedCount = 0;
    const updatedItems = items.map(item => {
      let matches = true;
      for (const key in query) {
        if (item[key] !== query[key]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        updatedCount++;
        return {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    if (updatedCount > 0) {
      jsonDb.saveCollection(collectionName, updatedItems);
    }
    return updatedCount;
  },

  delete: (collectionName, query = {}) => {
    const items = jsonDb.getCollection(collectionName);
    const initialLen = items.length;
    const remaining = items.filter(item => {
      for (const key in query) {
        if (item[key] === query[key]) return false;
      }
      return true;
    });
    if (remaining.length !== initialLen) {
      jsonDb.saveCollection(collectionName, remaining);
    }
    return initialLen - remaining.length;
  }
};
