/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";

import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import TheatersIcon from '@material-ui/icons/Theaters';
import VideosList from 'views/VideosList/VideosList'
import MovieIcon from '@material-ui/icons/Movie';
//article component 
import RedactionArticle from 'views/Article/RedactionArticle'
import ArticleValidation from 'views/Article/ArticleValidation'
import DashboardRedacteur from 'views/Dashboard/DashboardRedacteur'
import DashboardAgent from 'views/Dashboard/DashboardAgent'
import AgentForm from 'components/AgentForm/AgentForm'
import CreateIcon from '@material-ui/icons/Create';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import supsectCasesValidation from 'views/SuspectCases/supsectCasesValidation'
import supsectCasesNoValidated from 'views/SuspectCases/supsectCasesNoValidated'

import videosValidation from 'views/videosValidation/videosValidation'
import userCommentsValidation from 'views/userCommentsValidation/userCommentsValidation'
import videosNoValidated from 'views/videosValidation/videosNoValidated'
import userVideosValidation from 'views/userVideos/userVideosValidation'
import UsersList from 'views/UsersList/UsersList'
import GroupIcon from '@material-ui/icons/Group';
import SuspectedCasesVideosValidated from 'views/SuspectCases/SuspectedCasesVidoesValidated'
import SuspectedCasesVideosNoValidated from 'views/SuspectCases/SuspectedCasesVidoesNoValidated'

const dashboardRoutes = [
  /*{
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    user:"admin"
  },*/

  {
    path: "/articlevalidation",
    name: "Articles validation ",
    rtlName:" قبول المقالات ",
    icon: AssignmentTurnedInIcon,
    component: ArticleValidation,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/casesvalidation",
    name: "validated suspected cases",
    rtlName:" قبول الحالات المطروحة ",
    icon: AddLocationIcon,
    component: supsectCasesValidation,
    layout: "/admin",
    user:"admin"

  },

  {
    path: "/casesnonvalide",
    name: "not validated suspected cases ",
    rtlName:" قبول الحالات المطروحة ",
    icon: AddLocationIcon,
    component: supsectCasesNoValidated,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/casesvideosvalidated",
    name: "validated suspected cases videos",
    rtlName:" قبول فيديوهات الحالات المطروحة ",
    icon: MovieIcon,
    component: SuspectedCasesVideosValidated,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/casesvideosnovalidated",
    name: "no validated suspected cases videos",
    rtlName:" قبول فيديوهات الحالات المطروحة ",
    icon: MovieIcon,
    component: SuspectedCasesVideosNoValidated,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/uservideos",
    name: "User added videos",
    rtlName:"فيديوهات المستخدمين ",
    icon: VideoLibraryIcon,
    component: userVideosValidation,
    layout: "/admin",
    user:"admin"

  },
 
  {
    path: "/videosvalide",
    name: "robots validated videos",
    rtlName:"  الفيديوهات المقبولة ",
    icon: TheatersIcon,
    component: videosValidation,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/videosnonvalide",
    name: "robots not validated videos ",
    rtlName:"  الفيديوهات الغير معالجة  ",
    icon: TheatersIcon,
    component: videosNoValidated,
    layout: "/admin",
    user:"admin"

  },
  {
    path: "/users",
    name: "Users List ",
    rtlName:"  الفيديوهات الغير معالجة  ",
    icon: GroupIcon,
    component: UsersList,
    layout: "/admin",
    user:"admin"

  },
  /*{
    path: "/dashboardagent",
    name: "Dashboard Agent",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardAgent,
    layout: "/agent",
    user:"agent"
  },*/
  {
    path: "/dataentry",
    name: "Information filling",
    rtlName: "إدخال المعلومات ",
    icon: Person,
    //need to be changed 
    component: AgentForm,
    layout: "/agent",
    user:"agent"
  },


  /*{
    path: "/dashboardredacteur",
    name: "Dashboard Redacteur",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardRedacteur,
    layout: "/redacteur",
    user:"redacteur",
    
  },
  */

  {
    path: "/writearticle",
    name: "Writing article ",
    rtlName: "كتابة المقال",
    icon: CreateIcon,
    component: RedactionArticle,
    layout: "/redacteur",
    user:"redacteur",
    
  },
  
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
