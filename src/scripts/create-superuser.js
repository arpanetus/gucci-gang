import {createSession, createUserFunc} from 'db/tools';
import driver from 'db/driver';
import dotenv from 'dotenv';
import inquirer from 'inquirer';

dotenv.config();

let passStorage = [];

const getSuperUserCredentials = () => {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter superuser username:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please, enter superuser username!';
        }
      }
    },
    {
      name: 'email',
      type: 'input',
      message: 'Enter superuser email:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please, enter superuser email!';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter superuser password:',
      validate: function (value) {
        passStorage = [value];
        if (value.length) {
          return true;
        } else {
          return 'Please enter superuser password.';
        }
      }
    },
    {
      name: 'confirm-password',
      type: 'password',
      message: 'Confirm superuser password:',
      validate: function (value) {
        if (value.length && passStorage[0]===value) {
          return true;
        } else {
          return 'Please confirm superuser password.';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

(async ()=> {
  const {username, email, password} = await getSuperUserCredentials();
  const session = createSession(driver);
  const superUser = await (createUserFunc(createSession(driver)))({
    username,
    email,
    password,
    "role": "superuser",
    name: "superuser"
  });
  await session.close();
  await driver.close();
  console.log(
    "SUPERUSER WITH USERNAME: ",
    superUser.username,
    "\nAND EMAIL: ",
    superUser.email,
    "\nWAS SUCCESSFULLY CREATED");
})();
