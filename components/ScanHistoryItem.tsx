import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

interface ScanHistoryItemProps {
    itemName: string
    points: number
    date: string
}
const ScanHistoryItem = ({ itemName, points, date }: ScanHistoryItemProps) => {
  
    const {colors} = useTheme()
    const homeStyles = createHomeStyles(colors)
  
    return (
        <View style={homeStyles.todoItemWrapper}>
            <LinearGradient
                colors={colors.gradients.surface}
                style={homeStyles.todoItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={homeStyles.scanHistoryItemTextWrapper}>
                    <View>
                        <Text style={homeStyles.scanHistoryText}>{itemName}</Text>
                        <Text style={homeStyles.dateText}>{date}</Text>
                    </View>
                    <Text style={homeStyles.pointsText}>+{points} Points</Text>
                </View>
            </LinearGradient>
        </View>
  )
}

export default ScanHistoryItem