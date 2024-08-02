import { Client } from "./Client";

interface TrackerState {
    day: Number;
    interview: Boolean;
    course: Boolean;
    "course3": Boolean;
    dsa: Boolean;
    exercise: Boolean;
    temple: Boolean;
}

const TaskTrackerService = async (formdata: TrackerState) => {
    try {
        return await Client.post('/task/track', formdata)
    } catch (e) {
        return e
    }
}

const GetTask = async () => {
    try {
        return await Client.post('/task/getTask')
    } catch (e) {
        return e
    }
}

const CalendarData = async () => {
    try {
        return await Client.post('/task/calendar')
    } catch (e) {
        return e
    }
}

export {
    TaskTrackerService,
    GetTask,
    CalendarData
}