import axios from "axios";
import { database as db } from '../utils/firebase'
import { set, ref, push, get } from 'firebase/database';

export async function getClasses(): Promise<any> {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const cookies = JSON.parse(localStorage.getItem("cookies"))
    let data;
    if (cookies === null) {
         data = {
            username: username,
            password: password
        }

    }
    else {
         data = {
            username: username,
            password: password,
            cookies: cookies
        }
    }

    const options = {
        method: 'POST',
        url: 'https://moodle.aayanmaheshwari.com/getClasses',
        data: data
    };
    try {
        const response = await axios.request(options)
        // console.log(response.data);
        localStorage.setItem("cookies", JSON.stringify(response.data["cookies"]))
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        const curdate = new Date()

        const curVisit = {
        date: (curdate.toLocaleDateString() + " at " + curdate.toLocaleTimeString()),
        device: "mobile"
        }
        const userRef = ref(db, 'moodleusers/' + (username.replaceAll(".", " ")) + '/visits/' + (Math.round(curdate.getTime() / 60000) * 60));
        // console.log(userRef)
        set(userRef, curVisit);
        return response.data["classes"]

    }
    catch (e) {
        console.log(e)
        throw e
    }

}
export async function getCourse(courseurl: string): Promise<any>{
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const cookies = JSON.parse(localStorage.getItem("cookies"))
    let data;
    if (cookies === null) {
         data = {
            username: username,
             password: password,
            courseurl: courseurl
        }

    }
    else {
         data = {
            username: username,
            password: password,
             cookies: cookies,
            courseurl: courseurl
        }
    }

    const options = {
        method: 'POST',
        url: 'https://moodle.aayanmaheshwari.com/getCourseData',
        data: data,
       
    };
    try {
        const response = await axios.request(options)
        localStorage.setItem("cookies", JSON.stringify(response.data["cookies"]))
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        localStorage.setItem(courseurl,JSON.stringify(response.data.courseData))
        return response.data.courseData

    }
    catch (e) {
        console.log(e)
        throw e
    }

}

export async function getDay(dayurl: String): Promise<string>{
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const cookies = JSON.parse(localStorage.getItem("cookies"))
    let data;
    if (cookies === null) {
         data = {
            username: username,
             password: password,
            lessonurl: dayurl
        }

    }
    else {
         data = {
            username: username,
            password: password,
             cookies: cookies,
            lessonurl: dayurl
        }
    }

    const options = {
        method: 'POST',
        url: 'https://moodle.aayanmaheshwari.com/getLessonplan',
        data: data,
       
    };
    try {
        const response = await axios.request(options)
        // localStorage.setItem("cookies", JSON.stringify(response.data["cookies"]))
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        return response.data

    }
    catch (e) {
        console.log(e)
        throw e
    }

}
const levenshteinDistance = (s, t) => {
 if (!s.length) return t.length;
 if (!t.length) return s.length;
 const arr = [];
 for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
 }
 return arr[t.length][s.length];
};


export function closestindex(arr, str) {
  let minDistance = Infinity;
    let closestIndex = -1;
    arr.forEach((item, index) => {
    let distance = levenshteinDistance(str, item);
    if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
    }
    });
  return {
    minDistance:minDistance,
    closestIndex:closestIndex
  };
}