import LoggedHeader from "../../../components/Headers/LoggedHeader";

export default function giftsList(){

    function logOutfunction(){
        console.log('logout')
    }
    return (
        <LoggedHeader
        onClick={logOutfunction}
        />
    )
}