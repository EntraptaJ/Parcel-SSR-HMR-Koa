// API/src/API/HelloWorld/index.ts
import { Resolver, Query } from 'type-graphql';

export default class HelloWorldResolver {
  @Query()
  public helloWorld(): string {
    return 'Hello World'

  }
}