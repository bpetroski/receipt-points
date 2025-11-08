import { createHomeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface AddScanItemButtonProps {
    onPress: () => void
}

const AddScanItemButton = ({ onPress }: AddScanItemButtonProps) => {
    
    const {colors} = useTheme()
    const homeStyles = createHomeStyles(colors)
  
    return (
        <TouchableOpacity 
            style={homeStyles.scanButton}
            onPress={onPress}
            >
            <Ionicons name='camera' size={30} color='#fff' />
        </TouchableOpacity>
    )
}

export default AddScanItemButton