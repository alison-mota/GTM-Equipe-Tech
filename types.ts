
export enum Screen {
  LANDING = 'LANDING',
  OBJECTIVE = 'OBJECTIVE',
  FOUNDER = 'FOUNDER',
  SPRINT = 'SPRINT',
  STEPS = 'STEPS',
  ICP = 'ICP',
  ICP_DEFINITION = 'ICP_DEFINITION',
  MARKET_FUNNEL = 'MARKET_FUNNEL',
  PROPOSAL_LINK = 'PROPOSAL_LINK',
  PROPOSAL_DETAILS = 'PROPOSAL_DETAILS',
  CONTACT = 'CONTACT',
  AGENT = 'AGENT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY';
  specialty: string;
  imageUrl: string;
}