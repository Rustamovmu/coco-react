import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";
import { CartInterface } from "../../lib/types/cart";


export interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;
    cart: CartInterface;
}


export const GlobalContext = createContext<GlobalInterface | undefined>(undefined);

export const useGlobals = () => {
    const context = useContext(GlobalContext);

    if (context === undefined) {
        throw new Error("useGlobals must be used within ContextProvider");
    }

    return context;
}
