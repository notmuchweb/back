
import * as fs from 'fs';
import RTM from 'rtm-api'

export class RtmService {
  rtmclient: any ;
  rtmusername: string | undefined;
  rtmfullname: string | undefined;
  enable: boolean | undefined;
  rtmfrob= {};
  path: string | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
  token: any ;
  validtoken = false;
  constructor() {

  }


  getValidToken(): boolean {
    return this.validtoken;
  }

  init() {

    this.rtmclient = new RTM(this.API_KEY, this.API_SECRET, RTM.PERM_WRITE); // An instance of RTMClient

    this.path = this.getConfigPath();
    this.parseRTMConfigFile(this.path);

  }
  getConfigPath() :string {
    const CONFIG = process.env.CONFIG || "./rtmconfig.json";
   
      return CONFIG
  }

  parseRTMConfigFile(filePath: string) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
      this.token =  JSON.parse('' + fs.readFileSync(filePath));
      this.isAuthentified().then(b => {
        this.validtoken = b;
      }).catch(e => {
        this.validtoken = false;
      });
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      this.token =  {};
    }
  }
  saveRTMConfigFile(filePath: string) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
      fs.writeFileSync(filePath, this.rtmclient.user.exportToString(this.token));
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      this.token =  {};
      }
  }



  enableRTM(): boolean {
    return this.enable!;
  }

  setEnableRTM(b: boolean)  {
    this.enable = b;
  }

  setAPI_KEY(b: string) {
     this.API_KEY = b;
  }
  setAPI_SECRET(b: string) {
    this.API_SECRET = b;
 }

  isAuthentified(): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      let token = '';
      if (this.token.authToken != null) {
        token = this.token.authToken;
      }
      this.rtmclient.auth.verifyAuthToken(token, (err: any, verified: boolean ) => {
        if (err) {
          reject(false);
        }
        this.validtoken = verified;
        resolve(verified);
      });
//        resolve(true);
    });
    return p;
  }


  getURLApi(): Promise<string> {
  //  console.log('ok');

    const p = new Promise<string>((resolve, reject) => {
      this.isAuthentified().then(verified => {
        if (!verified) {
          this.rtmclient.auth.getAuthUrl((err: { toString: () => any; }, authUrl: string | PromiseLike<string>, frob: {}) => {
            if (err) {
              reject(err.toString());
            } else {
              this.rtmfrob = frob;
              resolve(authUrl);
            }
          });
        }
      }).catch(e => {
        console.log(e.toString());
        resolve(e.toString());
      });
    });
    return p;
  }

  getAndSaveAuthToken(): Promise<void> {
    const p = new Promise<void>((resolve, reject) => {

      this.rtmclient.auth.getAuthToken(this.rtmfrob, (err: { toString: () => any; }, user: any) => {
        if (err) {
          console.error(err.toString());
          reject();
        } else {

          // If successful, the returned user will include the property `authToken`
          this.token = user;

          this.rtmclient.user.import(this.token);
          const path1 = this.getConfigPath();
          this.saveRTMConfigFile(path1);
          this.validtoken = true;
          // Save the user for making authenticated API calls via user.get()
          resolve();
        }
      });
    });
    return p;
  }


  addTask(topic: string, d: Date, id: string): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      this.rtmclient.auth.verifyAuthToken(this.token.authToken, (err: any, verified: any) => {
        if (err) {
          this.validtoken = false;
          resolve(false);
          return;
        }
        if (verified) {
          const user = this.rtmclient.user.import(this.token);
          const dates = '' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
          user.tasks.add(topic, {
            due: dates,
            note: id
            // tslint:disable-next-line:no-shadowed-variable
          }, (err: any) => {
            if (err) {
              resolve(false);
              console.log(err);
            } else {
              resolve(true);
            }
          });
        } else {
          this.validtoken = false;
          resolve(false);
        }

      });
    });
    return p;
  }

 


}
