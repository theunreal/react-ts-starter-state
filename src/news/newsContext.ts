import initialState, { IState } from "./store/initialState";
import { TAction } from "./store/actions";
import { createContext, Dispatch } from "react";

interface IContextProps {
    state: IState,
    dispatch: Dispatch<TAction>;
}

/**
 * When react renders a component that subscribers to this Context object,
 * it will read the current context value from the `Provider` above in the tree
 * USAGE: Whenever you want to pass data through the component tree without having to pass props down manually at every level
 */
const Context = createContext<IContextProps>({
    dispatch: () => {
        // Dispatch initial value
    },
    state: initialState
});

export default Context;
