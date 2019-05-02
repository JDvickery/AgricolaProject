/*Custom Picker*/
import React from 'react';
import{
    Text,
    StyleSheet,
    Picker
} from 'react-native';

const AgPicker = props => {
    return (
        <Picker
            selectedValue={props.defaultValue}
            style={styles.picker}
            onValueChange={props.customChange}
        >
            <Picker.Item label={"Create new user"} value={"Create new user"} />
        </Picker>
    );
};
const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 500
    }
});
export default AgPicker;