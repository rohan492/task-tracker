import { Client } from "./Client";

import { TrackerState } from "../utils/state";

const TaskTrackerService = async (formdata: Partial<TrackerState>) => {
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