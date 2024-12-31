export interface EventTS {
  hello: {
    string: string;
    num: number;
  };
  helloCallback: {
    result: boolean;
  };
  saveAuthKey: {
    authKey: string;
  };
  getAuthKey: {};
  getAuthKeyCallback: {
    authKey: string;
  };
  extract: {};
  extractCallback: {
    result: Extract[];
  };
}
