export interface Interaction {
  isCommand: () => any;
  commandName: string;
  member: {
    displayName: string;
    id: string;
    roles: {
      cache: any;
    };
  };
  options: {
    getNumber: (arg0: string) => any;
    getChannel: (arg0: string) => any;
    getUser: (arg0: string) => any;
    getString: (arg0: string) => any;
  };
  reply: (arg0: any) => any;
  client: {
    ws: {
      ping: number;
    };
  };
}

export interface Message {
  attachments: any;
  delete(): any;
  createdTimestamp: number;
  author: any;
  embeds: any;
  editedAt: any;
  member: {
    id: string;
    displayName: string;
  };
  createdAt: number;
  channel: any;
  content: any;
}

export interface Channel {
  send: (arg0: string) => any;
}

export interface Client {
  channels: {
    fetch: (arg0: string) => Promise<Channel>;
  };
}
