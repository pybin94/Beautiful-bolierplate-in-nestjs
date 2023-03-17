import { Module } from '@nestjs/common';
import { Crypto } from './crypto.helper';

@Module({
  providers: [Crypto],
  exports: [Crypto],
})

export class MyModule {}