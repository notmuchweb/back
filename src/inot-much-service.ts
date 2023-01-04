import { Mail, TreeNode, Thread, MailVM, AttachmentForward, AttachmentICSForward, NotMuchConfig } from './model';



export interface INotMuchService{
  getFroms(): string[] ; //done
  getMailFolder(): TreeNode[] ; //done
  getMailAddress(query: string): string[];
  getThread(query: string, offset: number, rows: number,includeSpamThread:boolean) : Thread[] ;
  addTag(threadIds: string[], tag: string): void;
  removeTag(threadIds: string[], tag: string): void;
  delete(threadIds: string[]) : void;
  spam(threadIds: string[]): void;
  archive(threadIds: string[]): void;
  getTags(includeSpamThread:boolean): string[] ;
  countAllThread(query: string): number ;
  getMails(query: string, allThread:boolean): Mail[] ;
  sendMail(sender: string, to: string, cc: string, bcc: string, subject: string, html: string, files: Map<string, string | ArrayBuffer | AttachmentForward | AttachmentICSForward>, isDraft: boolean, mailreference: string, mailinReplyTo: string): boolean ;
  reply(messageid: string):MailVM ;
  forward(messageid: string):MailVM ;
  createICSMessage(messageid: string, icstitre: string, icsdate: Date, icstime: Date, icsduraction: number, icsallday: boolean): MailVM;
  editAsNew(messageid: string): MailVM | null;
  replyAll(messageid: string): MailVM ;
  download(messageid: string, partid:number): string ;
  getConfig():NotMuchConfig;
  

  
}

export default INotMuchService;
