import React,{useState, useEffect} from 'react'
import firebase from './utils/firebase';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { List } from 'rsuite';

export default function Contral() {

const [on, setON] = useState('1');        /**辨識on */
const [off, setOff] = useState('0');      /**辨識off */
const [stop, setStop] = useState('2');    /**辨識stop */
const [change, setChange] = useState(''); /**辨識狀態 */

const Switch_on = () => {
    firebase.database().ref('/capture_picture/control_state').set(1);
    setChange('On')
    const onRef = firebase.database().ref('On')
    const data_on = {
        on
    }
    onRef.push(data_on);
}
const Switch_off = () => {
    firebase.database().ref('/capture_picture/control_state').set(0);
    setChange('Off')
    const onRef = firebase.database().ref('Off')
    const data_off = {
        off
    }
    onRef.push(data_off);
}
const Switch_stop = () => {
    firebase.database().ref('/capture_picture/control_state').set(2);
    setChange("Stop")
    const onRef = firebase.database().ref('Stop');
    const data_stop = {
        stop
    }
    onRef.push(data_stop);
}



  return (
    <div>
        <List>
            <List.Item>
                <h3> System status is : [{change}]</h3>
                <br/>
            </List.Item>
        </List>
        <ButtonGroup style={{marginTop: 12}}  justified>
            <Button appearance={'appearance'} onClick={Switch_on}>Switch_on</Button>
            <Button appearance={'appearance'} onClick={Switch_off}>Switch_off</Button>
            <Button appearance={'appearance'} onClick={Switch_stop}>Switch_stop</Button>
        </ButtonGroup>
    </div>
  )
}