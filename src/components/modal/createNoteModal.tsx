import { View, Text } from 'react-native'
import React from 'react'
import { Input } from 'components/core/Input'
import Modal from "react-native-modal";
import { height, width } from 'utils/Responsive';

export interface Props {
    isVisible : boolean,
    // onPress : () => void,
}

const CreateNoteModal = (props : Props) =>{

    return (
            <Modal isVisible={props.isVisible}  deviceWidth= {width/2}
            deviceHeight={height/2}>
                {/* <Input 
                    onChangeText={}
                    onBlur={}
                    value={}
                    placeholder="Title"
                > */}
                <Text>Nhon</Text>

            </Modal>
    )
}

export default CreateNoteModal