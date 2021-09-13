import { Dispatch } from "redux"
import axios from 'axios'
import { getData, getDataError, getDataSuccess } from "../reducer/dataReducer";

const dataAction = (page:number = 1,size:number = 10) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(getData())
            await axios({
                method: "POST",
                url: `https://${localStorage.getItem('subdomen')}.ox-sys.com/variations`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: JSON.stringify({
                    "size": size,
                    "page": page,
                    "stock": {
                        "exist": true,
                        "location": [
                            42
                        ]
                    },
                 }
                 )
            }).then(res => {
                dispatch(getDataSuccess(res.data))
            })

        } catch (error) {
            dispatch(getDataError())
        }
    }
}

export default dataAction