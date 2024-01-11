import { ACTION_TYPE } from "./actions";
import { UI_STATE_INTERFACE } from "./provider";

const uiReducer = (state: UI_STATE_INTERFACE, action: ACTION_TYPE): UI_STATE_INTERFACE => {
  switch (action.type) {
    case 'Change Theme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    default:
      return state;
  }
};

export default uiReducer
