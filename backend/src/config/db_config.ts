
import { config } from 'dotenv';
import { ENVIRONMENT, LOCAL_PORT, PROD_PORT, LOCAL_DB_URL } from '../../env_config';
config();

const env = ENVIRONMENT
let server_port = LOCAL_PORT
const local_db_url = LOCAL_DB_URL
if (env == 'PROD') { server_port = PROD_PORT }
const db_config = {
  PORT: server_port,
  URI: `${local_db_url}`
}



export default db_config