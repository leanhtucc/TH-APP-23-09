import React from 'react';
import { View, Text } from 'react-native';
import { ButtonUDU } from './types';


export const UDUButton: React.FC<ButtonUDU> = ({ name, title, description }) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
};

export default UDUButton;