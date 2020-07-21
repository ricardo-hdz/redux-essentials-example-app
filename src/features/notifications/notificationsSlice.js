import { 
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications.length ? allNotifications : ['']
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        console.log(latestTimestamp)
        const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
        return response.notifications
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            Object.values(state.entities).forEach(notification => {
                notification.read = true
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            // state.forEach(notification => {
            //     notification.isNew = !notification.read
            // })
            // state.push(...action.payload)
            // state.sort((a, b) => b.date.localeCompare(a.date))
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
            notificationsAdapter.upsertMany(state, action.payload)
        },
        [fetchNotifications.rejected]: (state, action) => {
            console.log('Error while fetching notifications', action.payload)
        }
    }
})

export default notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions

export const {
    selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)