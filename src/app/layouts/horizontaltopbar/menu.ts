import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 2,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 1
            },
           
        ]
    },
   
    {
        id: 26,
        label: 'MENUITEMS.APPS.TEXT',
        icon: 'bx-customize',
        subItems: [
         

            {
                id: 9,
                label: 'MENUITEMS.CALENDAR.TEXT',
                icon: 'bx-calendar',
                link: '/calendar',
            },
            {
                id: 30,
                label: 'MENUITEMS.EMAIL.TEXT',
                subItems: [
                    {
                        id: 31,
                        label: 'MENUITEMS.EMAIL.LIST.INBOX',
                        link: '/email/inbox',
                        parentId: 30
                    },
                    {
                        id: 32,
                        label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                        link: '/email/read',
                        parentId: 30
                    },
                    {
                        id: 33,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT',
                        parentId: 30,
                        subItems: [
                            {
                                id:34 ,
                                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC',
                                link: '/email/basic',
                                parentId:33 
                            },
                            {
                                id:35 ,
                                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT',
                                link: '/email/alert',
                                parentId:33 
                            },
                            {
                                id:36 ,
                                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING',
                                link: '/email/billing',
                                parentId:33 
                            }
                        ]
                    }
                ]
            },
            {
                id: 37,
                label: 'TIMESHEET',
                subItems: [
                    {
                        id: 38,
                        label: 'AddTimesheet',
                        link: '/timesheet/add',
                        parentId: 37
                    },
                    {
                        id: 39,
                        label: 'Overview',
                        link: '/timesheet/employees',
                        parentId: 37
                    },
                 
                   
                ]
            },
            
            {
                id: 94,
                label: 'MENUITEMS.MAPS.TEXT',
                subItems: [
                    {
                        id: 95,
                        label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                        link: '/maps/google',
                        parentId: 94
                    }
                ]
            }
        ]
    },
]