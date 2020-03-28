import { DISABLE_BALANCE_ON_EDIT, DISABLE_BALANCE_ON_ADD, ALLOW_REGISTRATION} 
from '../actions/types'

export const setDisableBalanceOnAdd = () => {

    const settings = JSON.parse(localStorage.getItem('settings'))

    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

    localStorage.setItem('settings', JSON.stringify(settings))

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
}

export const setDisableBalanceOnEdit = () => {

    const settings = JSON.parse(localStorage.getItem('settings'))

    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

    localStorage.setItem('settings', JSON.stringify(settings))

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
       
    }
}

export const setAllowRegistration= () => {

    let settings = JSON.parse(localStorage.getItem('settings'));



    settings.allowRegistration = !settings.allowRegistration;

    console.log(settings);

    localStorage.setItem('settings', JSON.stringify(settings))

    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    }
}