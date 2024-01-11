import { ACTION_TYPE } from "./reducer";

export const openSidebar = (): ACTION_TYPE => ({type: 'Open Sidebar'})
export const closeSidebar = (): ACTION_TYPE => ({type: 'Close Sidebar'})
export const changeTheme = (): ACTION_TYPE => ({type: 'Change Theme'})
export const toggleDragging = (): ACTION_TYPE => ({type: 'Toggle Dragging'})
