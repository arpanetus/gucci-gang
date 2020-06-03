import {ValidationError} from 'apollo-server-errors';
import {getUserFunc} from '../db/tools';

export const isUsernameEmpty = (args) => {
  if (args.username == undefined && !(args.username.trim()))
    throw new ValidationError("Username is empty")
}

export const isPasswordEmpty = (args) => {
  if (args.password == undefined && !(args.password.trim()))
    throw new ValidationError("Password is empty")
}

export const doesUsernameAlreadyExist = async (args, session) => {
  const user = await (getUserFunc(session))({username: args.username});
  if(user!=undefined && !!(user.username.trim()))
    throw new ValidationError("Username already exists")
}

const isEquivalent = (a, b) => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
     if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

export const isUserNullOrDoesntExist = async (user, session) => {
  if(user==undefined && !(user.username.trim()))
    throw new ValidationError("User hasn't been created")
  const gotUser = await (getUserFunc(session))({username: user.username});
  if(!isEquivalent(user, gotUser))
    throw new ValidationError("User hasn't been created")
}
