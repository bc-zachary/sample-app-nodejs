import { createContext, useContext, useState } from 'react';
import { ContextValues } from '../types';

const SessionContext = createContext<Partial<ContextValues>>({});

const SessionProvider = ({ children }) => {
    const [context, setContext] = useState('');
    const [ isUpgrade, setIsUpgrade ] = useState(false);
    const value = { context, setContext, isUpgrade, setIsUpgrade };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
