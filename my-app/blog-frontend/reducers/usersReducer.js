import { createSlice } from '@reduxjs/toolkit'
import userServices from '../src/services/userServices'
import { showNotification } from './notificationReducers'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const fetchUsers = () => {
    return async dispatch => {
        try {
            const users = await userServices.getAllUsers()
            dispatch(setUsers(users))
        } catch (error) {
            dispatch(showNotification('Failed to fetch users', 5))
        }
    }
}
export default usersSlice.reducer