declare module 'jsonwebtoken';
import express from 'express';

import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user: {
            id: number;       // Use the correct type for your user ID
            isAdmin: boolean; // Adjust according to your implementation
        };
    }
}


declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>;
    }
  }
}

