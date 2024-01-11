export type SideBarAction = 'Change Theme';

export type ACTION_TYPE = { type: SideBarAction };

export const changeTheme = (): ACTION_TYPE => ({type: 'Change Theme'})
