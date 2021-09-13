import { Dispatch } from "redux"
import { IAuth } from "../../pages/Login"
import { auth, authError, authSuccess } from "../reducer/authReducer"
import axios from 'axios'
import { getQueryString } from "../../helpers/getQuery"

const authAction = (form: IAuth) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(auth())
            await axios({
                method: "POST",
                url: `https://${form._subdomain}.ox-sys.com/security/auth_check`,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: getQueryString(form)
            }).then(res => {
                console.log(res);
                
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('subdomen',form._subdomain)
                dispatch(authSuccess(res.data))
            })

        } catch (error) {
            dispatch(authError())
        }
    }
}

export default authAction