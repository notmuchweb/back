import { FastifyPluginAsync } from "fastify"
// import { Logger } from "tslog";
import { Thread, TreeNode, Mail, AttachmentForward, AttachmentICSForward, MailVM, NotMuchConfig } from '../../model';
import { NotMuchService } from "../../not-much.service";

interface IQuerystring {
  query: string;
}

interface IIDstring {
  id: string;
}

interface PJIDstring {
  messageid: string;
  partid: number;
}

interface Replystring {
  content: string;
}

interface GetMailDTO {
  query: string;
  allThread: boolean;
}

interface IQueryThread {
  query: string;
  offset: number;
  rows: number;
  includeSpamThread: boolean;
}

interface IncludeSpamDTO {
  includeSpamThread: boolean;
}


interface AddTagDTO {
  threadIds: string[];
  tag: string;
}

interface ThreadIdsDTO {
  threadIds: string[];
}

interface SendMailDTO {
  sender: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  html: string;
  files: string;
  isDraft: boolean;
  mailreference: string;
  mailinReplyTo: string;
}

interface ICSMessageDTO {
  messageid: string;
  icstitre: string;
  icsdate: Date;
  icstime: Date;
  icsduraction: number;
  icsallday: boolean;
}
// const log: Logger<GetMailDTO> = new Logger();

const api: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const api1 = new NotMuchService();

  fastify.get<{
    Reply: TreeNode[]
  }>('/getMailFolder', async (request, reply) => {
    reply.send(api1.getMailFolder())
  });
  fastify.get<{
    Reply: string[]
  }>('/getFroms', async (request, reply) => {
    reply.send(api1.getFroms())
  });
  //   getMailAddress(query: string): string[];
  
  
  fastify.get<{
    Querystring: IQuerystring,
    Reply: string[]
  }>('/getMailAddress', async (request, reply) => {
    const { query } = request.query;
    reply.send(api1.getMailAddress(query))
  });

  //  getThread(query: string, offset: number, rows: number,includeSpamThread:boolean) : Thread[] ;
  fastify.get<{
    Querystring: IQueryThread,
    Reply: Thread[]
  }>('/getThread', async (request, reply) => {
    const { query, offset, rows, includeSpamThread } = request.query;
    reply.send(api1.getThread(query, offset, rows, includeSpamThread))
  });

  //   addTag(threadIds: string[], tag: string): void;
  fastify.post<{
    Body: AddTagDTO,
  }>('/addTag', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.addTag(dto.threadIds, dto.tag))
  });

  // removeTag(threadIds: string[], tag: string): void;
  fastify.post<{
    Body: AddTagDTO,
  }>('/removeTag', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.removeTag(dto.threadIds, dto.tag))
  });

  // delete(threadIds: string[]) : void;
  fastify.delete<{
    Body: ThreadIdsDTO,
  }>('/delete', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.delete(dto.threadIds))
  });

  // spam(threadIds: string[]): void;
  fastify.put<{
    Body: ThreadIdsDTO,
  }>('/spam', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.spam(dto.threadIds))
  });

  //  archive(threadIds: string[]): void;
  fastify.put<{
    Body: ThreadIdsDTO,
  }>('/archive', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.archive(dto.threadIds))
  });

  //   getTags(includeSpamThread:boolean): string[] ;
  fastify.get<{
    Querystring: IncludeSpamDTO,
    Reply: string[]
  }>('/getTags', async (request, reply) => {
    const { includeSpamThread } = request.query;
    reply.send(api1.getTags(includeSpamThread))
  });

  //   countAllThread(query: string): number ;
  fastify.post<{
    Body: IQuerystring,
    Reply: number
  }>('/countAllThread', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.countAllThread(dto.query))
  });

  //     getMails(query: string, allThread:boolean): Mail[] ;
  fastify.post<{
    Body: GetMailDTO,
    Reply: Mail[]
  }>('/getMails', async (request, reply) => {
    const dto = request.body;
    reply.send(api1.getMails(dto.query, dto.allThread));
  });

  //   sendMail(sender: string, to: string, cc: string, bcc: string, subject: string, html: string, files: Map<any, any>, isDraft: boolean, mailreference: string, mailinReplyTo: string): boolean ;
  fastify.post<{
    Body: SendMailDTO,
    Reply: boolean
  }>('/sendMail', async (request, reply) => {
    const dto = request.body;
    const files: Map<string, string | ArrayBuffer | AttachmentForward | AttachmentICSForward> = new Map(JSON.parse(dto.files))
    reply.send(
      api1.sendMail(dto.sender, dto.to, dto.cc, dto.bcc,
        dto.subject, dto.html, files, dto.isDraft, dto.mailreference, dto.mailinReplyTo)
    );
  });


  //   reply(messageid: string):MailVM ;
  fastify.get<{
    Querystring: IIDstring,
    Reply: MailVM
  }>('/reply', async (request, reply) => {
    const { id } = request.query;
    reply.send(
      api1.reply(id)
    );
  });

  //     forward(messageid: string):MailVM ;
  fastify.get<{
    Querystring: IIDstring,
    Reply: MailVM
  }>('/forward', async (request, reply) => {
    const { id } = request.query;
    reply.send(
      api1.forward(id)
    );
  });

  //     editAsNew(messageid: string):MailVM ;
  fastify.get<{
    Querystring: IIDstring,
    Reply: MailVM | null
  }>('/editAsNew', async (request, reply) => {
    const { id } = request.query;
    reply.send(
      api1.editAsNew(id)
    );
  });

  //     replyAll(messageid: string):MailVM ;
  fastify.get<{
    Querystring: IIDstring,
    Reply: MailVM
  }>('/replyAll', async (request, reply) => {
    const { id } = request.query;
    reply.send(
      api1.replyAll(id)
    );
  });

  //   createICSMessage(messageid: string, icstitre: string, icsdate: Date, icstime: Date, icsduraction: number, icsallday: boolean): MailVM;

  fastify.post<{
    Body: ICSMessageDTO,
    Reply: MailVM
  }>('/createICSMessage', async (request, reply) => {
    const dto = request.body;
    reply.send(
      api1.createICSMessage(dto.messageid, dto.icstitre, dto.icsdate, dto.icstime, dto.icsduraction, dto.icsallday)
    );
  });

  fastify.get<{
    Querystring: PJIDstring,
    Reply: Replystring
  }>('/download', async (request, reply) => {
    const { messageid, partid } = request.query;
    const s = api1.download(messageid, partid);

    reply.send({
      content: s
    }
      
    );
  });

  fastify.get<{
    Reply: NotMuchConfig
  }>('/getConfig', async (request, reply) => {
    reply.send(api1.getConfig());
  });

  fastify.get<{
    Reply: string[]
  }>('/getDirectories', async (request, reply) => {
    reply.send(api1.getDirectories());
  });

  

  fastify.get('/', async function (request, reply) {
    return ''
  })
}

export default api;
