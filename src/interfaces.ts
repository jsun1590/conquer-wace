export interface Interaction {
  isCommand: () => any;
  commandName: any;
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
  };
  reply: (arg0: any) => any;
  client: {
    ws: {
      ping: number;
    };
  };
}
