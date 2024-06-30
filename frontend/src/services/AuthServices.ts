import { Client } from "./Client";

interface TrackerState {
    day: Number;
    dsa: boolean;
    course: boolean;
    exercise: boolean;
    temple: boolean;
    "6wake": boolean;
    "11sleep": boolean;
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

export {
    TaskTrackerService,
    GetTask
}