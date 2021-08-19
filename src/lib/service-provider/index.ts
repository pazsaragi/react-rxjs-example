export class ServiceProvider {
  private di: Map<string, any>;

  constructor() {
    this.di = new Map();
  }

  set(key: string, factory: any) {
    this.di.set(key, factory);
  }

  get(key: string) {
    const factory = this.di.get(key);
    if (factory) {
      return factory();
    }

    throw new Error(`[Service Provider] No such factory for key: (${key})`);
  }
}
