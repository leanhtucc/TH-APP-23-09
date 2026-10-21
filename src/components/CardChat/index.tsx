import React from 'react';
import { View, Text } from 'react-native';
import { ICardChatContent } from './types';

export const CardChat: React.FC<ICardChatContent> = ({ name, title, description }) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
};

export default CardChat;