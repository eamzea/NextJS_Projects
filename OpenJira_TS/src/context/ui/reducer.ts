import { UI_STATE_INTERFACE } from './';

export type SideBarAction = 'Open Sidebar' | 'Close Sidebar' | 'Change Theme' | 'Toggle Dragging';

export type ACTION_TYPE = { type: SideBarAction };

export const Reducer = (state: UI_STATE_INTERFACE, action: ACTION_TYPE): UI_STATE_INTERFACE => {
  switch (action.type) {
    case 'Open Sidebar':
      return {
        ...state,
        isSidebarOpen: true,
      };
    case 'Close Sidebar':
      return {
        ...state,
        isSidebarOpen: false,
      };
    case 'Change Theme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    case 'Toggle Dragging':
      return {
        ...state,
        isDragging: !state.isDragging,
      };
    default:
      return state;
  }
};
