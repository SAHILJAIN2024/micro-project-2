export interface Request {
    id: number;
    userAddress: string;
    description: string;
    fileName: string;
  }
  
  export const mockRequests: Request[] = [
    {
      id: 1,
      userAddress: "0x123...abc",
      description: "Request to mint CRX for reforestation project",
      fileName: "reforestation_proposal.pdf",
    },
    {
      id: 2,
      userAddress: "0x456...def",
      description: "Carbon offset verification request",
      fileName: "verification_report.pdf",
    },
  ];
  