import path from 'path';
import { promises as fs } from 'fs';

const dbPath = 'db';

/* ****** Read from file ***** */
async function getJSONfromFile(filename) {
  const filePath = path.join(dbPath, filename);
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
}

/* ****** Write to file ***** */
async function writeJSONToFile(filename, data) {
  const filePath = path.join(dbPath, filename);
  const jsonData = JSON.stringify(data);
  await fs.writeFile(filePath, jsonData, { flag: 'w' });
}

export async function checkNotExistEmail(regisEmail) {
  const listUser = await getJSONfromFile('user.json');
  const user = listUser.find(
    (item) => item.email === regisEmail || item.rootEmail === regisEmail,
  );
  return user === undefined;
}

export async function checkExistNickname(nickname) {
  const listUser = await getJSONfromFile('user.json');
  const user = listUser.find((item) => item.nickname === nickname);
  return user === undefined;
}

export function getUsers() {
  return getJSONfromFile('user.json');
}

/* ****** Add new user ***** */
export async function addUser(newUserData) {
  const users = await getUsers();

  // get the max id from the existing ids
  const ids = Object.values(users).map((u) => u.id);
  const maxId = ids.reduce((tempMaxId, itemId) => {
    return itemId > tempMaxId ? itemId : tempMaxId;
  }, 0);

  // the new user will have an id of the max id plus 1
  const newUserId = maxId + 1;

  const newUser = { ...newUserData, id: newUserId };
  await writeJSONToFile('user.json', [...users, newUser]);
  return newUser;
}
