import { container } from 'tsyringe';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JWTTokenProvider from './TokenProvider/implementations/JWTTokenProvider';

import IHashProvider from './HashProvider/model/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
