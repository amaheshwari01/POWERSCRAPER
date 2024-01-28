import axios from "axios";


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
        return response.data["classes"]

    }
    catch (e) {
        console.log(e)
        throw e
    }

}
export async function getCourse(courseurl: String): Promise<any>{
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