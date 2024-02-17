import { MongoClient } from 'mongodb';

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
}

const dbClient = new DBClient();
module.exports = dbClient;
