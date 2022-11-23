import { readFileSync } from 'fs'
import { resolve } from 'path'

import { SomeType } from './someType'

const getKeys = <T extends Record<string, unknown>>(interfacePath: string): Array<keyof T> => {
  const rawInterface = readFileSync(interfacePath, 'utf-8')
  const fakeObj = rawInterface.split(' ').splice(4).join(' ').replace('string', `'s'`).replace('number', '1')
  return Object.keys(eval('(function(){return ' + fakeObj + '}())'))
} 

console.log(getKeys<SomeType>(resolve(__dirname, '..', 'src', 'someType.ts')))