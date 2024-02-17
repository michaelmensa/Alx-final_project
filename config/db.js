import { MongoClient } from 'mongodb';
import utils from '../utils/utils';

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'clinic_base';

    const url = `mongodb://${dbHost}:${dbPort}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = dbName;

    // connect to db when DBClient instance is created
    (async () => {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    })();
  }

  // isAlive() to check if MongoClient is connected
  isAlive() {
    return this.client.topology.isConnected();
  }

  // async nbClinics() to return number of clinics
  async nbClinics() {
    const count = await this.db.collection('clinics').countDocuments();
    return count;
  }

  // async nbEmployees() to return number of employees
  async nbEmployees() {
    const count = this.db.collection('employees').countDocuments();
    return count;
  }

  // async nbPatients to return number of patients
  async nbPatients() {
    const count = this.db.collection('patients').countDocuments();
    return count;
  }

  // async findClinic(key) checks if clinic in db
  async findClinic(email) {
    const clinic = await this.db.collection('clinics').findOne({ email });
    return clinic || null;
  }

  // async createClinic(name, email, password) creates new clinic
  async createClinic(name, email, password) {
    const hashedPassword = utils.hashPassword(password);
    await this.db.collection('clinics').insertOne({ name, email, password: hashedPassword });
  }

  // async deleteAllFiles() to delete all files
  async deleteAllClinics() {
    await this.db.collection('clinics').deleteMany({});
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
