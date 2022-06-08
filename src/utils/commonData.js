// const apiUrl = 'http://192.168.1.4:23000/api';
// const apiUrl = '/api';
// const apiUrl = '/api';
// const apiUrl = 'http://docampaign.online:23000/api';
const apiUrl = 'http://localhost:23000/api';

const webopt = 'https://developer.globelabs.com.ph/dialog/oauth/kA8aH5keEgCMLTKkRbieqkCGeAroH5KL'
// const webopt = 'http://localhost:42000/app/home/9774461641'
const addition = 19230;

const civilStatus = [
    { label: "",
    value: ""},
    { label: "Single",
    value: "single"},
    { label: "Married", value: "married"},
    { label: "Widowed",
    value: "widowed"},
    { label: "Separated", value: "separated"},
    { label: "Divorced",
    value: "divorced"}
];

const gender = [
    { label: "",
    value: ""},
  { label: "Male",
    value: "male"},
    { label: "Female", value: "female"}
]

const appBarTitle = [
  {
    id: 'Dashboard',
    path: 'dashboard',
    // icon: <PeopleIcon />,
    isActive: true,
  },
  { 
    id: 'Master List',
    path: 'master-list',
    // icon: <DnsRoundedIcon /> ,
    isActive: false,
  },
  {
    id: 'User Management',
    path: 'user-management',
    // icon: <PeopleIcon />,
    isActive: false,
  },
  {
    id: 'Bulk Sms',
    path: 'bulk-sms',
    // icon: <PeopleIcon />,
    isActive: false,
  },
//   { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
  { 
    id: 'Map Area', 
    path: 'map-area',
    // icon: <PublicIcon />,
    isActive: false,
  },
  { 
    id: 'Settings',
    path: 'settings',
    // icon: <SettingsIcon />,
    isActive: false
  }
]

const roles = [
  { title: "Regional Leader" , value: "region"},
  { title: "Provincial Leader" , value: "province"},
  { title: "City/Municipality Leader" , value: "citymun"},
  { title: "Barangay Leader" , value: "barangay"},
]

const postView = [
  { title: "Normal" , value: "normal"},
  { title: "Featured" , value: "featured"},
  { title: "Archive" , value: "archive"}
]

const postType = [
  { title: "Public" , value: "public"},
  // { title: "Internal" , value: "internal"},
  { title: "Only Me" , value: "me"},
  
]


const postLevel = [
  { title: "Regional" , value: "region"},
  { title: "Provincial" , value: "province"},
  { title: "Municipality" , value: "citymun"},
  { title: "Barangay" , value: "barangay"}
]

const uiData = {
  about: "Solid BBM supporters platform, this platform is mainly used in delivering relevant informations and activities, as well as managing supporters and leaders from different Regions, Provinces, City or Municipalities and Barangay's throughout the Philippines."
}

export default {
    civilStatus,
    gender,
    appBarTitle,
    apiUrl,
    roles,
    postType,
    postView,
    postLevel, 
    webopt,
    uiData, 
    addition
  };  