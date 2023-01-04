
export interface ShowResult {
  listmails: Array<Array<Mail>>;

}

export interface Mail {
  id: string;
  match: boolean; // : true,
  excluded: boolean; // ": false,
  filename: string[]; // ": ["/home/barais/mail/INBOX/cur/1551726142_3.12560.kevtop2,U=4156215,FMD5=7e33429f656f1e6e9d79b29c3f82c57e:2,S"],
  timestamp: number; // ": 1541772202,
  date_relative: string; // ": "November 09",
  tags: string[];  // ": ["inbox"],
  headers: Header;
  body: Body[];
  attachments: any[];
  inlines: any[];
  content: string;

}
export interface Header {
  Subject: string;
  From: string;
  To: string;
  Cc: string;
  Bcc: string;
  ReplyTo: string;
  InReplyTo: string;
  References: string;
  Date: string;
}
export interface Body {

  id: number;
  contentType: string;
  contentCharset: string;
  content: string;
  contentTransferEncoding: string;
  contentLength: number;
}


export interface Thread {

  thread: string;
  timestamp: number;
  date_relative: string;
  matched: number;
  total: number;
  authors: string;
  subject: string;
  query: string[];
  tags: string[];
  selected: boolean;
}
export interface TreeNode {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}


export interface MailVM {
  subject?: string;
  from?: string;
  to?: string;
  cc?: string;
  defaultto?: string
  bcc?: string;
  inReplyTo?: string;
  references?: string;
  body?: string;
  text?: string;
  attachments?: Array<AttachmentForward> | Array<AttachmentICSForward>
}

export interface AttachmentForward {

  messageid: string;
  partid?: string;
  name: string;
  size: number;
  ct?: string;
}
export interface AttachmentICSForward {

  messageid: string;
  icstitre?: string;
  icsdate?: Date;
  icstime?: Date;
  icsduraction?: number;
  icsallday?: boolean;
  name: string;
  size: number;
  ct?: string;
}

export interface FileDTO {
  name : string;
}
export interface FileContentDTO {
  content : string;
}

export interface NotMuchConfig {
  smtpaccounts?:       Smtpaccount[];
  defaultquery?:       string;
  shortcutqueries?:    Shortcutquery[];
  shortcutmailtyping?: Shortcutmailtyping[];
  colortags?:          Colortag[];
}

export interface Colortag {
  tags:  string;
  color: string;
}

export interface Shortcutmailtyping {
  shortcut: string;
  formula:  string;
}

export interface Shortcutquery {
  shortcut: string;
  query:    string;
}

export interface Smtpaccount {
  name: string;
  from: string;
}
