import { container } from 'tsyringe';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JWTTokenProvider from './TokenProvider/implementations/JWTTokenProvider';

import IHashProvider from '../../../../shared/container/HashProvider/model/IHashProvider';
import BcryptHashProvider from '../../../../shared/container/HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
