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
  extract: {
    source_lang: string;
    target_lang: string;
  };
  extractCallback: {
    result: Extract[];
  };
}
