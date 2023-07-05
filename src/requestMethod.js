import axios from "axios";

const TOKEN = "$2a$10$L8oXEdB.eOZuX9Cz653K6usRmcQiXit9nXi3dCtGU/z3wsfoVUdMC";
export const userRequest = axios.create({
  header: { token: `Bearer ${TOKEN}` },
});
