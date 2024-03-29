import axios from 'axios';
import { database as db } from './firebase'
import { set, ref, push, get } from 'firebase/database';
// const localGrades=false
// import grades from './grades.json'
import version from '../../../../version'
import { Capacitor } from '@capacitor/core';
const oauth2Options = {
  method: 'POST',
  url: 'https://oauth2.googleapis.com/token',
  headers: {
    accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded',
    // 'user-agent': 'PowerSchool/1 CFNetwork/1485 Darwin/23.1.0',
    'accept-language': 'en-US,en;q=0.9',
  },
  data: {
    grant_type: 'refresh_token',
    // @ts-ignore
    refresh_token: '',
    client_id:
      '162669419438-v9j0hrtnbkifi68ncq6jcr3ngadp2o0o.apps.googleusercontent.com', // of the powerschool Mobile App
    scope:
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  },
};
const getGUIDOptions = {
  method: 'POST',
  url: 'https://mobile.powerschool.com/v3.0/graphql',
  headers: {
    accept: '*/*',
    authorization: '',
    profileuri: '',
    timestamp: '2023-11-21T23:57:38.313Z',
    'accept-language': 'en-US,en;q=0.9',
    // 'user-agent': 'PowerSchool/1 CFNetwork/1485 Darwin/23.1.0',
    serverurl: 'https://vcsnet.powerschool.com',
    'accept-all-ssl-certs': 'true',
  },
  data: {
    query: 'query AllStudentsGuids {\n  students {\n    guid\n  }\n}',
    variables: null,
  },
};
const getGradesOptions = {
  method: 'POST',
  url: 'https://mobile.powerschool.com/v3.0/graphql',
  headers: {
    'content-type': 'application/json',
    accept: '*/*',
    authorization: '',
    profileuri: '',
    'accept-language': 'en-US,en;q=0.9',
    serverurl: 'https://vcsnet.powerschool.com',
    'accept-all-ssl-certs': 'true',
  },
  data: {
    query:
      'query AllStudentDataV3($guid: ID!) {\n  student(guid: $guid) {\n    __typename\n    ...studentDataV3\n    sections {\n      __typename\n      ...sectionDataV3\n    }\n  }\n}fragment studentDataV3 on StudentType {\n  __typename\n  guid\n  firstName\n  middleName\n  lastName\n  gradeLevel\n  currentGPA\n  currentTerm\n  mealBalance\n  mealThreshold\n  feeBalance\n  feeThreshold\n  photoLastModified\n  guardianAccessDisabled\n  dob\n  currentSchoolGuid\n  schools {\n    __typename\n    ...schoolDataV3\n  }\n  emailAlerts {\n    __typename\n    ...emailAlertsDataV3\n  }\n  bulletins {\n    __typename\n    ...bulletinDataV3\n  }\n  customPage {\n    __typename\n    ...customPageDataV3\n  }\n}fragment schoolDataV3 on SchoolType {\n  __typename\n  guid\n  name\n  phone\n  fax\n  lowGrade\n  highGrade\n  email\n  streetAddress\n  city\n  state\n  zip\n  country\n  disabledGPA\n  disabledAssignments\n  disabledAttendance\n  disabledCitizenship\n  disabledEmailAlerts\n  disabledFees\n  disabledFinalGrades\n  disabledMeals\n  disabledPushAttendance\n  disabledPushGrade\n  disabledStandards\n  disabledSchool\n  disabledSchoolTitle\n  disabledSchoolMessage\n  disabledDistrict\n  disabledDistrictMessage\n  currentSchedulingTermGuid\n  schedulingTerms {\n    __typename\n    ...schedulingTermDataV3\n  }\n}fragment schedulingTermDataV3 on SchedulingTermType {\n  __typename\n  guid\n  abbreviation\n  title\n  startDate\n  endDate\n  parentTerm\n}fragment emailAlertsDataV3 on EmailAlertsOutputType {\n  __typename\n  guid\n  primaryEmail\n  gradeAndAtt\n  detailAssignments\n  detailAttendance\n  schoolAnnouncements\n  balanceAlerts\n  frequency\n  otherEmails\n}fragment bulletinDataV3 on BulletinType {\n  __typename\n  guid\n  title\n  schoolName\n  startDate\n  endDate\n  sort\n  body\n}fragment customPageDataV3 on CustomPageType {\n  __typename\n  formIcon\n  formTitle\n  redirectURL\n}fragment sectionDataV3 on SectionType {\n  __typename\n  guid\n  name\n  period\n  sort\n  teacherFirstName\n  teacherLastName\n  teacherEmail\n  terms {\n    __typename\n    ...termDataV3\n  }\n  attendanceMarks {\n    __typename\n    ...attendanceMarkDataV3\n  }\n  assignments {\n    __typename\n    ...assignmentDataV3\n  }\n  room\n  schedulingTermGuid\n}fragment termDataV3 on TermType {\n  __typename\n  guid\n  label\n  start\n  sort\n  end\n  citizenGrade\n  citizenDescription\n  sendingGrades\n  finalGrade {\n    __typename\n    ...finalGradeDataV3\n  }\n  standardGrades {\n    __typename\n    ...standardGradeDataV3\n  }\n}fragment finalGradeDataV3 on FinalGradeType {\n  __typename\n  grade\n  percent\n  inProgressStatus\n  teacherComment\n}fragment standardGradeDataV3 on StandardGradeType {\n  __typename\n  guid\n  title\n  grade\n  gradeAbbreviation\n  teacherComment\n}fragment attendanceMarkDataV3 on AttendanceMarkType {\n  __typename\n  guid\n  attendanceLabel\n  dateMarked\n  absentValue\n}fragment assignmentDataV3 on AssignmentType {\n  __typename\n  guid\n  title\n  category\n  description\n  dueDate\n  scoreLabel\n  pointsEarned\n  pointsPossible\n  teacherComment\n  attributeMissing\n  attributeLate\n  attributeCollected\n  attributeExempt\n  includedInFinalGrade\n  attributeIncomplete\n}',
    variables: { guid: '' },

  },
};


const getSchedOptions = {
  method: 'POST',
  url: 'https://mobile.powerschool.com/v3.0/graphql',
  headers: {
    'content-type': 'application/json',
    authorization: '',
    profileuri: '',
    serverurl: 'https://vcsnet.powerschool.com'
  },
  data: {
    query: 'query SectionMeetingsV3($sectionGuids: [ID]!, $start: DateTime!, $stop: DateTime!) {\n  sectionMeetings(sectionGuids: $sectionGuids, start: $start, stop: $stop) {\n    __typename\n    ...sectionMeetingDataV3\n  }\n}fragment sectionMeetingDataV3 on SectionMeetingType {\n  __typename\n  sectionGuid\n  start\n  stop\n}',
    variables: {
      sectionGuids: [

      ],
      start: '',
      stop: ''
    }
  }
};

async function getOauth(refreshkey: string) {
  const res = localStorage.getItem("oauth2response")
  const exp = localStorage.getItem("oauth2Expirey")
  if (res && exp && (Date.now() < parseInt(exp))) return JSON.parse(res)
  const modifiedOauth2Options = {
    ...oauth2Options,
    data: {
      ...oauth2Options.data,
      refresh_token: refreshkey,
    },
  };
  const oauth2response = await axios.request(modifiedOauth2Options); // get tokens so then we can send them to the powershcool api
  localStorage.setItem("oauth2response", JSON.stringify(oauth2response))
  localStorage.setItem("oauth2Expirey", String(new Date().getTime() + 348000))
  return oauth2response
}
async function scrape(refreshkey: string, setWeights: any, toast: any): Promise<any> {
  try {
    // console.log(refreshkey)
    const oauth2response = await getOauth(refreshkey)
    const modifiedBasicOptions = {
      ...getGUIDOptions,
      headers: {
        ...getGUIDOptions.headers,
        authorization: `Bearer ${oauth2response.data.access_token}`,
        profileuri: oauth2response.data.id_token,
      },
    };
    const guidResponse = await axios.request(modifiedBasicOptions);
    //console.log(guidResponse.data);
    if (guidResponse.data.data.students === null) {
      throw new Error('Powerschool seems to be down. Please try again later.');
    }
    const { guid } = guidResponse.data.data.students[0];

    const modifiedGetGradesOptions = {
      ...getGradesOptions,
      headers: {
        ...getGradesOptions.headers,
        authorization: `Bearer ${oauth2response.data.access_token}`,
        profileuri: oauth2response.data.id_token,
      },
      data: {
        ...getGradesOptions.data,
        variables: { guid },
      },
    };
    let gradesResponse = await axios.request(modifiedGetGradesOptions);
    if (gradesResponse.data.errors && gradesResponse.data.errors.length > 0) {
      // return grades;
      console.log(gradesResponse.data.errors[0].message)
      // try {
      //   const grades = await import('./grades.json')
      //   gradesResponse.data = grades
      // } catch (error) {
      if (gradesResponse.data.errors[0].message === "The school has disabled access to this student's data.")
        throw new Error("PowerSchool is closed over break. Please try again later.")
      else
        throw new Error(gradesResponse.data.errors[0].message)
      // }

    }
    // console.log(JSON.stringify(gradesResponse.data))
    const curdate = new Date()
    localStorage.setItem('dateUpdated', (curdate.toLocaleDateString() + " at" + curdate.toLocaleTimeString()))
    const studentName = gradesResponse.data.data.student.firstName + " " + gradesResponse.data.data.student.lastName
    //add to firebase under users
    const device = Capacitor.getPlatform()

    const curVisit = {
      date: (curdate.toLocaleDateString() + " at " + curdate.toLocaleTimeString()),
      device: device
    }
    const userRef = ref(db, 'users/' + studentName + '/visits/' + (Math.round(curdate.getTime() / 60000) * 60));
    set(userRef, curVisit);
    const wieghtRef = ref(db, 'weights/')
    const curweigths = JSON.parse(JSON.stringify(await get(wieghtRef)).replaceAll("|", "/"))
    localStorage.setItem('weights', JSON.stringify(curweigths))

    setWeights(curweigths)
    const versionref = ref(db, 'version/')
    const curVersion = await get(versionref)

    if (parseInt(curVersion.val().version) > version) {
      alert("PLEASE UPDATE THE APP! Some features might not work as expectaed if you dont")
      // toast({
      //   title: 'New Version!',
      //   description: "There's a new version of the app! Please update to the latest version for the best experience.",
      //   status: 'info',
      //   duration: null,
      //   isClosable: true,
      // })
    }
    // set
    // console.log(gradesResponse.data)
    return gradesResponse.data;

  } catch (error) {

    throw error;
  }
}

async function schedScraper(refreshkey: string, sections: any[], date?: string): Promise<any[]> {
  try {
    // console.log(refreshkey)
    const oauth2response = await getOauth(refreshkey)
    let guidlist = {}

    let { startsting, endsting } = getDatesting()
    if (date) {
      const start = new Date(date)
      start.setHours(0, 0, 0, 0);
      const end = new Date(start).setDate(start.getDate() + 6)
      startsting = new Date(start).toISOString().split('T')[0] + "T00:00:00.000Z"
      endsting = new Date(end).toISOString().split('T')[0] + "T00:00:00.000Z"
    }
    console.log(startsting, endsting)
    sections.forEach((section) => { guidlist[section.guid] = section.name })
    const modifiedSchedOptions = {
      ...getSchedOptions,
      headers: {
        ...getSchedOptions.headers,
        authorization: `Bearer ${oauth2response.data.access_token}`,
        profileuri: oauth2response.data.id_token,
      },
      data: {
        ...getSchedOptions.data,
        variables: { sectionGuids: Object.keys(guidlist), start: startsting, stop: endsting },
      },

    };
    let schedResponse = await axios.request(modifiedSchedOptions);
    schedResponse.data.data.sectionMeetings = schedResponse.data.data.sectionMeetings.map((meeting: any) => (
      {
        // ...meeting,
        start: new Date(meeting.start),
        stop: new Date(meeting.stop),
        name: guidlist[meeting.sectionGuid]

      }
    )).sort((a: any, b: any) => a.start - b.start)
    console.log(schedResponse.data)
    localStorage.setItem('sched', JSON.stringify(schedResponse.data.data.sectionMeetings))

    return schedResponse.data.data.sectionMeetings;


  } catch (error) {

    throw error;
  }
}
const getDatesting = () => {
  const start = new Date();
  start.setDate(start.getDate());

  let dayOfWeek = start.getDay();
  start.setDate(start.getDate() + (1 - dayOfWeek));
  start.setHours(0, 0, 0, 0);


  const end = new Date(start).setDate(start.getDate() + 6)
  const startsting = new Date(start).toISOString().split('T')[0] + "T00:00:00.000Z"
  const endsting = new Date(end).toISOString().split('T')[0] + "T00:00:00.000Z"
  return { startsting, endsting }
}



export { scrape, schedScraper };
