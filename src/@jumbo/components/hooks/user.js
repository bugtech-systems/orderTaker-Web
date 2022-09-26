import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = () => {
    const [user, setUser] = React.useState({
        loaded: false, name: '', email: '', contact: '', oldPass: '', newPass: '', confirmNewPass: ''
    });
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const authentication = useSelector((state) => state.authentication);

    const onSuccess = (successData) => {
        setUser({
            loaded: true,
            oldPass: '', newPass: '', confirmNewPass: '',
            ...successData,
        })
    }

    const onError = (error) => {
        setUser({
            loaded: true,
            error
        })
    }

    React.useEffect(() => {
        if (!user.loaded) {
            dispatch({type: 'INNER_LOADER', loadingOpen: true});
            getUserInfo({
                id: userData.id,
                accessToken: authentication.accessToken
            }).then(resp => {
                dispatch({type: 'INNER_LOADER', loadingOpen: false});
                dispatch({type: 'ACCESS_TOKEN', accessToken: resp.data.token});
                onSuccess(resp.data.data);
            }).catch(error => {
                dispatch({type: 'INNER_LOADER', loadingOpen: false});
                onError(error)
            })
        }
    }, [])

    return user;

}

export default UserInfo;
