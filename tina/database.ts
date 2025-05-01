import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { MongodbLevel } from "mongodb-level";
import { GitHubProvider } from "tinacms-gitprovider-github";
import dotenv from "dotenv";

dotenv.config();

function varsubst(s?: string) {
  // const myVariable = "world";
  // const myString = "Hello, ${myVariable}!";
  const replacedString = s?.replace(/\${([^}]+)}/g, (_, variableName) => {
    // return eval(variableName);
    // console.log("The variableName is: " + variableName);
    return process.env[variableName] ? process.env[variableName] : "";
  });

  // console.log("The replaced string is: " + replacedString); // Output: Hello, world!
  // return s.replace(/\$\{(.*?)\}/g, function (m, p) {
  //   return process.env[p];
  // });
  return replacedString;
}

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const dbName = process.env.MONGO_INITDB_DATABASE as string;

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      }),
      databaseAdapter: new MongodbLevel<string, Record<string, unknown>>({
        collectionName: branch,
        dbName,
        mongoUri: varsubst(process.env.MONGODB_URI) as string,
      }),
    });
